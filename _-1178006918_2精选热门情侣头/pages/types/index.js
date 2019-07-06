var t = getApp();

Page({
    data: {
        cdn: t.globalData.cdn,
        host: t.globalData.host,
        top: "",
        isLoading: !1,
        page: 1,
        perPage: 16,
        id: null,
        isFinish: !1,
        showRocket: !1,
        list: []
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: t.title
        }), this.setData({
            id: t.id
        }), this.getTopImage(), this.getImageList();
    },
    getTopImage: function() {
        var t = this;
        wx.request({
            url: t.data.host + "/getTopicInfo",
            data: {
                id: t.data.id
            },
            success: function(a) {
                t.setData({
                    top: a.data.data.topic_pic
                });
            }
        });
    },
    getImageList: function() {
        var t = this, a = this.data, i = a.id, e = a.page, o = a.perPage;
        wx.request({
            url: t.data.host + "/getPicTopicPage",
            data: {
                id: i,
                page: e,
                perPage: o
            },
            success: function(a) {
                var i = a.data.data.data, o = t.data.list, n = null == a.data.data.next_page_url;
                o = o.concat(i), t.setData({
                    list: o,
                    isFinish: n,
                    isLoading: !1,
                    page: e + 1
                });
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
    jumptoImg: function(t) {
        var a = t.currentTarget.dataset.iid;
        wx.navigateTo({
            url: "/pages/imgs/index?id=" + a
        });
    },
    onPageScroll: function(t) {
        this.setData({
            showRocket: t.scrollTop > 300
        });
    },
    backTop: function() {
        wx.pageScrollTo({
            scrollTop: 0
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "最热门的情侣头像都在这",
            imgUrl: this.data.cdn + "/logo.png"
        };
    }
});