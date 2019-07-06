var t = getApp();

Page({
    data: {
        card: {},
        matchList: [],
        user_id: "",
        down: !1,
        cardtu: !0,
        types: 0,
        yu: t.yu,
        page: 1
    },
    close: function() {
        this.setData({
            cardtu: !this.data.cardtu
        });
    },
    scrollto: function() {},
    tomatch: function(a) {
        parseInt(a.currentTarget.dataset.index);
        var e = a.currentTarget.dataset.index;
        t.globalData.card_item = this.data.matchList[e], wx.navigateTo({
            url: "/pages/yunshi/tomatch/tomatch?type=2"
        });
    },
    xiangqing: function(a) {
        var e = a.currentTarget.dataset.index;
        t.globalData.card_item = this.data.matchList[e], wx.navigateTo({
            url: "/pages/yunshi/tomatch/tomatch?type=2"
        });
    },
    matchList: function() {
        var a = {
            secert: t.secert,
            auth: t.auth.auth,
            page: this.data.page
        }, e = this.data.matchList;
        this.data.z_user_id && (a.user_id = this.data.z_user_id);
        var i = this;
        wx.request({
            url: t.yu + "/index.php/YunShi/mypeidui",
            data: a,
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t);
                var a = i.data.page;
                t.data.data.pd.length > 0 ? (e = e.concat(t.data.data.pd), a += 1) : wx.showToast({
                    title: "没有更多了哦",
                    icon: "none"
                }), i.setData({
                    matchList: e,
                    card: t.data.data.card,
                    user_id: t.data.data.ys.user_id,
                    page: a
                });
            }
        });
    },
    getShare: function() {
        var a = this;
        wx.showLoading({
            title: "生成图片中"
        }), wx.request({
            url: t.yu + "/index.php/YunShi/getYaoQin_share",
            data: {
                auth: t.auth.auth,
                secert: t.secert
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                wx.downloadFile({
                    url: t.data.url,
                    success: function(t) {
                        wx.hideLoading(), console.log(t), a.setData({
                            img: t.tempFilePath,
                            down: !0
                        });
                    }
                }), console.log(t);
            }
        });
    },
    move: function() {},
    getShare1: function() {
        var a = this;
        wx.showLoading({
            title: "生成图片中"
        }), wx.request({
            url: t.yu + "/index.php/YunShi/getShare",
            data: {
                auth: t.auth.auth,
                secert: t.secert
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                wx.downloadFile({
                    url: t.data.url,
                    success: function(t) {
                        wx.hideLoading(), console.log(t), a.setData({
                            img: t.tempFilePath,
                            down: !0
                        });
                    }
                }), console.log(t);
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    hiddens: function(t) {
        "0" == t.target.dataset.id && this.setData({
            down: !1
        });
    },
    saves: function() {
        var t = this;
        wx.showLoading({
            title: "保存中"
        }), wx.saveImageToPhotosAlbum({
            filePath: this.data.img,
            success: function(a) {
                wx.hideLoading(), console.log("保存图片：success"), wx.showToast({
                    title: "保存成功"
                }), t.setData({
                    zhuan: 0
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "保存失败",
                    icon: "none"
                }), console.log(t);
            }
        });
    },
    onLoad: function(a) {
        console.log(a), a.p_user_id && (this.setData({
            z_user_id: a.p_user_id
        }), t.auth.user_id != a.p_user_id && this.setData({
            types: 1
        })), this.setData({
            user: t.wxInfo
        }), this.matchList(), t.chou = !0;
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.matchList();
    },
    onShareAppMessage: function() {
        return {
            path: "/pages/yunshi/chou/chou?fr_user_id=" + t.auth.user_id + "&tiao_type=1",
            title: "测试2019运势",
            imageUrl: "https://weitaluo.xingpei360.com/Public/Api/mp3/1229.png",
            success: function(t) {
                wx.showShareMenu({
                    withShareTicket: !0
                });
            },
            fail: function(t) {}
        };
    }
});