var t = getApp();

Page({
    data: {
        // unitid: t.globalData.unitid,
        id: 24,
        loading: !0,
        datalist: [],
        dataListPage: 1,
        navlist: []
    },
    onLoad: function() {},
    onShow: function() {
        var a = this;
        t.func.req("article/subnav_list", {
            id: 24
        }, function(t) {
            var i = t.data;
            a.setData({
                navlist: i.list
            });
        }), this.getList();
    },
    subListTo: function(t) {
        var a = t.currentTarget.id;
        console.log(t.currentTarget.id), this.setData({
            id: a,
            datalist: [],
            dataListPage: 1
        }), this.getList();
    },
    getList: function() {
        var a = this, i = a.data.datalist, e = a.data.dataListPage;
        t.func.getReq("Article/lib/id/" + a.data.id + "/page/" + e, function(t) {
            var e = t.data;
            null != e.list && a.setData({
                datalist: i.concat(e.list),
                dataListPage: a.data.dataListPage + 1
            }), null == e.list && a.setData({
                loading: !1
            });
        });
    },
    copyTitle: function(a) {
        var i = a.currentTarget.dataset.index;
      var a = t.data;
      wx.setClipboardData({
        data: i,
        success: function (t) {
          wx.getClipboardData({
            success: function (t) {
              console.log(t.data)
            }
          });
        }
      })
    },
    onReachBottom: function() {
        this.getList();
    },
    onPullDownRefresh: function() {
        this.getList(), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function(a) {
        var i = wx.getStorageSync("sk");
        return {
            title: "送你一份《个性昵称大全》",
            path: "/pages/index/index"
        };
    }
});