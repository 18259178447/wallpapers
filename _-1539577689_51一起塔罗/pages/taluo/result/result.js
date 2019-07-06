var t = getApp();

Page({
    data: {
        date: "",
        result: {},
        info: {},
        shareImg: "",
        xian: !0,
        shows: !0,
        cate_id: "",
        title: ""
    },
    scroll: function() {},
    draw: function() {
        console.log(t.globalData.img), wx.showLoading({
            title: "请稍等"
        });
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
        }, i = this.data.result, s = [], n = [], o = [], l = [], c = 0, r = this.data.result.length; c < r; c++) if (s.push(i[c].card_pic), 
        n.push(i[c].zhengni), "6" != this.data.cate_id) i[c].card_name = "牌" + (c + 1) + " " + i[c].card_name, 
        l.push(i[c].result_infos), o.push(i[c].card_name); else {
            for (var d = 0; d < i[c].cate_title.length; d++) i[c].cate_title[d], o.push(i[c].cate_title[d] + " " + i[c].card_name);
            l = i[c].result_infos;
        }
        wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: t.yu + "/index.php/Index/getResultImg.html",
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
    save: function() {
        for (var a = this, e = [], i = 0, s = this.data.result.length; i < s; i++) {
            var n = {};
            n.card_pic = this.data.result[i].card_pic, n.card_zhengni = this.data.result[i].zhengni, 
            n.card_name = this.data.result[i].card_name, n.card_infos = this.data.result[i].result_infos_s, 
            e.push(n);
        }
        "6" == this.data.cate_id && (e[0].cate_title = this.data.result[0].cate_title), 
        console.log(e), wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: t.yu + "/index.php/Index/getSharePic.html",
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
                console.log(t), wx.hideLoading(), setTimeout(function() {
                    a.setData({
                        imgs: t.data.url,
                        shows: !1
                    });
                }, 1e3);
            }
        });
    },
    preview: function(t) {
        for (var a = [], e = parseInt(t.currentTarget.dataset.index), i = 0, s = this.data.result.length; i < s; i++) a.push(this.data.result[i].card_pic);
        wx.previewImage({
            urls: a,
            current: a[e]
        });
    },
    saves: function() {
        wx.showLoading({
            title: "保存中"
        }), wx.downloadFile({
            url: this.data.imgs,
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
    },
    onLoad: function(a) {
        var e = new Date(), i = "";
        t.globalData.ce = !0, i = i + e.getFullYear() + "年" + (e.getMonth() + 1) + "月" + e.getDate() + "日", 
        console.log(i), this.setData({
            yu: t.yu,
            info: t.wxInfo.userInfo,
            star: t.globalData.star,
            result: t.globalData.card,
            date: i,
            location: t.globalData.location,
            cate_id: t.cate_id,
            title: t.globalData.title
        }), this.draw(), console.log(t.globalData.star);
        for (var s = [], n = 0, o = this.data.result.length; n < o; n++) {
            var l = {};
            l.card_id = this.data.result[n].card_id, l.zhengni = this.data.result[n].zhengni, 
            s.push(l);
        }
        wx.request({
            url: t.yu + "/index.php/Index/getResult.html",
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
            success: function(t) {}
        });
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
        var a = JSON.stringify(t.globalData.item);
        return {
            path: "/pages/index/index?fr_user_id=" + t.auth.user_id + "&item=" + a,
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