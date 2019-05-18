var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var t = a.cid, n = this;
        app.globalData.config ? (app.login(function(a) {
            n.setData({
                uid: a
            });
        }), n.cardList(t)) : app.getConfig(function(a) {
            app.login(function(a) {
                n.setData({
                    uid: a
                });
            }), n.cardList(t);
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.setNavigationBarTitle({
            title: "选择贺卡"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    showCard: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/tc_card/pages/card/index?id=" + t
        });
    },
    formid: function(a) {
        console.log(a.detail.formId), app.upForm(a.detail.formId);
    },
    cardList: function(a) {
        var t = this;
        app.util.request({
            url: "entry/wxapp/cardlist",
            method: "post",
            dataType: "json",
            showLoading: !1,
            data: {
                cid: a
            },
            success: function(a) {
                t.setData({
                    skinurl: app.globalData.config.skinurl,
                    listData: a.data.list,
                    llads: app.globalData.config.llads
                });
            }
        });
    }
});