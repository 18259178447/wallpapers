var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        currentType: 0,
        currentIndex: 0,
        typeList: [],
        lists: [],
        videos: [],
        farmSetData: []
    },
    onLoad: function(t) {
        var a = {
            control: "article",
            op: "getArticleData",
            uniacid: uniacid,
            page: 1
        };
        this.getArticle(a);
        var e = wx.getStorageSync("kundian_farm_setData");
        this.setData({
            farmSetData: e
        }), wx.setNavigationBarColor({
            frontColor: e.front_color,
            backgroundColor: e.background_color
        });
    },
    changeType: function(t) {
        var a = t.currentTarget.dataset.id;
        this.data.currentType !== a && this.setData({
            currentType: a
        });
        var e = {
            control: "article",
            op: "getArticleData",
            uniacid: uniacid,
            page: 1,
            type_id: a
        };
        this.getArticle(e);
    },
    getArticle: function(r) {
        wx.showLoading({
            title: "玩命加载中..."
        });
        var n = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: r,
            success: function(t) {
                if (1 == r.page) {
                    var a = n.data.typeList;
                    t.data.typeData && (a = t.data.typeData), n.setData({
                        lists: t.data.articleData,
                        currentType: t.data.type_id,
                        typeList: a
                    });
                } else {
                    var e = t.data.articleData, i = n.data.lists;
                    e.map(function(t) {
                        i.push(t);
                    }), n.setData({
                        lists: i
                    });
                }
                wx.hideLoading();
            }
        });
    },
    changeIndex: function(t) {
        var a = t.detail.current;
        this.setData({
            currentIndex: a
        });
    }
});