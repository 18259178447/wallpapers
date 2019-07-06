var t = getApp();

Page({
    data: {
        // unitid: t.globalData.unitid,
        nlist: [],
        nListPage: 1,
        qlist: [],
        qListPage: 1,
        loading: !0,
        navSelected: 0,
        navlist: []
    },
    onLoad: function(t) {},
    onShow: function() {
        var a = this;
        t.func.req("article/nav_list", {
            id: 1
        }, function(t) {
            var i = t.data;
            a.setData({
                navlist: i.list
            });
        }), this.getNicknamelist(), this.getSignaturelist();
    },
    navTab: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            navSelected: a
        });
    },
    subListTo: function(t) {
        var a = t.currentTarget.id, i = t.currentTarget.dataset.index;
        console.log(t.currentTarget.dataset.index), wx.navigateTo({
            url: "./list/list?id=" + a + "&catname=" + i
        });
    },
    albumTo: function(t) {
        var a = t.currentTarget.id, i = t.currentTarget.dataset.index;
        console.log(t.currentTarget.dataset.index), wx.navigateTo({
            url: "./album/album?id=" + a + "&title=" + i
        });
    },
    getNicknamelist: function() {
        var a = this, i = a.data.nlist, n = a.data.nListPage;
        t.func.req("article/lists", {
            id: 6,
            page: n
        }, function(t) {
            var n = t.data;
            null != n.list && a.setData({
                nlist: i.concat(n.list),
                nListPage: a.data.nListPage + 1
            }), null == n.list && a.setData({
                loading: !1
            });
        });
    },
    getSignaturelist: function() {
        var a = this, i = a.data.qlist, n = a.data.qListPage;
        t.func.req("article/lists", {
            id: 7,
            page: n
        }, function(t) {
            var n = t.data;
            null != n.list && a.setData({
                qlist: i.concat(n.list),
                qListPage: a.data.qListPage + 1
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        0 == this.data.navSelected ? this.getNicknamelist() : this.getSignaturelist();
    },
    onShareAppMessage: function() {}
});