var t = getApp(), o = wx.createInnerAudioContext();

Page({
    data: {
        list: {},
        item: {}
    },
    getItem: function() {
        var o = this;
        wx.request({
            url: t.yu + "/Home/Cover/getXingZuo",
            data: {},
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(n) {
                console.log(n), o.setData({
                    list: n.data.list,
                    yu: t.yu
                });
            }
        });
    },
    goResult: function(o) {
        var n = parseInt(o.currentTarget.dataset.id);
        t.globalData.star = this.data.list[n].cons_name + "座", console.log(t.globalData.star), 
        wx.navigateTo({
            url: "/pages/taluo/xi/xi"
        });
    },
    onLoad: function(n) {
        this.setData({
            list: t.xingzuo,
            item: t.globalData.item
        }), o.src = "/music/star.mp3", o.loop = !0, o.play(), console.log(123);
    },
    onReady: function() {},
    onShow: function() {
        t.xuan_xing && (t.xuan_xing = !1, wx.switchTab({
            url: "/pages/index/index"
        }));
    },
    onHide: function() {
        o.stop();
    },
    onUnload: function() {
        o.stop();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});