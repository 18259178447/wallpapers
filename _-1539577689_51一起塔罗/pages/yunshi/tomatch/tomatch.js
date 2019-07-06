var t = getApp();

Page({
    data: {
        pari: {
            down: !1,
            haveme: !1,
            yu: t.yu
        },
        info: {}
    },
    getShare: function() {
        var e = this;
        wx.showLoading({
            title: "生成图片中"
        });
        var a = e.data.pair.p_user_id;
        a == t.auth.user_id && (a = e.data.pair.user_id), wx.request({
            url: t.yu + "/index.php/YunShi/getXuanyaoPic",
            data: {
                auth: t.auth.auth,
                secert: t.secert,
                p_user_id: a
            },
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                wx.downloadFile({
                    url: t.data.url,
                    success: function(t) {
                        wx.hideLoading(), e.setData({
                            img: t.tempFilePath,
                            down: !0
                        });
                    }
                }), console.log(t);
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
            success: function(e) {
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
    match: function(e) {
        var a = this;
        wx.request({
            url: t.yu + "/index.php/YunShi/peidui",
            data: {
                secert: t.secert,
                auth: t.auth.auth,
                p_user_id: e.p_user_id,
                z_user_id: e.z_user_id
            },
            method: "POST",
            header: {
                "Content-type": "application/json"
            },
            success: function(e) {
                a.setData({
                    pair: e.data.pd,
                    info: e.data.pd.qmd_info
                }), e.data.pd.user_id != t.auth.user_id && e.data.pd.p_user_id != t.auth.user_id || a.setData({
                    haveme: !0
                }), console.log(e);
            }
        });
    },
    metoo: function() {
        wx.navigateTo({
            url: "/pages/yunshi/match"
        });
    },
    onLoad: function(e) {
        if ("2" == e.type) {
            var a = t.globalData.card_item;
            this.setData({
                pair: a,
                info: a,
                type: 2
            });
        } else this.match(e), this.setData({
            type: 1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
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