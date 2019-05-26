var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        imgArr: [],
        currentIndexId: 0,
        isShow: !0,
        lid: "",
        plate: 1,
        adoptid: "",
        farmSetData: []
    },
    onLoad: function(a) {
        var t = a.plate;
        if (console.log(t), 1 == t) {
            var e = a.lid, i = a.seed_id;
            this.setData({
                lid: e,
                plate: t,
                seed_id: i
            });
        } else {
            var s = a.adoptid;
            this.setData({
                adoptid: s,
                plate: t
            });
        }
        app.util.setNavColor(uniacid), this.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    addImg: function() {
        var i = this;
        wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                for (var t = a.tempFilePaths, e = 0; e < t.length; e++) i.data.imgArr.push(t[e]);
                i.setData({
                    imgArr: i.data.imgArr
                });
            }
        });
    },
    deleteImg: function(a) {
        var e = this, i = a.currentTarget.dataset.url;
        this.data.imgArr.map(function(a, t) {
            a == i && e.data.imgArr.splice(t, 1);
        }), this.setData({
            imgArr: this.data.imgArr
        });
    },
    checked: function(a) {
        var t = a.currentTarget.dataset.id, e = this.data.seedList;
        e.map(function(a) {
            a.select = !1, a.id == t && (a.select = !0);
        }), this.setData({
            seedList: e,
            currentIndexId: t
        });
    },
    isShow: function() {
        var a = this.data.isShow;
        this.setData({
            isShow: !a
        });
    },
    submitData: function(a) {
        var o, t, e = this, i = this.data.plate, s = app.siteInfo.siteroot, d = (s = s.replace("app/index.php", "web/index.php")) + "?i=" + app.siteInfo.uniacid + "&c=utility&a=file&do=upload&thumb=0", n = this.data.imgArr, r = new Array(), l = a.detail.value.txt;
        1 == i ? function() {
            var i = e.data.lid, s = e.data.seed_id;
            if (wx.showToast({
                title: "正在上传...",
                icon: "loading",
                mask: !0,
                duration: 1e4
            }), 0 < n.length) for (t = o = 0; t < n.length; t++) wx.uploadFile({
                url: d,
                filePath: n[t],
                name: "file",
                formData: {
                    op: "upload_file"
                },
                success: function(a) {
                    o++, console.log(a);
                    var t = JSON.parse(a.data);
                    if (r.push(t.url), o == n.length) {
                        wx.hideToast();
                        var e = "";
                        0 < n.length && (e = JSON.stringify(r)), app.util.request({
                            url: "entry/wxapp/class",
                            data: {
                                op: "statusSave",
                                action: "land",
                                control: "seller",
                                uniacid: uniacid,
                                txt: l,
                                src: e,
                                lid: i,
                                seed_id: s
                            },
                            method: "POST",
                            success: function(a) {
                                1 == a.data.code ? wx.showModal({
                                    title: "提示",
                                    content: a.data.msg,
                                    showCancel: !1,
                                    success: function() {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }
                                }) : wx.showToast({
                                    title: a.data.msg
                                });
                            }
                        });
                    }
                }
            });
        }() : function() {
            var i = e.data.adoptid;
            if (wx.showToast({
                title: "正在上传...",
                icon: "loading",
                mask: !0,
                duration: 1e4
            }), 0 < n.length) for (t = o = 0; t < n.length; t++) wx.uploadFile({
                url: d,
                filePath: n[t],
                name: "file",
                formData: {
                    op: "upload_file"
                },
                success: function(a) {
                    o++, console.log(a);
                    var t = JSON.parse(a.data);
                    if (r.push(t.url), o == n.length) {
                        wx.hideToast();
                        var e = "";
                        0 < n.length && (e = JSON.stringify(r)), app.util.request({
                            url: "entry/wxapp/class",
                            data: {
                                op: "statusSave",
                                action: "adopt",
                                control: "seller",
                                uniacid: uniacid,
                                txt: l,
                                src: e,
                                adoptid: i
                            },
                            method: "POST",
                            success: function(a) {
                                1 == a.data.code ? wx.showToast({
                                    title: a.data.msg,
                                    success: function() {
                                        wx.navigateBack({
                                            delta: 1
                                        });
                                    }
                                }) : wx.showToast({
                                    title: a.data.msg
                                });
                            }
                        });
                    }
                }
            });
        }();
    }
});