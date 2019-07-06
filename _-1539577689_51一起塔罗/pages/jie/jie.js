var n = getApp();

Page({
    data: {
        card: {}
    },
    preview: function() {
        var n = [ this.data.card.card_pic ];
        wx.previewImage({
            urls: n
        });
    },
    onLoad: function(e) {
        e.id;
        var t = this;
        wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: n.yu + "/index.php/Index/getCardDetail",
            header: {
                "Content-type": "application/json"
            },
            method: "POST",
            data: {
                card_id: e.id,
                secert: n.secert
            },
            success: function(n) {
                console.log(n), wx.hideLoading(), t.setData({
                    card: n.data.card
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});