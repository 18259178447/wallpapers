var app = new getApp();

Page({
    data: {
        currentState: 1,
        adoptData: [],
        page: 1,
        farmSetData: [],
        isContent: !0
    },
    onLoad: function(t) {
        this.getAdoptData(t.current), this.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            currentState: t.current
        }), app.util.setNavColor(app.siteInfo.uniacid);
    },
    getAdoptData: function(t) {
        wx.showLoading({
            title: "玩命加载中"
        });
        var a = this, e = wx.getStorageSync("kundian_farm_uid"), n = app.siteInfo.uniacid;
        0 != e ? app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "animal",
                op: "getMyAnimal",
                uid: e,
                uniacid: n,
                status: t
            },
            success: function(t) {
                0 < t.data.animalData.length ? (a.data.adoptData = t.data.animalData, a.data.isContent = !0) : a.data.isContent = !1, 
                a.setData({
                    adoptData: a.data.adoptData,
                    isContent: a.data.isContent
                }), wx.hideLoading();
            }
        }) : wx.redirectTo({
            url: "../../login/index"
        });
    },
    changeState: function(t) {
        this.setData({
            currentState: t.currentTarget.dataset.state
        }), this.getAdoptData(t.currentTarget.dataset.state);
    },
    intoAdoptDetail: function(t) {
        var a = t.currentTarget.dataset.adoptid;
        wx.navigateTo({
            url: "../../shop/adoptiveState/index?adopt_id=" + a
        });
    },
    onShareAppMessage: function() {},
    gotoBuy: function(t) {
        wx.navigateTo({
            url: "../../shop/Adopt/index"
        });
    }
});