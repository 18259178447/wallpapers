var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        money: "",
        userInfo: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, n = wx.getStorageSync("kundian_farm_uid");
        n ? app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "distribution",
                op: "getUserInfo",
                uniacid: uniacid,
                uid: n
            },
            success: function(a) {
                t.setData({
                    userInfo: a.data.user
                });
            }
        }) : wx.navigateTo({
            url: "../../login/index"
        }), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    allMoney: function() {
        this.setData({
            money: this.data.userInfo.price
        });
    },
    input: function(a) {
        var t = a.detail.value;
        this.setData({
            money: t
        });
    },
    intoOrder: function(a) {
        var t = a.currentTarget.dataset.ordertype;
        wx.navigateTo({
            url: "../orderList/index?order_type=" + t
        });
    },
    intoTixian: function(a) {
        wx.navigateTo({
            url: "../cash/cash"
        });
    },
    intoWithdrawRecord: function(a) {
        wx.navigateTo({
            url: "../recode/index"
        });
    },
    intoSalePrice: function(a) {
        wx.navigateTo({
            url: "../commission/index"
        });
    },
    intoTeam: function(a) {
        wx.navigateTo({
            url: "../team/index"
        });
    },
    intoCode: function(a) {
        wx.navigateTo({
            url: "../share/index"
        });
    }
});