var WxParse = require("../../../../wxParse/wxParse.js"), app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        articleDetail: []
    },
    onLoad: function(a) {
        var t = this, e = a.aid;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "article",
                op: "getArticleDetail",
                uniacid: uniacid,
                aid: e
            },
            success: function(a) {
                t.setData({
                    articleDetail: a.data.articleDetail
                }), "" != a.data.articleDetail.content && WxParse.wxParse("article", "html", a.data.articleDetail.content, t, 5);
            }
        }), app.util.setNavColor(uniacid);
    }
});