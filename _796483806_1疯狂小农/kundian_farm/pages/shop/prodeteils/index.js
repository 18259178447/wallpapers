var WxParse = require("../../../../wxParse/wxParse.js"), app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        isIphoneX: app.globalData.isIphoneX,
        pageScrollTop: 0,
        isShow: !1,
        scrollShow: !1,
        currentIndex: 1,
        goodsData: [],
        goodsid: "",
        is_show: "1",
        specItem: [],
        count: 1,
        price: "",
        spec_src: "",
        spec_id: "",
        buy_type: 1,
        specVal: [],
        sku_name_str: "",
        currentLsit: [],
        fertilizerList: [],
        pesticidesList: [],
        traceData: [],
        is_fumier: 1,
        user_uid: "",
        farmSetData: [],
        show_haibao: !1,
        show_goods_shop_model_mask: !1,
        bottom: 0,
        slideCurrentIndex: 1,
        commentCount: 0,
        commentList: [],
        is_create_poster: !1,
        local_src: "",
        post_src: "",
        showHome: !1,
        showIcon: !0,
        kefu: {
            cover: "",
            url: "/kundian_farm/pages/shop/prodeteils/index",
            title: ""
        },
        isHideVideo: !0,
        is_loading: !0
    },
    onLoad: function(t) {
        var a = this, e = t.goodsid;
        if (e) {
            var o = t.user_uid, s = wx.getStorageSync("kundian_farm_uid");
            app.loginBindParent(o, s), null != o && 0 != o && a.setData({
                user_uid: o,
                showHome: !0,
                showIcon: !1
            });
            var i = 0;
            -1 < app.globalData.sysData.model.indexOf("iPhone X") && (i = 68), a.getGoodsDetailData(e), 
            app.util.setNavColor(uniacid);
            var n = this.data.kefu;
            n.url = "/kundian_farm/pages/shop/prodeteils/index?goodsid=" + e, a.setData({
                farmSetData: wx.getStorageSync("kundian_farm_setData"),
                bottom: i,
                kefu: n,
                goodsid: e
            });
        } else wx.showModal({
            title: "提示",
            content: "当前商品不存在或已下架！",
            showCancel: "false",
            success: function() {
                wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    onShow: function(t) {
        var a = this.data.user_uid, e = wx.getStorageSync("kundian_farm_uid");
        app.loginBindParent(a, e);
    },
    setCurrent: function(t) {
        this.setData({
            slideCurrentIndex: parseInt(t.detail.current) + 1
        });
    },
    hideVideo: function(t) {
        this.setData({
            isHideVideo: !this.data.isHideVideo
        });
    },
    play: function(t) {
        this.setData({
            is_loading: !1
        });
    },
    getGoodsDetailData: function(r) {
        var u = this, l = this.data.kefu, p = wx.getStorageSync("kundian_farm_setData");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "shop",
                op: "getGoodsDetail",
                uniacid: uniacid,
                goodsid: r
            },
            success: function(t) {
                var a = [], e = t.data, o = e.goodsData, s = e.specItem, i = e.commentCount, n = e.commentList;
                if (t.data.traceData && (a = t.data.traceData), p.kefu_card) {
                    var c = p.kefu_card;
                    l.title = c.title || o.goods_name, l.cover = c.cover || o.cover;
                }
                var d = [];
                o.live_src && (d = o.live_src.split(":"));
                u.setData({
                    goodsData: o,
                    goodsid: r,
                    specItem: s,
                    traceData: a,
                    commentCount: i,
                    commentList: n,
                    kefu: l,
                    src_xy: d
                }), "" != t.data.goodsData.goods_desc && WxParse.wxParse("article", "html", t.data.goodsData.goods_desc, u, 5);
            }
        });
    },
    showMode: function(t) {
        var a = this, e = a.data.goodsData, o = wx.getStorageSync("kundian_farm_uid");
        if (o) if (1 == e.is_open_sku) a.setData({
            is_show: 2,
            buy_type: 2
        }); else {
            var s = a.data, i = s.goodsid, n = s.count;
            app.util.request({
                url: "entry/wxapp/class",
                data: {
                    control: "cart",
                    op: "addCart",
                    goods_id: i,
                    uniacid: uniacid,
                    count: n,
                    uid: o
                },
                success: function(t) {
                    1 == t.data.code ? wx.showToast({
                        title: "已加入购物车"
                    }) : wx.showToast({
                        title: "操作失败"
                    });
                }
            });
        } else wx.navigateTo({
            url: "../../login/index"
        });
    },
    hideModal: function() {
        this.setData({
            is_show: 1
        });
    },
    reduceNum: function() {
        1 != this.data.count && this.setData({
            count: this.data.count - 1
        });
    },
    addNum: function() {
        var t = parseInt(this.data.count) + 1;
        this.setData({
            count: t
        });
    },
    chooseNum: function(t) {
        var a = t.detail.value;
        a <= 1 ? this.setData({
            count: 1
        }) : this.setData({
            count: a
        });
    },
    selectSpec: function(t) {
        for (var i = this, a = i.data, e = a.goodsid, n = a.specItem, o = t.currentTarget.dataset, s = o.specid, c = o.valid, d = new Array(), r = 0; r < n.length; r++) {
            n[r].id == s && (n[r].select_spec = 1);
            for (var u = 0; u < n[r].specVal.length; u++) n[r].id == s && (n[r].specVal[u].select_val = 0), 
            n[r].specVal[u].id == c && (n[r].specVal[u].select_val = 1), 1 == n[r].specVal[u].select_val && d.push(n[r].specVal[u].id);
        }
        var l = d.join(",");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "shop",
                op: "getSpec",
                uniacid: uniacid,
                spec_id: l,
                goodsid: e
            },
            success: function(t) {
                if (1 == t.data.code) {
                    t.data.specVal.count <= 0 && wx.showToast({
                        title: "库存不足..."
                    });
                    for (var a = 0; a < n.length; a++) {
                        n[a].id == d && (n[a].is_select = 1);
                        for (var e = 0; e < n[a].specVal.length; e++) {
                            n[a].specVal[e].is_count = 1, n[a].specVal[e].id == c && (n[a].specVal[e].is_select = 0, 
                            t.data.specVal.count <= 0 && (n[a].specVal[e].is_count = 0));
                            for (var o = 0; o < d.length; o++) d[o] == c && d.splice(o, 1);
                        }
                    }
                    var s = t.data.specVal;
                    i.setData({
                        price: s.price,
                        spec_src: s.spec_src,
                        spec_id: s.id,
                        specItem: n,
                        specVal: s
                    });
                } else i.setData({
                    specItem: n
                });
            }
        });
    },
    sureGoods: function(t) {
        var a = this.data, e = a.goodsid, o = a.goodsData, s = a.spec_id, i = a.count, n = a.specVal, c = wx.getStorageSync("kundian_farm_uid");
        if (0 != c && null != c) if (1 == o.is_open_sku) {
            if ("" == s && 0 == s.length) return wx.showToast({
                title: "请选择规格",
                icon: "none"
            }), !1;
            n.sku_name ? n.count >= i ? wx.navigateTo({
                url: "../confrimOrder/index?goodsid=" + e + "&spec_id=" + s + "&count=" + i
            }) : wx.showToast({
                title: "库存不足",
                icon: "none"
            }) : wx.showToast({
                title: "请选择规格",
                icon: "none"
            });
        } else o.count >= i ? wx.navigateTo({
            url: "../confrimOrder/index?goodsid=" + o.id + "&count=" + i
        }) : wx.showToast({
            title: "库存不足",
            icon: "none"
        }); else wx.navigateTo({
            url: "../../login/index"
        });
    },
    buySelectSpec: function(t) {
        this.setData({
            is_show: 2,
            buy_type: 1
        });
    },
    buyNow: function(t) {
        var a = this.data, e = (a.goodsData, a.count, wx.getStorageSync("kundian_farm_uid"));
        0 != e && null != e ? this.setData({
            is_show: 2,
            buy_type: 1
        }) : wx.navigateTo({
            url: "../../login/index"
        });
    },
    addCart: function(t) {
        var a = this, e = a.data, o = e.goodsid, s = e.spec_id, i = e.count, n = e.specVal, c = wx.getStorageSync("kundian_farm_uid");
        if (0 != c && null != c) {
            if ("" == s || null == s) return wx.showToast({
                title: "请选择规格",
                icon: "none"
            }), !1;
            n.count >= i ? app.util.request({
                url: "entry/wxapp/class",
                data: {
                    control: "cart",
                    op: "addCart",
                    goods_id: o,
                    spec_id: s,
                    uniacid: uniacid,
                    count: i,
                    uid: c
                },
                success: function(t) {
                    1 == t.data.code ? (wx.showToast({
                        title: "已加入购物车",
                        icon: "none"
                    }), a.setData({
                        is_show: 1
                    })) : wx.showToast({
                        title: "操作失败",
                        icon: "none"
                    });
                }
            }) : wx.showToast({
                title: "库存不足",
                icon: "none"
            });
        } else wx.navigateTo({
            url: "../../login/index"
        });
    },
    goHome: function(t) {
        wx.reLaunch({
            url: "/kundian_farm/pages/HomePage/index/index?is_tarbar=true"
        });
    },
    onShareAppMessage: function() {
        var t = this.data.goodsData, a = wx.getStorageSync("kundian_farm_uid");
        return {
            path: "/kundian_farm/pages/shop/prodeteils/index?goodsid=" + t.id + "&user_uid=" + a,
            success: function(t) {},
            title: t.goods_name,
            imageUrl: t.cover
        };
    },
    intoCart: function(t) {
        wx.navigateTo({
            url: "../buyCar/index"
        });
    },
    proDetailVideo: function(t) {
        var a = t.currentTarget.dataset.videosrc;
        wx.navigateTo({
            url: "../prodeteilVideo/index?src=" + a
        });
    },
    chengeIndex: function(t) {
        this.setData({
            currentIndex: t.currentTarget.dataset.index
        });
    },
    onPageScroll: function(t) {
        var a = !1;
        350 <= t.scrollTop && (a = !0), this.setData({
            scrollShow: a
        }), 0 == this.data.isShow ? this.setData({
            pageScrollTop: t.scrollTop
        }) : wx.pageScrollTo({
            duration: 0
        });
    },
    isShow: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.goodsData;
        1 == a && this.setData({
            currentLsit: e.fumierData,
            isShow: !0,
            is_fumier: a
        }), 2 == a && this.setData({
            currentLsit: e.insecData,
            isShow: !0,
            is_fumier: a
        }), wx.pageScrollTo({
            duration: 0
        });
    },
    scroll: function(t) {
        wx.pageScrollTo({
            duration: 0
        });
    },
    noShow: function() {
        this.setData({
            isShow: !1
        });
    },
    returnTop: function() {
        wx.pageScrollTo({
            duration: 0
        });
    },
    previewImg: function(t) {
        var a = t.currentTarget.dataset, e = a.index, o = a.id, s = this.data.traceData, i = new Array();
        s.map(function(t) {
            t.id == o && (i = t.img);
        }), wx.previewImage({
            urls: i,
            current: i[e]
        });
    },
    previewSlideImg: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.goodsData;
        wx.previewImage({
            urls: e.goods_slide,
            current: e[a]
        });
    },
    showGoodsShareModel: function(t) {
        this.setData({
            show_shop_model: !0,
            show_goods_shop_model_mask: !0
        });
    },
    closeGoodsShareModel: function(t) {
        this.setData({
            show_shop_model: !1,
            show_goods_shop_model_mask: !1
        });
    },
    closeGoodsHaihao: function(t) {
        this.setData({
            show_haibao: !1,
            show_goods_shop_model_mask: !1
        });
    },
    createGoodsPost: function(t) {
        this.data.is_create_poster ? this.setData({
            show_shop_model: !1,
            show_haibao: !0
        }) : (wx.showLoading({
            title: "海报生成中"
        }), this.getPoster());
    },
    intoCommentList: function(t) {
        wx.navigateTo({
            url: "../commentList/index?goods_id=" + this.data.goodsid
        });
    },
    getPoster: function() {
        var a = this, t = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "shop",
                op: "getGoodsQrcode",
                uid: t,
                goods_id: a.data.goodsid,
                uniacid: uniacid
            },
            success: function(t) {
                a.setData({
                    local_src: t.data.local_src,
                    post_src: t.data.post_src,
                    show_shop_model: !1,
                    show_haibao: !0,
                    is_create_poster: !0
                });
            }
        });
    },
    saveGoodsPost: function(t) {
        var a = this.data.local_src;
        wx.downloadFile({
            url: a,
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        wx.showModal({
                            title: "提示",
                            content: "海报保存成功",
                            showCancel: !1
                        });
                    },
                    fail: function(t) {}
                });
            }
        });
    }
});