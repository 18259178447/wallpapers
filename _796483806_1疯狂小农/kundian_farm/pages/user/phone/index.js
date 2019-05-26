var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        isUpdate: !1,
        curindex: 1,
        phone: "",
        currentTime: 61,
        time: "获取验证码",
        hand_phone: "",
        msgCode: "",
        userInfo: [],
        farmSetData: [],
        code: ""
    },
    onLoad: function(e) {
        var t = wx.getStorageSync("kundian_farm_uid"), a = wx.getStorageSync("kundian_farm_setData"), n = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                op: "getUserBindPhone",
                uid: t,
                uniacid: uniacid
            },
            success: function(e) {
                n.setData({
                    userInfo: e.data.userInfo,
                    farmSetData: a,
                    setData: e.data.setData || []
                });
            }
        }), wx.login({
            success: function(e) {
                n.setData({
                    code: e.code
                });
            }
        });
    },
    changeCurrent: function(e) {
        var t = e.currentTarget.dataset.curindex;
        this.setData({
            curindex: t
        });
    },
    getPhoneNumber: function(t) {
        if ("getPhoneNumber:fail user deny" != t.detail.errMsg) {
            var o = this, a = wx.getStorageSync("kundian_farm_uid"), e = o.data, n = e.code, i = e.userInfo;
            n ? app.util.request({
                url: "entry/wxapp/class",
                data: {
                    encryptedData: t.detail.encryptedData,
                    iv: t.detail.iv,
                    code: n,
                    op: "savePhone",
                    uniacid: uniacid,
                    uid: a,
                    control: "index"
                },
                method: "POST",
                header: {
                    "content-type": "application/json"
                },
                success: function(e) {
                    var t = e.data, a = t.msg, n = t.phone;
                    t.code;
                    wx.showToast({
                        title: a,
                        icon: "none"
                    }), i.phone = n, o.setData({
                        phone: n,
                        isUpdate: !1,
                        code: "",
                        userInfo: i
                    });
                },
                fail: function(e) {
                    console.log(e);
                }
            }) : wx.login({
                success: function(e) {
                    wx.login({
                        success: function(e) {
                            console.log(e.code), app.util.request({
                                url: "entry/wxapp/class",
                                data: {
                                    encryptedData: t.detail.encryptedData,
                                    iv: t.detail.iv,
                                    code: e.code,
                                    op: "savePhone",
                                    uniacid: uniacid,
                                    uid: a,
                                    control: "index"
                                },
                                method: "POST",
                                header: {
                                    "content-type": "application/json"
                                },
                                success: function(e) {
                                    var t = e.data, a = t.msg, n = t.phone;
                                    t.code;
                                    wx.showToast({
                                        title: a,
                                        icon: "none"
                                    }), i.phone = n, o.setData({
                                        phone: n,
                                        isUpdate: !1,
                                        userInfo: i
                                    });
                                },
                                fail: function(e) {
                                    console.log(e);
                                }
                            });
                        }
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "您拒绝了授权！",
            showCancel: !1
        });
    },
    getCode: function(e) {
        var t = this, a = t.data.currentTime, n = setInterval(function() {
            a--, t.setData({
                time: a + "秒"
            }), a <= 0 && (clearInterval(n), t.setData({
                time: "重新发送",
                currentTime: 61,
                disabled: !1
            }));
        }, 1e3);
    },
    getPhone: function(e) {
        this.setData({
            hand_phone: e.detail.value
        });
    },
    getVerificationCode: function() {
        var o = this, e = this.data.hand_phone;
        if ("" != e) if (11 == e.length) {
            /^(((13[0-9]{1})|(15[0-9]{1})|(19[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(e) || wx.showToast({
                title: "手机号有误！",
                icon: "none"
            }), app.util.request({
                url: "entry/wxapp/class",
                data: {
                    control: "index",
                    op: "getPhoneCode",
                    phone: e,
                    uniacid: uniacid
                },
                success: function(e) {
                    var t = e.data, a = t.code, n = t.result;
                    0 == n.err_code ? o.setData({
                        msgCode: a
                    }) : wx.showModal({
                        title: "提示",
                        content: n.msg,
                        showCancel: !1
                    });
                }
            }), this.getCode(), this.setData({
                disabled: !0
            });
        } else wx.showToast({
            title: "电话号码长度有误！",
            icon: "none"
        }); else wx.showToast({
            title: "请输入手机号",
            icon: "none"
        });
    },
    savePhone: function(e) {
        var t = this, a = t.data, n = a.msgCode, o = a.hand_phone, i = a.userInfo, s = e.detail.value.code, c = e.detail.formId, d = wx.getStorageSync("kundian_farm_uid");
        "" != n && null != n ? "" != s && null != s ? n == s ? app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                op: "saveHandPhone",
                phone: o,
                form_id: c,
                uniacid: uniacid,
                uid: d
            },
            success: function(e) {
                wx.showModal({
                    title: "提示",
                    content: e.data.msg,
                    showCancel: !1
                }), i.phone = o, t.setData({
                    isUpdate: !1,
                    phone: o,
                    userInfo: i
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "验证码输入错误！",
            showCancel: !1
        }) : wx.showModal({
            title: "提示",
            content: "请输入验证码",
            showCancel: !1
        }) : wx.showModal({
            title: "提示",
            content: "请先获取验证码",
            showCancel: !1
        });
    },
    bindPhone: function(e) {
        this.setData({
            isUpdate: !0
        });
    },
    completeBind: function(e) {
        wx.navigateBack({
            delta: 1
        });
    }
});