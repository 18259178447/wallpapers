var t = getApp();

Page({
    data: {
        cdn: t.globalData.cdn,
        host: t.globalData.host,
        name: "",
        isLove: !1,
        isF: !0,
        imgs: [],
        id: null,
        noAuth: !1
    },
    onLoad: function(t) {
        this.setData({
            id: t.id
        }), this.getImages();
    },
    showF: function() {
        this.setData({
            isF: !0
        });
    },
    showR: function() {
        this.setData({
            isF: !1
        });
    },
    jumptoindex: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    downImg: function() {
        var t = this;
        t.noAuth ? wx.openSetting({
            success: function(a) {
                a.authSetting["scope.writePhotosAlbum"] ? (t.noAuth = !1, wx.showToast({
                    title: "成功啦~~尽请下载吧！",
                    icon: "none",
                    duration: 2e3
                })) : console.log("获取权限失败，给出不给权限就无法正常使用的提示");
            },
            fail: function(t) {
                console.log("fail2", t);
            }
        }) : this.data.imgs.map(function(a) {
            wx.downloadFile({
                url: a.replace(/http/, "https"),
                success: function(a) {
                    wx.saveImageToPhotosAlbum({
                        filePath: a.tempFilePath,
                        success: function(t) {
                            wx.showToast({
                                title: "下载成功~~",
                                icon: "success",
                                duration: 2e3
                            });
                        },
                        fail: function(a) {
                            console.log("fail", a), "saveImageToPhotosAlbum:fail auth deny" === a.errMsg && (console.log("当初用户拒绝，再次发起授权"), 
                            t.noAuth = !0, wx.showToast({
                                title: "哎呀~没权限额，再点一下【下载】并开启【保存到相册】",
                                icon: "none",
                                duration: 2e3
                            }));
                        },
                        complete: function(t) {
                            console.log("complete", t);
                        }
                    });
                }
            });
        });
    },
    getImages: function() {
        var a = this, o = this.data.id;
        wx.request({
            url: a.data.host + "/getPicInfo",
            data: {
                id: o
            },
            header: {
                Authorization: t.globalData.token
            },
            success: function(t) {
                var o = t.data.data;
                wx.setNavigationBarTitle({
                    title: t.data.data.pic_name || "精选头像"
                }), a.setData({
                    name: t.data.data.pic_name,
                    imgs: [ o.pic_left_url, o.pic_right_url ],
                    isLove: o.is_collect
                });
            }
        });
    },
    loveIt: function() {
        var a = this;
        wx.request({
            url: a.data.host + (a.data.isLove ? "/userPicUnCollect" : "/userPicCollect"),
            method: "POST",
            data: {
                id: a.data.id
            },
            header: {
                Authorization: t.globalData.token
            },
            success: function(t) {
                wx.showToast({
                    title: a.data.isLove ? "取消收藏" : "收藏成功",
                    icon: "success",
                    duration: 2e3
                }), a.setData({
                    isLove: !a.data.isLove
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: this.data.name || "最热门的情侣头像都在这"
        };
    }
});