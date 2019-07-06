var a = getApp();

Page({
    data: {
        cdn: a.globalData.cdn,
        host: a.globalData.host,
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        currentIndex: 0,
        imgUrls: [],
        imgUrls2: [],
        imgUrls3: [],
        imgUrls4: [],
        showRocket: !1,
        showLogin: !1,
        showType: 0,
        isLoading: !1,
        isFinish: !1,
        navs: [],
        navsData: [],
        formDate: !1
    },
    onLoad: function() {
        var t = this;
        a.globalData.userInfo ? this.setData({
            userInfo: a.globalData.userInfo,
            hasUserInfo: !0
        }) : this.data.canIUse ? a.userInfoReadyCallback = function(e) {
            t.setData({
                userInfo: e.userInfo,
                hasUserInfo: !0
            }), a.globalData.userInfo = e.userInfo;
        } : wx.getUserInfo({
            success: function(e) {
                a.globalData.userInfo = e.userInfo, t.setData({
                    userInfo: e.userInfo,
                    hasUserInfo: !0
                });
            }
        }), this.getTopBanner(), this.getNavs(), this.setData({
            formDate: a.globalData.formDate
        });
    },
    getUserInfo: function(t) {
        console.log(t), a.globalData.userInfo = t.detail.userInfo, this.setData({
            userInfo: t.detail.userInfo,
            hasUserInfo: !0
        }), wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    handleChange: function(a) {
        this.setData({
            currentIndex: a.detail.current
        });
    },
    onPageScroll: function(a) {
        this.setData({
            showRocket: a.scrollTop > 300
        });
    },
    onReachBottom: function() {
        if (!this.data.isLoading) {
            this.setData({
                isLoading: !0
            });
            var a = this.data.showType, t = this.data.navsData[a];
            this.typesList({
                id: t.id,
                page: t.page,
                perPage: t.perPage
            }, a);
        }
    },
    backTop: function() {
        wx.pageScrollTo({
            scrollTop: 0
        });
    },
    jumpImg: function(a) {
        if (this.data.hasUserInfo) {
            var t = a.currentTarget.dataset.iid;
            wx.navigateTo({
                url: "/pages/imgs/index?id=" + t
            });
        } else this.setData({
            showLogin: !0
        });
    },
    jumptomine: function() {
        this.data.hasUserInfo ? wx.navigateTo({
            url: "/pages/mine/index"
        }) : this.setData({
            showLogin: !0
        });
    },
    jumpTypes: function(a) {
        if (this.data.hasUserInfo) {
            var t = a.currentTarget, e = t.dataset.zid, s = t.dataset.title;
            wx.navigateTo({
                url: "/pages/types/index?title=" + s + "&id=" + e
            });
        } else this.setData({
            showLogin: !0
        });
    },
    typesList: function(a, t) {
        var e = this, s = e.data.navsData, i = e.data.navsData[t], n = 0 == t || 1 == t, o = n ? "/getPicPageList" : "/getPicCategoryPage", r = n ? {
            type: 0 == t ? "random" : "new",
            page: a.page,
            perPage: a.perPage
        } : a;
        wx.request({
            url: this.data.host + o,
            data: r,
            success: function(a) {
                var n = a.data.data, o = null == n.next_page_url;
                i.list = i.list.concat(n.data), i.page++, s.splice(t, 1, i), e.setData({
                    navsData: s,
                    isFinish: o,
                    isLoading: !1
                });
            }
        });
    },
    openTypes: function(a) {
        if (this.data.hasUserInfo) {
            var t = a.currentTarget.dataset.index, e = this.data.navsData[t];
            this.setData({
                showType: t,
                isFinish: !1
            }), this.typesList({
                id: e.id,
                page: e.page,
                perPage: e.perPage
            }, t);
        } else this.setData({
            showLogin: !0
        });
    },
    getTopBanner: function() {
        var a = this;
        wx.request({
            url: this.data.host + "/getTopicList",
            data: {
                type: 1
            },
            success: function(t) {
                var e = t.data.data.map(function(a) {
                    return {
                        zid: a.id,
                        url: a.topic_pic,
                        title: a.topic_name
                    };
                });
                a.setData({
                    imgUrls: e
                });
            }
        }), wx.request({
            url: this.data.host + "/getTopicList",
            data: {
                type: 2
            },
            success: function(t) {
                var e = [], s = [], i = [];
                t.data.data.map(function(a, t) {
                    var n = {
                        zid: a.id,
                        url: a.topic_pic_thumb,
                        title: a.topic_name
                    };
                    t < 5 ? e.push(n) : t < 8 ? s.push(n) : i.push(n);
                }), a.setData({
                    imgUrls2: e,
                    imgUrls3: s,
                    imgUrls4: i
                });
            }
        });
    },
    getNavs: function() {
        var a = this;
        wx.request({
            url: this.data.host + "/getCategoryList",
            success: function(t) {
                var e = [], s = [];
                t.data.data.map(function(a) {
                    e.push({
                        label: a.category_name,
                        id: a.id
                    }), s.push({
                        id: a.id,
                        label: a.category_name,
                        list: [],
                        page: 1,
                        perPage: 16
                    });
                }), a.setData({
                    navs: e,
                    navsData: s
                }), a.typesList({
                    id: e[0].id,
                    page: 1,
                    perPage: 16
                }, 0);
            }
        });
    },
    onShareAppMessage: function(a) {
        return {
            title: "最热门的情侣头像都在这",
            imgUrl: this.data.cdn + "/logo.png"
        };
    },
    close_pop: function() {
        this.setData({
            showLogin: !1
        });
    },
    getFormID: function(t) {
        var e = this;
        wx.request({
            url: e.data.host + "/setWxFormId",
            data: {
                form_id: t.detail.formId
            },
            method: "POST",
            header: {
                Authorization: a.globalData.token
            },
            success: function(t) {
                wx.setStorage({
                    key: "formDate",
                    data: new Date().getTime()
                }), a.globalData.formDate = !0, e.setData({
                    formDate: !0
                }), setTimeout(function() {
                    e.jumptomine();
                }, 500);
            },
            fail: function(a) {
                console.log("失败" + a);
            }
        });
    }
});