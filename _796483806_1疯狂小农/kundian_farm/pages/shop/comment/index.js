var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        imgArr: [],
        orderData: [],
        orderDetail: [],
        module_name: "kundian_farm"
    },
    onLoad: function(t) {
        var a = this, e = t.order_id, r = wx.getStorageSync("kundian_farm_uid"), i = "kundian_farm";
        t.module_name && (i = t.module_name);
        var o = {}, n = "entry/wxapp/class";
        if ("kundian_farm" == i && (o = {
            control: "order",
            op: "getOrderDetail",
            uid: r,
            uniacid: uniacid,
            order_id: e,
            module_name: i
        }), "kundian_farm_plugin_pt" == i) return n = app.util.getNewUrl("entry/wxapp/pt", i), 
        o = {
            op: "getCommentOrder",
            action: "index",
            uid: r,
            uniacid: uniacid,
            order_id: e,
            module_name: i
        }, wx.request({
            url: n,
            data: o,
            success: function(t) {
                var e = t.data.orderDetail;
                e.map(function(t) {
                    t.score = 5, t.title = "非常好", t.commentSrc = new Array();
                }), a.setData({
                    orderData: t.data.orderData,
                    orderDetail: e,
                    module_name: i
                });
            }
        }), !1;
        app.util.request({
            url: n,
            data: o,
            success: function(t) {
                var e = t.data.orderDetail;
                e.map(function(t) {
                    t.score = 5, t.title = "非常好", t.commentSrc = new Array();
                }), a.setData({
                    orderData: t.data.orderData,
                    orderDetail: e,
                    module_name: i
                });
            }
        });
    },
    pickScore: function(e) {
        var a = e.currentTarget.dataset.goodsid;
        this.data.orderDetail.map(function(t) {
            t.goods_id == a && (t.sroce = e.currentTarget.dataset.score, t.title = e.currentTarget.dataset.title);
        }), this.setData({
            score: e.currentTarget.dataset.score,
            title: e.currentTarget.dataset.title
        });
    },
    addImg: function(t) {
        var e = this, r = t.currentTarget.dataset.goodsid, i = e.data.orderDetail;
        wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var a = t.tempFilePaths;
                i.map(function(t) {
                    if (t.goods_id == r) for (var e = 0; e < a.length; e++) t.commentSrc.push(a[e]);
                }), e.setData({
                    orderDetail: i
                });
            }
        });
    },
    deleteImg: function(t) {
        var e = t.currentTarget.dataset, a = e.index, r = e.goodsid, i = this.data.orderDetail;
        i.map(function(t) {
            t.goods_id == r && t.commentSrc.splice(a, 1);
        }), this.setData({
            orderDetail: i
        });
    },
    getContent: function(e) {
        var a = e.currentTarget.dataset.goodsid;
        this.data.orderDetail.map(function(t) {
            a == t.goods_id && (t.content = e.detail.value);
        });
    },
    submitData: function(t) {
        var r = this;
        wx.showToast({
            title: "正在发布中...",
            icon: "loading",
            mask: !0,
            duration: 1e4
        }), this.updateImg().then(function(t) {
            console.log(t);
            var e = wx.getStorageSync("kundian_farm_uid"), a = r.data.module_name;
            app.util.request({
                url: "entry/wxapp/class",
                data: {
                    control: "order",
                    op: "commentOrder",
                    orderDetail: JSON.stringify(t),
                    uniacid: uniacid,
                    uid: e,
                    module_name: a
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    wx.hideToast(), wx.showModal({
                        title: "提示",
                        content: t.data.msg,
                        showCancel: "false",
                        success: function() {
                            0 == t.data.code && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            });
        }).then(function() {});
    },
    updateImg: function() {
        var e = this, i = this.data.orderDetail;
        return new Promise(function(r, t) {
            Promise.all(e.geturl()).then(function(t) {
                for (var e = 0; e < i.length; e++) {
                    i[e].imgs = [];
                    for (var a = 0; a < t.length; a++) i[e].goods_id === t[a].id && i[e].imgs.push(t[a].url);
                }
                r(i);
            });
        });
    },
    geturl: function() {
        var t = this.data.orderDetail, e = [];
        for (var a in t) for (var r = 0; r < t[a].commentSrc.length; r++) e.push(this.uploadImg(t[a].commentSrc[r], t[a].goods_id));
        return e;
    },
    uploadImg: function(e, r) {
        var t = app.siteInfo.siteroot, i = (t = t.replace("app/index.php", "web/index.php")) + "?i=" + app.siteInfo.uniacid + "&c=utility&a=file&do=upload&thumb=0";
        return new Promise(function(a, t) {
            wx.uploadFile({
                url: i,
                filePath: e,
                name: "file",
                formData: {
                    op: "upload_file"
                },
                success: function(t) {
                    var e = JSON.parse(t.data);
                    a({
                        url: e.url,
                        id: r
                    });
                }
            });
        });
    }
});