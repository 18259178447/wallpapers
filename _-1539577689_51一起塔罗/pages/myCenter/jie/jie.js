var t = getApp();

Page({
    data: {
        date: "",
        result: {},
        info: {},
        shareImg: "",
        xian: !0,
        shows: !0,
        cate_id: ""
    },
    preview: function(t) {
        for (var a = [], e = parseInt(t.currentTarget.dataset.index), i = 0, s = this.data.result.length; i < s; i++) a.push(this.data.result[i].card_pic);
        wx.previewImage({
            urls: a,
            current: a[e]
        });
    },
    draw: function() {
        wx.showLoading({
            title: "请稍等"
        }), console.log(t.globalData.img);
        var a = this;
        wx.downloadFile({
            url: t.globalData.img,
            success: function(t) {
                a.setData({
                    shareImg: t.tempFilePath
                }), wx.getImageInfo({
                    src: t.tempFilePath,
                    success: function(t) {
                        a.setData({
                            w: 413,
                            h: 248
                        }), console.log(t);
                        var e = wx.createCanvasContext("lian");
                        e.drawImage(a.data.shareImg, 0, 0, 413, 248), setTimeout(function() {
                            console.log(333), e.draw(!0, function() {
                                wx.canvasToTempFilePath({
                                    canvasId: "lian",
                                    x: 0,
                                    y: 0,
                                    width: 413,
                                    height: 248,
                                    success: function(t) {
                                        wx.hideLoading(), console.log(444), a.setData({
                                            shareImg: t.tempFilePath,
                                            xian: !1
                                        }), console.log(t.tempFilePath);
                                    },
                                    fail: function(t) {
                                        console.log(t);
                                    }
                                }, a);
                            });
                        }, 500);
                    }
                });
            }
        });
    },
    chupe: function() {
        wx.showToast({
            title: "加载中，请稍等",
            icon: "none"
        });
    },
    goResult: function(a) {
        var e = parseInt(a.currentTarget.dataset.id);
        t.globalData.card = this.data.result[e], wx.navigateTo({
            url: "/pages/taluo/result/result1/result1"
        }), console.log(this.data.result[e]);
    },
    saveResult: function() {
        for (var a = "东经:" + this.data.location.longitude + " 北纬:" + this.data.location.latitude, e = {
            date: this.data.date,
            cons: this.data.star,
            poit: a
        }, i = this.data.result, s = [], n = [], o = [], l = [], c = 0, u = this.data.result.length; c < u; c++) if (s.push(i[c].card_pic), 
        n.push(i[c].zhengni), "6" != this.data.cate_id) i[c].card_name = "牌" + (c + 1) + " " + i[c].card_name, 
        l.push(i[c].result_infos), o.push(i[c].card_name); else {
            for (var d = 0; d < i[c].cate_title.length; d++) i[c].cate_title[d], o.push(i[c].cate_title[d] + " " + i[c].card_name);
            l = i[c].result_infos;
        }
        wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: t.yu + "/index.php/Index/getResultImg1.html",
            data: {
                theme_id: t.theme_id,
                secert: t.secert,
                auth: t.auth.auth,
                infos: e,
                card_pic: s,
                card_zhengni: n,
                card_name: o,
                card_infos: l
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
    scroll: function() {},
    save: function() {
        for (var a = this, e = [], i = 0, s = this.data.result.length; i < s; i++) {
            var n = {};
            n.card_pic = this.data.result[i].card_pic, n.zhengni = this.data.result[i].zhengni, 
            n.card_name = this.data.result[i].card_name, n.card_infos = this.data.result[i].result_infos_s, 
            n.cate_title = this.data.result[i].cate_title, e.push(n);
        }
        console.log(e), wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: t.yu + "/index.php/Index/getSharePic1.html",
            data: {
                theme_id: t.theme_id,
                cards: e,
                secert: t.secert,
                auth: t.auth.auth
            },
            header: {
                "content-type": "application/json"
            },
            method: "POST",
            success: function(t) {
                wx.downloadFile({
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
    today: function() {
        var a = this;
        wx.showLoading({
            title: "获取中"
        }), wx.request({
            url: t.yu + "/index.php/Index/getToday",
            method: "POST",
            header: {
                "Content-type": "application/josn"
            },
            data: {
                auth: t.auth.auth,
                secert: t.secert,
                theme_id: "4"
            },
            success: function(e) {
                var i = "", s = new Date();
                i = s.getFullYear() + "年" + (s.getMonth() + 1) + "月" + s.getDate() + "日", a.setData({
                    yu: t.yu,
                    info: t.wxInfo.userInfo,
                    star: t.globalData.star,
                    title: "今日运势",
                    cate_id: "6",
                    date: i,
                    result: e.data.data
                }), wx.getLocation({
                    success: function(t) {
                        t.longitude = Math.floor(100 * t.longitude) / 100, t.latitude = Math.floor(100 * t.latitude) / 100, 
                        a.setData({
                            location: t
                        }), wx.hideLoading();
                    }
                }), console.log(a.data.result);
            }
        });
    },
    setDate: function(t) {
        var a = "", e = t.split("-"), i = new Date(t), s = new Array(7);
        s[0] = "星期日", s[1] = "星期一", s[2] = "星期二", s[3] = "星期三", s[4] = "星期四", s[5] = "星期五", 
        s[6] = "星期六";
        var n = i.getDay();
        a = a + e[0] + "年" + e[1] + "月" + e[2] + "日 " + s[n], this.setData({
            date: a
        });
    },
    onLoad: function(a) {
        new Date();
        "today" == a.type ? (this.today(), this.setData({
            paixing: "yun"
        })) : (this.setDate(t.globalData.card.dateline), this.setData({
            result: t.globalData.card.result,
            info: t.wxInfo.userInfo,
            star: t.globalData.star,
            title: t.globalData.title,
            location: t.globalData.location,
            cate_id: t.cate_id
        }), console.log(this.data.result), "6" == t.cate_id ? this.setData({
            paixing: "yun"
        }) : this.setData({
            paixing: t.globalData.paixing
        }), console.log(this.data.paixing)), this.setData({
            yu: t.yu
        }), console.log(t.cate_id);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    hide: function(t) {
        "0" == t.target.dataset.id && this.setData({
            shows: !0
        });
    },
    onShareAppMessage: function() {
        return {
            path: "/pages/index/index?fr_user_id=" + t.auth.user_id + "&theme_id=" + t.theme_id,
            title: t.globalData.title,
            imageUrl: "/images/sharefe.jpg",
            success: function(t) {
                wx.showShareMenu({
                    withShareTicket: !0
                });
            },
            fail: function(t) {}
        };
    }
});