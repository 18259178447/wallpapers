var WxParse = require("../../../../wxParse/wxParse.js"), app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        isPlay: !1,
        articleDetail: []
    },
    onLoad: function(a) {
        this.videoContext = wx.createVideoContext("myVideo");
        var t = this, i = a.aid;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "article",
                op: "getArticleDetail",
                uniacid: uniacid,
                aid: i
            },
            success: function(a) {
                t.setData({
                    articleDetail: a.data.articleDetail
                }), "" != a.data.articleDetail.content && WxParse.wxParse("article", "html", a.data.articleDetail.content, t, 5);
            }
        }), app.util.setNavColor(uniacid);
    },
    hadPause: function() {
        var a = this.data.isPlay;
        this.setData({
            isPlay: !a
        });
    },
    playVideo: function() {
        this.videoContext.play();
    }
});