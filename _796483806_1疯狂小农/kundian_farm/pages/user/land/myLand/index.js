var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        plate: 1,
        mineid: "",
        landDetail: [],
        adoptid: "",
        farmSetData: [],
        landData: [],
        landSpec: [],
        is_show_estimate_dialog: !1,
        is_show_sure_dialog: !1,
        seed_id: "",
        adoptData: []
    },
    onLoad: function(t) {
        app.util.setNavColor(uniacid);
        var a = this, e = t.plate;
        if (1 == e) {
            var s = t.mineid;
            a.getLandDetail(s);
        } else {
            var i = t.adoptid;
            a.getAnimalDetail(i);
        }
        a.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData"),
            plate: e
        });
    },
    getLandDetail: function(d) {
        var o = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getLandDetail",
                action: "land",
                control: "seller",
                mineid: d,
                uniacid: uniacid
            },
            success: function(t) {
                var a = t.data, e = a.landDetail, s = a.seedData, i = a.landData, n = a.landSpec;
                o.setData({
                    landDetail: e,
                    mineid: d,
                    seedData: s,
                    landData: i,
                    landSpec: n
                });
            }
        });
    },
    getAnimalDetail: function(a) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getAnimalDetail",
                action: "adopt",
                control: "seller",
                adoptid: a,
                uniacid: uniacid
            },
            success: function(t) {
                e.setData({
                    adoptData: t.data.adoptData,
                    adoptid: a,
                    animalOrder: t.data.orderData
                });
            }
        });
    },
    releases: function(t) {
        var a = this.data.plate;
        if (1 == a) {
            var e = t.currentTarget.dataset.seedid;
            wx.navigateTo({
                url: "../release/index?lid=" + this.data.landDetail.id + "&plate=" + a + "&seed_id=" + e
            });
        } else {
            var s = t.currentTarget.dataset.adoptid;
            wx.navigateTo({
                url: "../release/index?adoptid=" + s + "&plate=" + a
            });
        }
    },
    seedMature: function(t) {
        var a = "";
        this.data.is_show_estimate_dialog || (a = t.currentTarget.dataset.seedid), this.setData({
            is_show_estimate_dialog: !this.data.is_show_estimate_dialog,
            seed_id: a
        });
    },
    seedEstimate: function(t) {
        var a = this, e = this.data.seed_id, s = t.detail.value.sale_price, i = t.detail.value.weight, n = t.currentTarget.dataset.status;
        return i <= 0 || !i ? (wx.showModal({
            title: "提示",
            content: "重量必须大于0",
            showCancel: !1
        }), !1) : s <= 0 || !s ? (wx.showModal({
            title: "提示",
            content: "售出单价必须大于0",
            showCancel: !1
        }), !1) : void app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "seedEstimate",
                action: "land",
                control: "seller",
                id: e,
                uniacid: uniacid,
                sale_price: s,
                weight: i,
                status: n
            },
            success: function(t) {
                console.log(t), wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1,
                    success: function() {
                        0 == t.data.code && (a.getLandDetail(a.data.mineid), 1 == n ? a.setData({
                            is_show_sure_dialog: !1
                        }) : a.setData({
                            is_show_estimate_dialog: !1
                        }));
                    }
                });
            }
        });
    },
    seedPick: function(t) {
        var a = "";
        this.data.is_show_estimate_dialog || (a = t.currentTarget.dataset.seedid), this.setData({
            is_show_sure_dialog: !this.data.is_show_sure_dialog,
            seed_id: a
        });
    },
    gainSeed: function(t) {
        var a = this, e = this.data.seed_id, s = t.detail.value, i = s.sale_price, n = s.weight, d = t.currentTarget.dataset.status;
        return n <= 0 || !n ? (wx.showModal({
            title: "提示",
            content: "重量必须大于0",
            showCancel: !1
        }), !1) : i <= 0 || !i ? (wx.showModal({
            title: "提示",
            content: "售出单价必须大于0",
            showCancel: !1
        }), !1) : void app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "gainSeed",
                action: "land",
                control: "seller",
                id: e,
                uniacid: uniacid,
                sale_price: i,
                weight: n,
                status: d
            },
            success: function(t) {
                console.log(t), wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1,
                    success: function() {
                        0 == t.data.code && (a.getLandDetail(a.data.mineid), 1 == d ? a.setData({
                            is_show_estimate_dialog: !a.data.is_show_estimate_dialog
                        }) : a.setData({
                            is_show_sure_dialog: !a.data.is_show_sure_dialog
                        }));
                    }
                });
            }
        });
    },
    sendTemplateToUser: function(t) {
        var a = t.currentTarget.dataset.seedid, e = t.currentTarget.dataset.statustxt;
        wx.showModal({
            title: "提示",
            content: "确认要发送模板消息通知用户当前种植状态为" + e + "吗？",
            success: function(t) {
                t.confirm && app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        op: "sendTemplateToUser",
                        action: "land",
                        control: "seller",
                        id: a,
                        currentStatus: e,
                        uniacid: uniacid
                    },
                    success: function(t) {
                        wx.showToast({
                            title: t.data.msg,
                            icon: "none"
                        });
                    }
                });
            }
        });
    },
    sendAdoptTemplateToUser: function(t) {
        var a = t.currentTarget.dataset.adoptid, e = t.currentTarget.dataset.statustxt;
        wx.showModal({
            title: "提示",
            content: "确认要发送模板消息通知用户当前认养状态为" + e + "吗？",
            success: function(t) {
                t.confirm && app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        op: "sendTemplateToUser",
                        action: "adopt",
                        control: "seller",
                        id: a,
                        currentStatus: e,
                        uniacid: uniacid
                    },
                    success: function(t) {
                        wx.showToast({
                            title: t.data.msg,
                            icon: "none"
                        });
                    }
                });
            }
        });
    },
    changeSeedStstua: function(t) {
        var a = this, e = a.data.mineid, s = t.currentTarget.dataset, i = s.seedid, n = s.status, d = s.statustxt;
        wx.showModal({
            title: "提示",
            content: "确认修改种植状态为" + d + "吗？",
            success: function(t) {
                t.confirm && app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        op: "changeSeedStstua",
                        action: "land",
                        control: "seller",
                        id: i,
                        status: n
                    },
                    success: function(t) {
                        wx.showModal({
                            title: "提示",
                            content: t.data.msg,
                            showCancel: !1,
                            success: function() {
                                0 == t.data.code && a.getLandDetail(e);
                            }
                        });
                    }
                });
            }
        });
    },
    changeAdoptStstua: function(t) {
        var a = this, e = t.currentTarget.dataset, s = e.adoptid, i = e.statustxt, n = e.status;
        wx.showModal({
            title: "提示",
            content: "确认修改认养状态为" + i + "吗？",
            success: function(t) {
                t.confirm && app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        op: "changeAdoptStatus",
                        action: "adopt",
                        control: "seller",
                        adopt_id: s,
                        currentStatus: i,
                        status: n,
                        uniacid: uniacid
                    },
                    success: function(t) {
                        console.log(t), wx.showModal({
                            title: "提示",
                            content: t.data.msg,
                            success: function() {
                                0 == t.data.code && a.getAnimalDetail(a.data.adoptid);
                            }
                        });
                    }
                });
            }
        });
    },
    updateAdoptNumber: function(t) {
        var a = t.detail.value, e = t.currentTarget.dataset.adoptid;
        wx.showModal({
            title: "提示",
            content: "确认要修改认养编号为" + a + "吗？",
            success: function(t) {
                t.confirm && app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        op: "udpateAdoptNumber",
                        action: "adopt",
                        control: "seller",
                        adopt_id: e,
                        adopt_number: a,
                        uniacid: uniacid
                    },
                    success: function(t) {
                        wx.showToast({
                            title: t.data.msg,
                            icon: "none"
                        });
                    }
                });
            }
        });
    }
});