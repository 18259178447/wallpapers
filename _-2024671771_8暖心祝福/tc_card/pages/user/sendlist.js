var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var a = this;
        app.login(function(t) {
            a.setData({
                user: t
            }), a.sendlist();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    sendlist: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/sendlist",
            method: "post",
            dataType: "json",
            data: {
                openid: a.data.user
            },
            success: function(t) {
                t.data && a.setData({
                    skinurl: app.globalData.config.skinurl,
                    llads: app.globalData.config.llads,
                    list: t.data
                });
            }
        });
    },
    gotocard: function(t) {
        var a = t.currentTarget.dataset.id, s = t.currentTarget.dataset.index, n = this, e = n.data.list;
        wx.showActionSheet({
            itemList: [ "查看贺卡", "删除贺卡" ],
            success: function(t) {
                0 < t.tapIndex ? app.util.request({
                    url: "entry/wxapp/delcard",
                    method: "post",
                    dataType: "json",
                    data: {
                        openid: n.data.user,
                        id: a
                    },
                    success: function(t) {
                        t.data.result ? (wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 2e3
                        }), e.splice(s, 1), n.setData({
                            list: e
                        })) : wx.showToast({
                            title: "删除失败",
                            icon: "success",
                            duration: 2e3
                        });
                    }
                }) : wx.navigateTo({
                    url: "/tc_card/pages/card/card?scene=" + a
                });
            },
            fail: function(t) {
                console.log(t.errMsg);
            }
        });
    }
});