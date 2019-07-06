var a = getApp();

Page({
    data: {
        cdn: a.globalData.cdn,
        host: a.globalData.host,
        isLoading: !1,
        page: 1,
        perPage: 16,
        id: null,
        isFinish: !1,
        showRocket: !1,
        list: []
    },
    onLoad: function() {
        this.getImageList();
    },
    getImageList: function() {
        var t = this, i = this.data, e = i.page, n = i.perPage;
        i.isFinish || wx.request({
            url: t.data.host + "/userPicCollectPage",
            data: {
                page: e,
                perPage: n
            },
            header: {
                Authorization: a.globalData.token
            },
            success: function(a) {
                var i = a.data.data.data, n = t.data.list, o = null == a.data.data.next_page_url;
                i.length && (n = n.concat(i), t.setData({
                    list: n,
                    isFinish: o,
                    isLoading: !1,
                    page: e + 1
                }));
            }
        });
    },
    onReachBottom: function() {
        this.data.isLoading || (this.setData({
            isLoading: !0
        }), this.getImageList());
    },
    jumptoindex: function() {
        wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    jumptomine: function() {
        wx.navigateTo({
            url: "/pages/mine/index"
        });
    },
    jumptoImg: function(a) {
        var t = a.currentTarget.dataset.iid;
        wx.navigateTo({
            url: "/pages/imgs/index?id=" + t
        });
    },
    onPageScroll: function(a) {
        this.setData({
            showRocket: a.scrollTop > 300
        });
    },
    backTop: function() {
        wx.pageScrollTo({
            scrollTop: 0
        });
    },
    onShareAppMessage: function(a) {
        return {
            title: "最热门的情侣头像都在这",
            imgUrl: this.data.cdn + "/logo.png"
        };
    }
});