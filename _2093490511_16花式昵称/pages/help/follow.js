var t = getApp();

Page({
    data: {
        unitid: t.globalData.unitid,
        textHeight: 0,
        statusHeight: 20,
        toView: "",
        canvasImg: "/img/wanke.png"
    },
    onLoad: function(t) {
        var n = this, o = wx.getSystemInfoSync(), a = Math.floor(750 * o.windowHeight / o.windowWidth);
        n.setData({
            textHeight: a,
            statusHeight: o.statusBarHeight
        }), t.t && this.setData({
            toView: t.t
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    copymp: function() {
        wx.setClipboardData({
            data: "huashiwanke",
            success: function(t) {
                wx.showToast({
                    title: "复制成功",
                    icon: "success",
                    duration: 2e3
                });
            }
        });
    },
    copywx: function() {
        wx.setClipboardData({
            data: "niudd22",
            success: function(t) {
                wx.showToast({
                    title: "复制成功",
                    icon: "success",
                    duration: 2e3
                });
            }
        });
    },
    saveImage: function() {
        var t = this;
        wx.showActionSheet({
            itemList: [ "保存到手机" ],
            success: function(n) {
                console.log(t.data.canvasImg), wx.saveImageToPhotosAlbum({
                    filePath: t.data.canvasImg,
                    success: function(t) {
                        wx.showToast({
                            title: "保存到相册"
                        });
                    }
                });
            }
        });
    }
});