var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        commentList: [],
        page: 1,
        goods_id: 0
    },
    onLoad: function(t) {
        var a = t.goods_id;
        this.getCommentList(a, 1);
    },
    onReachBottom: function() {
        var t = this.data, a = t.goods_id, e = t.page;
        this.getCommentList(a, parseInt(e) + 1);
    },
    getCommentList: function(i, n) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "shop",
                op: "getCommentList",
                uniacid: uniacid,
                page: n,
                goods_id: i
            },
            success: function(t) {
                var a = o.data.commentList, e = t.data.commentList;
                1 < n ? (0 < e.length && e.map(function(t) {
                    a.push(t);
                }), o.setData({
                    commentList: a,
                    page: n,
                    goods_id: i
                })) : o.setData({
                    commentList: t.data.commentList,
                    goods_id: i
                });
            }
        });
    },
    previewImg: function(t) {
        var a = t.currentTarget.dataset.id, e = t.currentTarget.dataset.index, i = this.data.commentList, n = [];
        i.map(function(t) {
            t.id == a && (n = t.src);
        }), wx.previewImage({
            urls: n,
            current: n[e]
        });
    }
});