var t = getApp();

Page({
    data: {
        // unitid: t.globalData.unitid,
        id: 8,
        loading: !0,
        datalist: [],
        dataListPage: 1
    },
    onLoad: function(t) {
        var a = t.id, i = t.catname;
        this.setData({
            id: a
        }), wx.setNavigationBarTitle({
            title: i
        });
    },
    getList: function() {
        var a = this, i = a.data.datalist, e = a.data.dataListPage;
        t.func.getReq("Article/lists/id/" + a.data.id + "/page/" + e, function(t) {
            var e = t.data;
            null != e.list && a.setData({
                datalist: i.concat(e.list),
                dataListPage: a.data.dataListPage + 1
            }), null == e.list && a.setData({
                loading: !1
            });
        });
    },
    copyTitle: function(t) {
        var a = t.currentTarget.dataset.index;
        wx.setClipboardData({
            data: a,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data), wx.showToast({
                            title: "已复制到粘贴板，粘贴即可使用",
                            icon: "none",
                            duration: 2e3
                        });
                    }
                });
            }
        });
    },
    onLaunch: function() {},
    onShow: function() {
        this.getList();
    },
    onReachBottom: function() {
        this.getList();
    },
    onPullDownRefresh: function() {
        this.getList(), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function(a) {
        return {
            title: "送你一份《个性昵称大全》",
            path: "/pages/index/index"
        };
    }
});