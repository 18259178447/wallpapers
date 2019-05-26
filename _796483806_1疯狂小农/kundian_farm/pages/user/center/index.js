var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        SystemInfo: app.globalData.sysData,
        isIphoneX: app.globalData.isIphoneX,
        nickName: "",
        avatarUrl: "../../../images/icon/moren.png",
        back_img: "",
        noPayCount: 0,
        peiCount: 0,
        getCount: 0,
        is_admin: 2,
        setData: [],
        is_distributor: 0,
        aboutData: [],
        tarbar: wx.getStorageSync("kundianFarmTarbar"),
        is_tarbar: !1,
        userInfo: [],
        styleType: 2,
        page: [],
        kefu: {
            cover: "",
            url: "/kundian_farm/pages/user/center/index?is_tarbar=true",
            title: ""
        }
    },
    onLoad: function(a) {
        var e = parseInt(new Date().valueOf()), t = wx.getStorageSync("farmCenterPage");
        !t || wx.getStorageSync("farmCenterPage" + uniacid) < e ? this.getCenterPage() : this.setData({
            page: t,
            styleType: t.currentType
        });
        var n = wx.getStorageSync("kundian_farm_uid"), r = wx.getStorageSync("kundian_farm_setData"), i = !1;
        a.is_tarbar && (i = a.is_tarbar);
        var o = wx.getStorageSync("kundian_farm_setData"), u = this.data.kefu;
        if (o.kefu_card) {
            var s = o.kefu_card;
            u.title = s.title || "个人中心", u.cover = s.cover || this.data.avatarUrl;
        }
        this.setData({
            setData: r,
            tarbar: wx.getStorageSync("kundianFarmTarbar"),
            is_tarbar: i,
            kefu: u
        }), n || wx.navigateTo({
            url: "../../login/index"
        }), app.util.setNavColor(uniacid);
    },
    getCenterPage: function(a) {
        var n = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getCenterPage",
                control: "index",
                uniacid: uniacid
            },
            success: function(a) {
                var e = a.data.centerPage;
                n.setData({
                    page: e,
                    styleType: e.currentType
                });
                var t = parseInt(new Date().valueOf()) + 18e5;
                wx.setStorageSync("farmCenterPage", e), wx.setStorageSync("farmCenterPage" + uniacid, t);
            }
        });
    },
    getUserData: function() {
        var d = this, a = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getUserInfo",
                control: "index",
                uid: a,
                uniacid: uniacid
            },
            success: function(a) {
                var e = a.data, t = e.noPayCount, n = e.peiCount, r = e.getCount, i = e.is_admin, o = e.back_img, u = e.aboutData, s = a.data.userInfo || {};
                0 < Object.keys(s).length ? a.data.userInfo.avatarurl && null != a.data.userInfo.avatarurl && d.setData({
                    nickName: s.nickname,
                    avatarUrl: s.avatarurl,
                    is_distributor: s.is_distributor || 0,
                    noPayCount: t,
                    peiCount: n,
                    getCount: r,
                    is_admin: i,
                    userInfo: s,
                    aboutData: u,
                    back_img: o
                }) : d.setData({
                    noPayCount: t,
                    peiCount: n,
                    getCount: r,
                    is_admin: i,
                    userInfo: s,
                    aboutData: u,
                    back_img: o
                }), s || (wx.removeStorageSync("kundian_farm_wxInfo"), wx.removeStorageSync("userInfo"), 
                wx.navigateTo({
                    url: "../../login/index"
                }));
            }
        });
    },
    onShow: function(a) {
        var e = wx.getStorageSync("kundian_farm_wxInfo");
        e && this.setData({
            avatarUrl: e.avatarUrl,
            nickName: e.nickName
        }), this.getUserData(), this.setData({
            tarbar: wx.getStorageSync("kundianFarmTarbar")
        });
    },
    intoOrder: function(a) {
        var e = a.currentTarget.dataset.status;
        wx.navigateTo({
            url: "../../shop/orderList/index?status=" + e
        });
    },
    updateUserInfo: function(a) {
        var i = this, o = getApp(), u = o.siteInfo.uniacid;
        o.util.getUserInfo(function(a) {
            wx.setStorageSync("kundian_farm_uid", a.memberInfo.uid), wx.setStorageSync("kundian_farm_sessionid", a.sessionid), 
            wx.setStorageSync("kundian_farm_wxInfo", a.wxInfo), console.log(a.wxInfo);
            var e = a.memberInfo, t = a.wxInfo.avatarUrl, n = a.wxInfo.nickName, r = e.uid;
            if (i.setData({
                nickName: n,
                avatarUrl: t
            }), !r) return wx.showModal({
                title: "提示",
                content: "获取用户UID失败",
                showCancel: !1
            }), !1;
            o.util.request({
                url: "entry/wxapp/class",
                data: {
                    op: "login",
                    control: "index",
                    avatar: e.avatar,
                    nickname: e.nickname,
                    uid: r,
                    uniacid: u,
                    wxNickName: n,
                    wxAvatar: t
                },
                success: function(a) {
                    var e = wx.getStorageSync("farm_share_uid");
                    null != e && 0 != e && o.loginBindParent(e, r), wx.showModal({
                        title: "提示",
                        content: a.data.msg,
                        showCancel: !1
                    });
                }
            });
        }, a.detail);
    },
    onPullDownRefresh: function(a) {
        var r = this, e = wx.getStorageSync("kundian_farm_wxInfo");
        e && r.setData({
            avatarUrl: e.avatarUrl,
            nickName: e.nickName
        }), r.getCenterPage(), r.getUserData(), app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getCommonData",
                control: "index",
                uniacid: uniacid
            },
            success: function(a) {
                var e = a.data, t = e.tarbar, n = e.farmSetData;
                r.setData({
                    tarbar: t,
                    farmSetData: n
                }), wx.setStorageSync("kundianFarmTarbar", t), wx.setStorageSync("kundian_farm_setData", n);
            }
        }), wx.stopPullDownRefresh();
    },
    intoAdmin: function(a) {
        wx.navigateTo({
            url: "../userCenter/index"
        });
    },
    callPhone: function(a) {
        var e = a.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    intoMenuDetail: function(a) {
        var e = a.currentTarget.dataset.menutype, t = a.currentTarget.dataset.url;
        if ("center_address" == e) wx.navigateTo({
            url: "/kundian_farm/pages/user/address/index"
        }); else if ("center_sale" == e) {
            var n = this.data.is_distributor;
            1 == n ? wx.navigateTo({
                url: "/kundian_farm/pages/distribution/index/index"
            }) : 2 == n ? wx.navigateTo({
                url: "/kundian_farm/pages/distribution/examine/index"
            }) : wx.navigateTo({
                url: "/kundian_farm/pages/distribution/addinfo/index"
            });
        } else "center_animal" == e ? wx.navigateTo({
            url: "/kundian_farm/pages/" + t + "?current=4"
        }) : "center_set" == e ? wx.navigateTo({
            url: "/kundian_farm/pages/user/install/index"
        }) : "center_funding" == e ? wx.navigateTo({
            url: "/kundian_funding/pages/orderList/index"
        }) : "center_active" == e ? wx.navigateTo({
            url: "/kundian_active/pages/orderList/index"
        }) : "plugin_pt" == e ? wx.navigateTo({
            url: "/kundian_pt/pages/orderLists/index"
        }) : wx.navigateTo({
            url: "/kundian_farm/pages/" + t
        });
    },
    intoSetting: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/install/index"
        });
    },
    intoScoreRecord: function(a) {
        wx.navigateTo({
            url: "/kundian_farm/pages/shop/integral/record/index"
        });
    },
    intoMoney: function() {
        wx.navigateTo({
            url: "/kundian_farm/pages/user/wallet/index"
        });
    },
    intoSign: function() {
        wx.navigateTo({
            url: "/kundian_farm/pages/shop/integral/index/index"
        });
    },
    showSystemInfo: function(a) {
        var e = "domain=" + app.siteInfo.siteroot + ";uid=" + wx.getStorageSync("kundian_farm_uid") + ";uniacid=" + app.siteInfo.uniacid;
        wx.showModal({
            title: "提示",
            content: e,
            showCancel: !1
        });
    }
});