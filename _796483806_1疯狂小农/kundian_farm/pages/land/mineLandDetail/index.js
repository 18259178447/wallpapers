var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        lid: "",
        mineLand: [],
        sendMine: [],
        landStatus: [],
        scrollLeft: 0,
        isShow: !1,
        farmSetData: [],
        isLoading: !1,
        countDownNum: 30,
        close_type: 0,
        icon: [],
        is_loading: !0,
        is_show_status: !1,
        is_show_gain_dialog: !1,
        gainSeed: [],
        open_land_pay: 1,
        is_open_webthing: 0,
        land_opreation_time: 30,
        src_xy: []
    },
    onLoad: function(a) {
        var u = this, l = a.lid, t = wx.getStorageSync("kundian_farm_uid"), e = wx.getStorageSync("kundian_farm_setData");
        wx.showLoading({
            title: "玩命加载中..."
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getMineLandDetail",
                control: "land",
                uid: t,
                uniacid: uniacid,
                lid: l
            },
            success: function(a) {
                var t = a.data, e = t.mineLand, n = t.landSeed, i = t.icon, d = t.open_land_pay, o = t.is_open_webthing, s = t.land_opreation_time, c = e.live_src, r = [];
                c && (r = c.split(":")), u.setData({
                    mineLand: e,
                    lid: l,
                    sendMine: n,
                    icon: i,
                    open_land_pay: d,
                    is_open_webthing: o,
                    land_opreation_time: s || 30,
                    src_xy: r
                }), wx.hideLoading();
            }
        }), this.videoContext = wx.createVideoContext("myVideo", this), app.util.setNavColor(uniacid), 
        this.setData({
            farmSetData: e,
            lid: l
        });
    },
    getLandDetail: function(t) {
        var e = this, a = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getMineLandDetail",
                control: "land",
                uid: a,
                uniacid: uniacid,
                lid: t
            },
            success: function(a) {
                e.setData({
                    mineLand: a.data.mineLand,
                    lid: t,
                    sendMine: a.data.landSeed,
                    icon: a.data.icon
                });
            }
        });
    },
    getSeed: function(a) {
        var t = a.currentTarget.dataset.seedid, e = this.data.mineLand.id;
        wx.navigateTo({
            url: "../confirm_order/index?seed_id=" + t + "&mine_land_id=" + e
        });
    },
    showVideo: function() {
        this.setData({
            isShow: !this.data.isShow
        }), this.data.isShow && this.videoContext.play();
    },
    LookImg: function(a) {
        for (var t = this.data.landStatus, e = a.currentTarget.dataset.id, n = (a.currentTarget.dataset.index, 
        new Array()), i = 0; i < t.length; i++) if (t[i].id == e) {
            n = t[i].src;
            break;
        }
        wx.previewImage({
            urls: n
        });
    },
    watering: function(a) {
        var t = this, e = t.data, n = e.mineLand, i = e.open_land_pay, d = wx.getStorageSync("kundian_farm_uid"), o = a.detail.formId;
        if (1 == i) return wx.showLoading({
            title: "加载中..."
        }), void app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "operationLand",
                control: "control",
                uniacid: uniacid,
                uid: d,
                adopt_id: n.id,
                operatype: 4,
                land_name: n.land_name + n.land_num,
                did: n.deviceInfo.did
            },
            success: function(a) {
                if (-1 == a.data.code) return wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                }), !1;
                var e = a.data.order_id;
                app.util.request({
                    url: "entry/wxapp/pay",
                    data: {
                        control: "control",
                        order_id: e,
                        uniacid: uniacid,
                        op: "getOperationPayOrder"
                    },
                    cachetime: "0",
                    success: function(a) {
                        if (a.data && a.data.data && !a.data.errno) {
                            var t = a.data.data.package;
                            wx.requestPayment({
                                timeStamp: a.data.data.timeStamp,
                                nonceStr: a.data.data.nonceStr,
                                package: a.data.data.package,
                                signType: "MD5",
                                paySign: a.data.data.paySign,
                                success: function(a) {
                                    wx.hideLoading(), app.util.request({
                                        url: "entry/wxapp/class",
                                        data: {
                                            op: "operation_notify",
                                            control: "control",
                                            order_id: e,
                                            uniacid: uniacid,
                                            prepay_id: t
                                        },
                                        success: function(a) {
                                            wx.showModal({
                                                title: "提示",
                                                content: "支付成功,请等待管理员进行相关操作",
                                                showCancel: "false"
                                            });
                                        }
                                    });
                                },
                                fail: function(a) {
                                    wx.showModal({
                                        title: "系统提示",
                                        content: "您取消了支付",
                                        showCancel: !1,
                                        success: function(a) {}
                                    });
                                }
                            });
                        }
                    },
                    fail: function(a) {
                        if ("JSAPI支付必须传openid" == a.data.message) return wx.navigateTo({
                            url: "/kundian_farm/pages/login/index"
                        }), !1;
                        wx.showModal({
                            title: "系统提示",
                            content: a.data.message ? a.data.message : "错误",
                            showCancel: !1,
                            success: function(a) {}
                        });
                    }
                });
            }
        });
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "watering",
                control: "control",
                uniacid: uniacid,
                uid: d,
                lid: n.id,
                web_did: n.deviceInfo.did,
                formId: o,
                did: n.id,
                operatype: 4
            },
            success: function(a) {
                1 == a.data.code ? (t.setData({
                    close_type: 1
                }), t.countDown(n.deviceInfo.did, 1)) : wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    fertilization: function(a) {
        var t = this, e = t.data, n = e.mineLand, i = e.open_land_pay, d = wx.getStorageSync("kundian_farm_uid"), o = a.detail.formId;
        if (1 == i) return wx.showLoading({
            title: "加载中..."
        }), void app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "operationLand",
                control: "control",
                uniacid: uniacid,
                uid: d,
                adopt_id: n.id,
                operatype: 1,
                land_name: n.land_name + n.land_num,
                did: n.id
            },
            success: function(a) {
                if (-1 == a.data.code) return wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                }), !1;
                var e = a.data.order_id;
                app.util.request({
                    url: "entry/wxapp/pay",
                    data: {
                        control: "control",
                        order_id: e,
                        uniacid: uniacid,
                        op: "getOperationPayOrder"
                    },
                    cachetime: "0",
                    success: function(a) {
                        if (a.data && a.data.data && !a.data.errno) {
                            var t = a.data.data.package;
                            wx.requestPayment({
                                timeStamp: a.data.data.timeStamp,
                                nonceStr: a.data.data.nonceStr,
                                package: a.data.data.package,
                                signType: "MD5",
                                paySign: a.data.data.paySign,
                                success: function(a) {
                                    wx.hideLoading(), app.util.request({
                                        url: "entry/wxapp/class",
                                        data: {
                                            op: "operation_notify",
                                            control: "control",
                                            order_id: e,
                                            uniacid: uniacid,
                                            prepay_id: t
                                        },
                                        success: function(a) {
                                            wx.showModal({
                                                title: "提示",
                                                content: "支付成功,请等待管理员进行相关操作",
                                                showCancel: "false"
                                            });
                                        }
                                    });
                                },
                                fail: function(a) {
                                    wx.showModal({
                                        title: "系统提示",
                                        content: "您取消了支付",
                                        showCancel: !1,
                                        success: function(a) {}
                                    });
                                }
                            });
                        }
                    },
                    fail: function(a) {
                        if ("JSAPI支付必须传openid" == a.data.message) return wx.navigateTo({
                            url: "/kundian_farm/pages/login/index"
                        }), !1;
                        wx.showModal({
                            title: "系统提示",
                            content: a.data.message ? a.data.message : "错误",
                            showCancel: !1,
                            success: function(a) {}
                        });
                    }
                });
            }
        });
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "watering",
                control: "control",
                uniacid: uniacid,
                uid: d,
                lid: n.id,
                web_did: n.deviceInfo.did,
                formId: o,
                operatype: 1
            },
            success: function(a) {
                1 == a.data.code ? (t.setData({
                    close_type: 2
                }), t.countDown(n.deviceInfo.did, 2)) : wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    killVer: function(a) {
        var t = this, e = t.data, n = e.mineLand, i = e.open_land_pay, d = wx.getStorageSync("kundian_farm_uid"), o = a.detail.formId;
        if (1 == i) return wx.showLoading({
            title: "加载中..."
        }), void app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "operationLand",
                control: "control",
                uniacid: uniacid,
                uid: d,
                adopt_id: n.id,
                operatype: 3,
                land_name: n.land_name + n.land_num,
                did: n.id
            },
            success: function(a) {
                if (-1 == a.data.code) return wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                }), !1;
                var e = a.data.order_id;
                app.util.request({
                    url: "entry/wxapp/pay",
                    data: {
                        control: "control",
                        order_id: e,
                        uniacid: uniacid,
                        op: "getOperationPayOrder"
                    },
                    cachetime: "0",
                    success: function(a) {
                        if (a.data && a.data.data && !a.data.errno) {
                            var t = a.data.data.package;
                            wx.requestPayment({
                                timeStamp: a.data.data.timeStamp,
                                nonceStr: a.data.data.nonceStr,
                                package: a.data.data.package,
                                signType: "MD5",
                                paySign: a.data.data.paySign,
                                success: function(a) {
                                    wx.hideLoading(), app.util.request({
                                        url: "entry/wxapp/class",
                                        data: {
                                            op: "operation_notify",
                                            control: "control",
                                            order_id: e,
                                            uniacid: uniacid,
                                            prepay_id: t
                                        },
                                        success: function(a) {
                                            wx.showModal({
                                                title: "提示",
                                                content: "支付成功,请等待管理员进行相关操作",
                                                showCancel: "false"
                                            });
                                        }
                                    });
                                },
                                fail: function(a) {
                                    wx.showModal({
                                        title: "系统提示",
                                        content: "您取消了支付",
                                        showCancel: !1,
                                        success: function(a) {}
                                    });
                                }
                            });
                        }
                    },
                    fail: function(a) {
                        if ("JSAPI支付必须传openid" == a.data.message) return wx.navigateTo({
                            url: "/kundian_farm/pages/login/index"
                        }), !1;
                        wx.showModal({
                            title: "系统提示",
                            content: a.data.message ? a.data.message : "错误",
                            showCancel: !1,
                            success: function(a) {}
                        });
                    }
                });
            }
        });
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "watering",
                control: "control",
                uniacid: uniacid,
                uid: d,
                lid: n.id,
                web_did: n.deviceInfo.did,
                formId: o,
                operatype: 3
            },
            success: function(a) {
                1 == a.data.code ? (t.setData({
                    close_type: 3
                }), t.countDown(n.deviceInfo.did, 3)) : wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    weeding: function(a) {
        var t = this.data, e = t.mineLand, n = t.open_land_pay, i = wx.getStorageSync("kundian_farm_uid"), d = a.detail.formId;
        if (1 == n) return wx.showLoading({
            title: "加载中..."
        }), void app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "operationLand",
                control: "control",
                uniacid: uniacid,
                uid: i,
                adopt_id: e.id,
                operatype: 2,
                land_name: e.land_name + e.land_num,
                did: e.id
            },
            success: function(a) {
                if (-1 == a.data.code) return wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                }), !1;
                var e = a.data.order_id;
                app.util.request({
                    url: "entry/wxapp/pay",
                    data: {
                        control: "control",
                        order_id: e,
                        uniacid: uniacid,
                        op: "getOperationPayOrder"
                    },
                    cachetime: "0",
                    success: function(a) {
                        if (a.data && a.data.data && !a.data.errno) {
                            var t = a.data.data.package;
                            wx.requestPayment({
                                timeStamp: a.data.data.timeStamp,
                                nonceStr: a.data.data.nonceStr,
                                package: a.data.data.package,
                                signType: "MD5",
                                paySign: a.data.data.paySign,
                                success: function(a) {
                                    wx.hideLoading(), app.util.request({
                                        url: "entry/wxapp/class",
                                        data: {
                                            op: "operation_notify",
                                            control: "control",
                                            order_id: e,
                                            uniacid: uniacid,
                                            prepay_id: t
                                        },
                                        success: function(a) {
                                            wx.showModal({
                                                title: "提示",
                                                content: "支付成功,请等待管理员进行相关操作",
                                                showCancel: "false"
                                            });
                                        }
                                    });
                                },
                                fail: function(a) {
                                    wx.showModal({
                                        title: "系统提示",
                                        content: "您取消了支付",
                                        showCancel: !1,
                                        success: function(a) {}
                                    });
                                }
                            });
                        }
                    },
                    fail: function(a) {
                        if ("JSAPI支付必须传openid" == a.data.message) return wx.navigateTo({
                            url: "/kundian_farm/pages/login/index"
                        }), !1;
                        wx.showModal({
                            title: "系统提示",
                            content: a.data.message ? a.data.message : "错误",
                            showCancel: !1,
                            success: function(a) {}
                        });
                    }
                });
            }
        });
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "watering",
                control: "control",
                uniacid: uniacid,
                uid: i,
                lid: e.id,
                formId: d,
                operatype: 2
            },
            success: function(a) {
                wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    countDown: function(a, t) {
        var e = this, n = e.data.land_opreation_time;
        e.setData({
            isLoading: !0,
            countDownNum: e.data.land_opreation_time
        }), e.setData({
            timer: setInterval(function() {
                n--, e.setData({
                    countDownNum: n
                }), 0 == n && (clearInterval(e.data.timer), e.setData({
                    isLoading: !1
                }), e.closeDevice(a, t));
            }, 1e3)
        });
    },
    closeDevice: function(a, t) {
        var e = this, n = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "closeDevice",
                control: "control",
                web_did: a,
                close_type: t,
                uniacid: uniacid,
                uid: n
            },
            success: function(a) {
                console.log(a), wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1
                }), e.setData({
                    close_type: 0
                });
            }
        });
    },
    submitData: function(a) {
        console.log(a);
    },
    onUnload: function(a) {
        var t = this.data.close_type;
        if (1 == t || 2 == t || 3 == t) {
            var e = this.data.mineLand.deviceInfo.did;
            this.closeDevice(e, t), clearInterval(this.data.timer);
        }
    },
    play: function(a) {
        this.setData({
            is_loading: !1
        });
    },
    lookStatusInfo: function(a) {
        if (this.setData({
            is_show_status: !this.data.is_show_status
        }), this.data.is_show_status) {
            var t = this, e = a.currentTarget.dataset.seedid, n = a.currentTarget.dataset.lid, i = a.detail.formId, d = wx.getStorageSync("kundian_farm_uid");
            wx.showLoading({
                title: "玩命加载中..."
            }), app.util.request({
                url: "entry/wxapp/class",
                data: {
                    op: "getSeedStatusList",
                    control: "land",
                    uniacid: uniacid,
                    seed_id: e,
                    lid: n,
                    formid: i,
                    uid: d
                },
                success: function(a) {
                    t.setData({
                        landStatus: a.data.landStatus
                    }), wx.hideLoading();
                }
            });
        }
    },
    toSeed: function(a) {
        var t = this.data.lid, e = this.data.mineLand;
        if (e.residue_area <= 0) return wx.showModal({
            title: "提示",
            content: "当前地块面积不足~",
            showCancel: !1
        }), !1;
        wx.navigateTo({
            url: "/kundian_farm/pages/land/seedList/index?lid=" + t + "&can_count=" + e.residue_area
        });
    },
    pickSeed: function(a) {
        var t = this;
        if (this.setData({
            is_show_gain_dialog: !this.data.is_show_gain_dialog
        }), this.data.is_show_gain_dialog) {
            var e = a.currentTarget.dataset.seedid;
            this.data.sendMine.map(function(a) {
                e == a.id && t.setData({
                    gainSeed: a
                });
            });
        }
    },
    gainSeed: function(a) {
        var e = this, t = wx.getStorageSync("uid"), n = a.currentTarget.dataset.seedid, i = a.detail.formId;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "gainSeed",
                control: "land",
                uniacid: uniacid,
                seed_id: n,
                uid: t,
                formid: i
            },
            success: function(a) {
                wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1,
                    success: function(a) {
                        var t = e.data.lid;
                        e.getLandDetail(t), e.setData({
                            is_show_gain_dialog: !e.data.is_show_gain_dialog
                        });
                    }
                });
            }
        });
    },
    intoBag: function(a) {
        var t = a.detail.formId;
        wx.navigateTo({
            url: "../seedBag/index?formid=" + t
        });
    },
    previewImg: function(a) {
        var t = a.currentTarget.dataset, e = t.id, n = t.current, i = this.data.landStatus, d = [];
        i.map(function(a) {
            a.id == e && (d = a.src);
        }), wx.previewImage({
            urls: d,
            current: d[n]
        });
    }
});