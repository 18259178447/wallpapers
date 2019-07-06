var t = getApp(), o = wx.createCanvasContext("myCanvas"), e = require("../../B42E357725CA1DDFD2485D703CBB28B0.js");

Page({
    data: {
        // unitid: t.globalData.unitid,
        fontSize: [ {
            name: "equal",
            value: "同等"
        }, {
            name: "gradually",
            value: "渐大",
            checked: "true"
        } ],
        canvasImg: t.func.rootDocment + "screaming-demo.png",
        isShowMask: !1,
        isBack: !1,
        isShowSave: !1,
        bColors: [ {
            color: "black",
            title: "黑色"
        }, {
            color: "red",
            title: "红色"
        }, {
            color: "yellow",
            title: "黄色"
        }, {
            color: "blue",
            title: "蓝色"
        }, {
            color: "green",
            title: "绿色"
        }, {
            color: "white",
            title: "白色",
            checked: !0
        } ],
        fontColors: [ {
            color: "black",
            title: "黑色",
            checked: !0
        }, {
            color: "red",
            title: "红色"
        }, {
            color: "yellow",
            title: "黄色"
        }, {
            color: "blue",
            title: "蓝色"
        }, {
            color: "green",
            title: "绿色"
        }, {
            color: "white",
            title: "白色"
        } ],
        fontInfo: {
            fontSize: "gradually",
            background: {
                color: "white",
                title: "白色"
            },
            fontColor: {
                color: "black",
                title: "黑色"
            }
        },
        content: ""
    },
    onLoad: function(t) {
        var o = this, a = 1;
        o.rnd(2, 10, function(t) {
            a = t;
        }), e.requestVideo(a, function(t) {
            o.setData({
                Videos: t.data
            });
        });
    },
    onShow: function() {},
    radioChange: function(t) {
        for (var o = t.detail.value, a = this.data.fontSize, e = 0, n = a.length; e < n; e++) if (a[e].name == o) {
            a[e].checked = !0;
            var s = a[e].name;
        } else a[e].checked = !1;
        this.setData({
            fontSize: a,
            "fontInfo.fontSize": s
        });
    },
    showMask: function(t) {
        var o = "true" == t.currentTarget.dataset.isback, a = this.data.isShowMask;
        this.setData({
            isShowMask: !a,
            isBack: o
        });
    },
    changeColor: function(t) {
        for (var o = t.currentTarget.dataset.colortype, a = t.currentTarget.dataset.index, e = this.data.isShowMask, n = "bColors" == o ? this.data.bColors : this.data.fontColors, s = 0, i = n.length; s < i; s++) n[s].checked = s == a;
        "bColors" == o ? (this.setData({
            bColors: n,
            isShowMask: !e,
            "fontInfo.background": n[a]
        }), this.transformImg()) : (this.setData({
            fontColors: n,
            isShowMask: !e,
            "fontInfo.fontColor": n[a]
        }), this.transformImg());
    },
    textInput: function(t) {
        var o = t.detail.value;
        this.setData({
            content: o
        });
    },
    transformImg: function(t) {
        var o = this.data.content;
        console.log(o);
        for (var a = [], e = 0, n = o.length; e < n; e++) a.push(o.charAt(e));
        this.drawImg(a);
    },
    drawImg: function(t) {
        var a = this.data.fontInfo, e = a.fontSize;
        if (o.clearRect(0, 0, 525, 290), o.setFillStyle(a.background.color), o.fillRect(0, 0, 525, 290), 
        o.draw(), o.setTextAlign("left"), o.setTextBaseline("top"), o.setFillStyle(a.fontColor.color), 
        "gradually" == e) for (var n = 0, s = t.length; n < s; n++) i = n * (n + 20), o.setFontSize(n + 20 + n), 
        o.fillText(t[n], i, 30); else if ("equal" == e) for (var n = 0, s = t.length; n < s; n++) {
            var i = 28 * n;
            o.setFontSize(24), o.fillText(t[n], i, 45);
        }
        o.draw(!0);
        var l = this;
        setTimeout(function() {
            l.saveImg();
        }, 200);
    },
    saveImg: function() {
        var t = this;
        console.log("保存"), wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            canvasId: "myCanvas",
            success: function(o) {
                t.setData({
                    canvasImg: o.tempFilePath
                });
            }
        });
    },
    saveImage: function() {
        var t = this;
        wx.showActionSheet({
            itemList: [ "保存到手机" ],
            success: function(o) {
                0 == o.tapIndex && (console.log(t.data.canvasImg), wx.saveImageToPhotosAlbum({
                    filePath: t.data.canvasImg,
                    success: function(t) {
                        wx.showToast({
                            title: "保存到相册"
                        });
                    }
                }));
            }
        });
    },
    langSave: function(t) {
        var o = this.data.isShowSave;
        this.setData({
            isShowSave: !o
        });
    },
    saveToPhone: function(t) {
        var o = this.data.canvasImg;
        wx.saveImageToPhotosAlbum({
            filePath: o,
            success: function(t) {
                console.log(t);
            }
        });
    },
    clearContent: function() {
        this.setData({
            content: ""
        });
    },
    shoucang: function() {},
    hotJumpPageID: function(t) {
        console.log(t);
        var o = t.detail.formId;
        "" != t.detail.formId && a.formAdd(o, function(t) {});
    },
    rnd: function(t, o, a) {
        var e = Math.floor(Math.random() * (o - t + 1) + t);
        return a(e), e;
    },
    onReachBottom: function() {
        console.log("1323");
        var t = ++this.data.page, o = this;
        this.setData({
            page: t
        });
        var a = o.data.Videos;
        console.log(this.data.selectID, t), e.requestVideo(t, function(t) {
            console.log(t);
            for (var e = 0; e < t.data.length; e++) a.push(t.data[e]);
            o.setData({
                Videos: a
            });
        });
    },
    more: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    onShareAppMessage: function(o) {
        var a = wx.getStorageSync("sk");
        return {
            title: "给你推荐【尖叫字体生成】",
            path: this.route
        };
    }
});