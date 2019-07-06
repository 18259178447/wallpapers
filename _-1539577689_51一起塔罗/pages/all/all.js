var t = getApp();

Page({
    data: {
        cards: [],
        da: []
    },
    goCenter: function() {
        wx.redirectTo({
            url: "/pages/myCenter/myCenter"
        });
    },
    goIndex: function() {
        wx.redirectTo({
            url: "/pages/index/index"
        });
    },
    getAllCard: function() {
        var e = this;
        wx.request({
            url: t.yu + "/index.php/Index/getCardList.html",
            header: {
                "content-type": "application/json"
            },
            data: {
                secert: t.secert
            },
            method: "POST",
            success: function(t) {
                console.log(t), wx.setStorageSync("cards", t.data.card), e.setData({
                    cards: t.data.card
                });
            }
        });
    },
    jieshi: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/jie/jie?id=" + e
        });
    },
    getDaCard: function() {
        var e = this;
        wx.request({
            url: t.yu + "/index.php/Index/getCardList.html",
            header: {
                "content-type": "application/json"
            },
            data: {
                secert: t.secert,
                type: 0
            },
            method: "POST",
            success: function(t) {
                console.log(t), wx.setStorageSync("da_cards", t.data.card), e.setData({
                    da: t.data.card
                });
            }
        });
    },
    onLoad: function(t) {
        wx.getStorageSync("cards") ? this.setData({
            cards: wx.getStorageSync("cards"),
            da: wx.getStorageSync("da_cards")
        }) : (this.getAllCard(), this.getDaCard());
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});