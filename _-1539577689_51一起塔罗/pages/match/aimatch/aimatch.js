var t = getApp();

Page({
    data: {
        card: {},
        matchList: [],
        user_id: "",
        down: !1,
        cardtu: !0
    },
    close: function() {
        this.setData({
            cardtu: !this.data.cardtu
        });
    },
    scrollto: function() {},
    tomatch: function(a) {
        var i = parseInt(a.currentTarget.dataset.index);
        if (this.data.z_user_id) {
            if (t.auth.user_id == this.data.matchList[i].p_user_id) return void wx.showToast({
                title: "不能匹配自己",
                icon: "none"
            });
            this.data.matchList[i].p_user_id == this.data.z_user_id ? wx.navigateTo({
                url: "/pages/match/tomatch/tomatch?z_user_id=" + this.data.matchList[i].p_user_id + "&p_user_id=" + this.data.matchList[i].user_id
            }) : wx.navigateTo({
                url: "/pages/match/tomatch/tomatch?z_user_id=" + this.data.matchList[i].user_id + "&p_user_id=" + this.data.matchList[i].p_user_id
            });
        } else wx.showToast({
            title: "自己的结果不能匹配",
            icon: "none"
        });
    },
    matchList: function() {
        var a = {
            secert: t.secert,
            auth: t.auth.auth
        };
        this.data.z_user_id && (a.user_id = this.data.z_user_id);
        var i = this;
        wx.request({
            url: t.yu + "/index.php/PeiDui/mypeidui",
            data: a,
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                console.log(t), i.setData({
                    matchList: t.data.data.pair,
                    card: t.data.data.card,
                    user_id: t.data.data.lingshu.user_id
                });
            }
        });
    },
    getShare: function() {
        var a = this;
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
                        wx.hideLoading(), a.setData({
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
    onLoad: function(a) {
        console.log(a), a.p_user_id && this.setData({
            z_user_id: a.p_user_id
        }), this.setData({
            user: t.wxInfo
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