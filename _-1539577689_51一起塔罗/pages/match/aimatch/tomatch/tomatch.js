var t = getApp();

Page({
    data: {
        pari: {
            down: !1
        }
    },
    getShare: function() {
        var e = this;
        wx.showLoading({
            title: "生成图片中"
        }), wx.request({
            url: t.yu + "/index.php/PeiDui/getSharePic",
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
        wx.showLoading({
            title: "保存中"
        }), wx.downloadFile({
            url: this.data.img,
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
    match: function(e) {
        var i = this;
        wx.request({
            url: t.yu + "/index.php/PeiDui/peidui",
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
            success: function(t) {
                i.setData({
                    pair: t.data.pair
                }), console.log(t);
            }
        });
    },
    metoo: function() {
        wx.navigateTo({
            url: "/pages/match/match"
        });
    },
    onLoad: function(t) {
        this.match(t);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            path: "/pages/match/chou/chou?fr_user_id=" + t.auth.user_id,
            title: "塔罗配对",
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