for (var t = getApp(), e = [], n = 1; n <= 100; n++) e.push(n);

e.push(1e3), e.push(2e3), e.push(3e3), e.push(5e3), Page(function(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}({
    data: {
        // unitid: t.globalData.unitid,
        version: !0,
        value: [ 1 ],
        range: e,
        content: "竖排文字可发送给好友或用作个性签名，也可以用来发不一样的朋友圈哦，文字竖排，让聊天更有趣！",
        wordContent: "竖排文字可发送给好友或用作个性签名，也可以用来发不一样的朋友圈哦，文字竖排，让聊天更有趣！",
        tblTemplet: 2,
        height: 11,
        multiArray: [ [ "无边框", "粗线边框", "细线边框" ], e ],
        multiIndex: [ 2, 10 ]
    },
    onLoad: function() {
        var t = this;
        (function(t, e) {
            t = t.split("."), e = e.split(".");
            for (var n = Math.max(t.length, e.length); t.length < n; ) t.push("0");
            for (;e.length < n; ) e.push("0");
            for (var a = 0; a < n; a++) {
                var i = parseInt(t[a]), o = parseInt(e[a]);
                if (i > o) return 1;
                if (i < o) return -1;
            }
            return 0;
        })(wx.getSystemInfoSync().SDKVersion, "2.0.8") < 0 && t.setData({
            version: !1
        });
    },
    onShow: function() {},
    setContent: function(t) {
        this.setData({
            content: t.detail.value
        });
    },
    copyContent: function() {
        var t = this.data.content;
        if (t) {
            var e, n = [ [ " ", " ", " ", " ", " ", " ", " ", " ", " " ], [ "┏", "┓", "┗", "┛", "┯", "┷", "┃", "│", "━" ], [ "┌", "┐", "└", "┘", "┬", "┴", "│", "┆", "─" ], [ "╔", "╗", "╚", "╝", "╤", "╧", "║", "│", "═" ], [ "", "", "", "", "", "", "│", "│", "" ] ], a = [], i = "", o = 0, r = (t = t.replace(/\r/g, "")).length, s = this.data.height, l = Math.ceil(r / s), u = this.data.tblTemplet, c = 0;
            for (e = 2 * l; e >= 0; e--) a[e] = new Array();
            for (;o < t.length; ) {
                for (e = 2 * l; e >= 0; e--) for (c = 0; c <= s + 1; c++) if (e == 2 * l) a[e][c] = 0 == c ? n[u][1] : c == s + 1 ? n[u][3] : n[u][6]; else if (0 == e) a[e][c] = 0 == c ? n[u][0] : c == s + 1 ? n[u][2] : n[u][6]; else if (e % 2 == 0) a[e][c] = 0 == c ? n[u][4] : c == s + 1 ? n[u][5] : n[u][7]; else if (0 == c || c == s + 1) a[e][c] = n[u][8]; else {
                    var h = this.getChar(t, o++);
                    if ("\n" == h || "\r" == h) {
                        for (;c < s + 1; ) a[e][c] = "　", c++;
                        c = s;
                    } else a[e][c] = h;
                }
                for (c = 0; c <= s + 1; c++) {
                    for (e = 0; e <= 2 * l; e++) i += a[e][c];
                    i += "\n";
                }
                i += "\n";
            }
            this.setData({
                wordContent: i
            }), wx.setClipboardData({
                data: i,
                success: function(t) {
                    wx.showToast({
                        title: "已复制到剪贴板",
                        icon: "success",
                        duration: 2e3
                    });
                }
            });
        } else wx.showToast({
            title: "请先输入内容",
            icon: "loading",
            duration: 2e3
        });
    },
    getChar: function(t, e) {
        return e >= t.length ? "　" : t.charAt(e);
    },
    bindMultiPickerChange: function(t) {
        this.setData({
            tblTemplet: t.detail.value[0],
            height: t.detail.value[1] + 1
        });
    },
    bindMultiPickerColumnChange: function(t) {},
    onShareAppMessage: function(t) {},
    clearContent: function() {
        this.setData({
            wordContent: ""
        });
    },
    previewImage: function(e) {
        wx.previewImage({
            urls: [ t.func.rootDocment + "landscape-demo.jpg" ]
        });
    }
}, "onShareAppMessage", function(e) {
    var n = wx.getStorageSync("sk");
    return {
        title: "给你推荐【朋友圈竖排文字】",
        path: this.route,
    };
}));