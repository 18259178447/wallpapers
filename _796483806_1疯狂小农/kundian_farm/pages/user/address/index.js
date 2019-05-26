var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        uid: "",
        region: [ "北京市", "北京市", "东城区" ],
        region_str: "",
        detail_add: "",
        showBox: !1,
        addList: [],
        editList: [],
        is_select: !1
    },
    onLoad: function(t) {
        var a = wx.getStorageSync("kundian_farm_uid");
        this.setData({
            uid: a,
            is_select: t.is_select || !1
        }), this.getAddressList();
    },
    getAddressList: function(t) {
        wx.showLoading({
            title: "玩命加载中..."
        });
        var a = this, s = this.data.uid;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "user",
                op: "addressList",
                uniacid: uniacid,
                uid: s
            },
            success: function(t) {
                a.setData({
                    addList: t.data.addList
                }), wx.hideLoading(), console.log(a.data.addList);
            }
        });
    },
    bindRegionChange: function(t) {
        var a = t.detail.value;
        this.setData({
            region_str: a[0] + " " + a[1] + " " + a[2]
        });
    },
    getLocation: function(t) {
        var a = this;
        wx.chooseLocation({
            success: function(t) {
                a.setData({
                    detail_add: t.address
                });
            }
        });
    },
    saveAddress: function(t) {
        wx.showLoading({
            title: "正在保存..."
        });
        var a = this, s = t.detail.value, e = s.phone, d = s.name, i = s.detail_add, n = t.detail.formId, o = this.data, c = o.region_str, u = o.uid, r = o.editList;
        "" != d ? "" != e ? "" != c && "" != i ? app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "user",
                op: "saveAddress",
                operation: "add",
                region: c,
                address: i,
                phone: e,
                name: d,
                uid: u,
                uniacid: uniacid,
                formId: n,
                id: r.id || ""
            },
            success: function(t) {
                wx.showModal({
                    title: "提示",
                    content: t.data.msg,
                    showCancel: !1,
                    success: function() {
                        0 == t.data.code && (a.setData({
                            showBox: !1
                        }), a.getAddressList());
                    }
                }), wx.hideLoading();
            }
        }) : wx.showToast({
            title: "请填写完整的地址",
            icon: "none"
        }) : wx.showToast({
            title: "请填写联系电话",
            icon: "none"
        }) : wx.showToast({
            title: "请填写收货姓名",
            icon: "none"
        });
    },
    changeDeafult: function(t) {
        var a = this, s = t.currentTarget.dataset, e = s.addid, d = s.isdefault, i = t.detail.value, n = this.data.uid;
        1 != d && app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "user",
                operation: "changeDefault",
                op: "saveAddress",
                id: e,
                is_default: i,
                uid: n,
                uniacid: uniacid
            },
            success: function(t) {
                console.log(t), wx.showToast({
                    title: t.data.msg,
                    icon: "none"
                }), a.getAddressList();
            }
        });
    },
    handAdd: function(t) {
        this.setData({
            showBox: !this.data.showBox,
            editList: [],
            detail_add: "",
            region_str: ""
        });
    },
    editAdd: function(t) {
        var a = this.data.addList, s = t.currentTarget.dataset.addid, e = [];
        a.map(function(t) {
            t.id == s && (e = t);
        }), this.setData({
            editList: e,
            detail_add: e.address,
            region_str: e.region,
            showBox: !0
        });
    },
    deleteAdd: function(t) {
        var a = this, s = t.currentTarget.dataset, e = s.addid, d = s.sub, i = this.data, n = i.uid, o = i.addList;
        wx.showModal({
            title: "提示",
            content: "确认要删除该地址吗？",
            success: function(t) {
                t.confirm && app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        control: "user",
                        operation: "deleteAdd",
                        op: "saveAddress",
                        id: e,
                        uid: n,
                        uniacid: uniacid
                    },
                    success: function(t) {
                        wx.showToast({
                            title: t.data.msg,
                            icon: "none",
                            duration: 2e3,
                            success: function() {
                                o.splice(d, 1), a.setData({
                                    addList: o
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    wxAdd: function(t) {
        var a = this, s = a.data.uid;
        wx.chooseAddress({
            success: function(t) {
                app.util.request({
                    url: "entry/wxapp/class",
                    data: {
                        control: "user",
                        op: "saveAddress",
                        operation: "add",
                        region: t.provinceName + " " + t.cityName + " " + t.countyName,
                        address: t.detailInfo,
                        phone: t.telNumber,
                        name: t.userName,
                        uid: s,
                        uniacid: uniacid
                    },
                    success: function(t) {
                        wx.showModal({
                            title: "提示",
                            content: t.data.msg,
                            showCancel: !1,
                            success: function() {
                                0 == t.data.code && a.getAddressList();
                            }
                        });
                    }
                });
            }
        });
    },
    selectAddress: function(t) {
        var a = t.currentTarget.dataset.sub, s = this.data, e = s.addList, d = s.uid, i = e[a];
        wx.setStorageSync("selectAdd_" + d, i), wx.navigateBack({
            delta: 1
        });
    }
});