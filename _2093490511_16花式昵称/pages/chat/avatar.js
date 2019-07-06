var t = getApp();

Page({
    data: {
        // unitid: t.globalData.unitid
    },
    onLoad: function() {},
    onShow: function() {},
    previewImage: function(t) {
        var e = t.currentTarget.dataset.src;
        wx.previewImage({
            urls: [ e ]
        });
    },
    saveImageToPhotosAlbum: function(t) {
        var e = t.currentTarget.dataset.src;
        wx.authorize({
            scope: "scope.writePhotosAlbum",
            success: function() {
                wx.saveImageToPhotosAlbum({
                    filePath: e,
                    success: function(t) {
                        setTimeout(function() {
                            wx.showToast({
                                title: "保存成功",
                                icon: "success",
                                duration: 2e3
                            });
                        }, 1e3);
                    }
                });
            },
            fail: function(t) {
                wx.showModal({
                    content: "拒绝了保存图片授权，是否重新开启",
                    confirmText: "前往开启",
                    showCancel: !1,
                    success: function(t) {
                        wx.openSetting({
                            success: function(t) {}
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "透明头像，透明表情素材下载",
            path: this.route
        };
    }
});