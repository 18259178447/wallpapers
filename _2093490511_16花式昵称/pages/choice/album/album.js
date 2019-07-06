var t = getApp(), a = null;

Page({
    data: {
        // unitid: t.globalData.unitid,
        loading: !1,
        datalist: [],
        dataListPage: 1
    },
    onLoad: function(t) {
        var n = t.id, i = t.title;
        this.setData({
            id: n
        }), wx.setNavigationBarTitle({
            title: i
        })
    },
    getList: function() {
        var a = this;
        a.data.datalist, a.data.dataListPage;
        t.func.getReq("Article/show/id/" + a.data.id, function(t) {
            var n = t.data.data.nicklist;
            null != n && a.setData({
                datalist: n.split(",")
            }), null == n && a.setData({
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
        this.getList(), a && a.show().catch(function(t) {
            console.error(t);
        });
    },
    onReachBottom: function() {
        this.getList();
    },
    onPullDownRefresh: function() {
        this.getList(), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function (a) {
      return {
        title: "送你一份《个性昵称大全》",
        path: "/pages/index/index"
      };
    }
});