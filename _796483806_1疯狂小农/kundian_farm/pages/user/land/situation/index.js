var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        height: 0,
        currentList: {},
        isShow: !1,
        animation1: {},
        animation2: {},
        animation3: {},
        animation4: {},
        landMine: [],
        currentDeviceInfo: [],
        farmSetData: [],
        isLoading: !1,
        countDownNum: 30,
        close_type: 0,
        bottom: 0,
        icon: [],
        is_data: !0
    },
    onLoad: function(t) {
        var i = this, a = wx.getStorageSync("kundian_farm_uid");
        a ? (app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getControlAllLand",
                uniacid: uniacid,
                uid: a,
                control: "control"
            },
            success: function(t) {
                var a = !0;
                0 < t.data.landMine.length ? (a = !0, i.setData({
                    landMine: t.data.landMine,
                    currentList: t.data.landMine[0],
                    icon: t.data.icon,
                    is_data: a
                }), i.createAnimations()) : a = !1, i.setData({
                    is_data: a
                });
            }
        }), wx.getSystemInfo({
            success: function(t) {
                var a = t.windowHeight - 40;
                i.setData({
                    height: a
                });
            }
        })) : wx.navigateTo({
            url: "../../../login/index"
        });
        var e = 0;
        -1 < app.globalData.sysData.model.indexOf("iPhone X") && (e = 68), i.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            bottom: e
        });
    },
    createAnimations: function() {
        var t = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1e3,
            timingFunction: "ease",
            delay: 0
        }), a = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1e3,
            timingFunction: "ease",
            delay: 0
        }), i = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1e3,
            timingFunction: "ease",
            delay: 0
        }), e = wx.createAnimation({
            transformOrigin: "50% 50%",
            duration: 1e3,
            timingFunction: "ease",
            delay: 0
        });
        if (1 == this.data.farmSetData.is_open_webthing && this.data.currentList.currentDeviceInfo && (t.width(this.data.currentList.currentDeviceInfo.watering + "%").step({
            duration: 1e3
        }), a.width(this.data.currentList.currentDeviceInfo.temp / 60 * 100 + "%").step({
            duration: 1e3
        }), i.width((this.data.currentList.currentDeviceInfo.co2 - 350) / 650 * 100 + "%").step({
            duration: 1e3
        }), e.width(this.data.currentList.currentDeviceInfo.illumination / 1e3 + "%").step({
            duration: 1e3
        }), this.setData({
            animation1: t.export(),
            animation2: a.export(),
            animation3: i.export(),
            animation4: e.export()
        })), 2 == this.data.farmSetData.is_open_webthing && this.data.currentList.device) {
            var n = this.data.currentList.device;
            n.temp && (t.width(n.temp.DevHumiValue + "%").step({
                duration: 1e3
            }), a.width(n.temp.DevTempValue / 60 * 100 + "%").step({
                duration: 1e3
            })), n.co2 && i.width((n.co2.DevHumiValue - 350) / 650 * 100 + "%").step({
                duration: 1e3
            }), n.light && e.width(n.light.DevHumiValue / 10 + "%").step({
                duration: 1e3
            }), this.setData({
                animation1: t.export(),
                animation2: a.export(),
                animation3: i.export(),
                animation4: e.export()
            });
        }
    },
    chooseItem: function(t) {
        var a = this, i = this, e = t.currentTarget.dataset.id;
        this.data.landMine.map(function(t) {
            t.id === e && (a.setData({
                currentList: t,
                isShow: !1
            }), t.did, i.createAnimations());
        });
    },
    select: function() {
        this.setData({
            isShow: !0
        });
    },
    close: function() {
        this.setData({
            isShow: !1
        });
    },
    gotoBuy: function(t) {
        wx.navigateTo({
            url: "../../../land/landList/index"
        });
    },
    watering: function(t) {
        var a = this, i = a.data.currentList;
        if (i.did) {
            var e = wx.getStorageSync("kundian_farm_uid"), n = app.siteInfo.uniacid, o = t.detail.formId;
            app.util.request({
                url: "entry/wxapp/class",
                data: {
                    control: "control",
                    op: "watering",
                    uniacid: n,
                    uid: e,
                    lid: i.id,
                    web_did: i.did,
                    formId: o
                },
                success: function(t) {
                    1 == t.data.code ? (a.setData({
                        close_type: 1
                    }), a.countDown(i.did, 1)) : wx.showModal({
                        title: "提示",
                        content: t.data.msg,
                        showCancel: !1
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "当前土地未绑定设备",
            showCancel: !1
        });
    },
    fertilization: function(t) {
        var a = this, i = a.data.currentList;
        if (i.did) {
            var e = wx.getStorageSync("kundian_farm_uid"), n = app.siteInfo.uniacid, o = t.detail.formId;
            app.util.request({
                url: "entry/wxapp/class",
                data: {
                    op: "fertilization",
                    control: "control",
                    uniacid: n,
                    uid: e,
                    lid: i.id,
                    web_did: i.did,
                    formId: o
                },
                success: function(t) {
                    1 == t.data.code ? (a.setData({
                        close_type: 2
                    }), a.countDown(i.did, 2)) : wx.showModal({
                        title: "提示",
                        content: t.data.msg,
                        showCancel: !1
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "当前土地未绑定设备",
            showCancel: !1
        });
    },
    killVer: function(t) {
        var a = this, i = a.data.currentList, e = wx.getStorageSync("kundian_farm_uid"), n = app.siteInfo.uniacid, o = t.detail.formId;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "killVer",
                control: "control",
                uniacid: n,
                uid: e,
                lid: i.id,
                web_did: i.did,
                formId: o
            },
            success: function(t) {
                1 == t.data.code ? (a.setData({
                    close_type: 3
                }), a.countDown(i.did, 3)) : wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    weeding: function(t) {
        var a = this.data.currentList, i = wx.getStorageSync("kundian_farm_uid"), e = app.siteInfo.uniacid, n = t.detail.formId;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "weeding",
                control: "control",
                uniacid: e,
                uid: i,
                lid: a.id,
                formId: n
            },
            success: function(t) {
                wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    countDown: function(t, a) {
        var i = this, e = 30;
        i.setData({
            isLoading: !0,
            countDownNum: 30
        }), i.setData({
            timer: setInterval(function() {
                e--, i.setData({
                    countDownNum: e
                }), 0 == e && (clearInterval(i.data.timer), i.setData({
                    isLoading: !1
                }), i.closeDevice(t, a));
            }, 1e3)
        });
    },
    closeDevice: function(t, a) {
        var i = this, e = app.siteInfo.uniacid, n = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "closeDevice",
                control: "control",
                web_did: t,
                close_type: a,
                uniacid: e,
                uid: n
            },
            success: function(t) {
                wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1
                }), i.setData({
                    close_type: 0
                });
            }
        });
    },
    onUnload: function(t) {
        var a = this.data.close_type, i = this.data.currentList;
        if (1 == a || 2 == a || 3 == a) {
            var e = i.did;
            this.closeDevice(e, a), clearInterval(this.data.timer);
        }
    }
});