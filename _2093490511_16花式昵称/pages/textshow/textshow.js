var t = require("../../FD6375C425CA1DDF9B051DC3B5DB28B0.js"), a = require("../../5DBEDA2225CA1DDF3BD8B22504FB28B0.js"), e = getApp();

Page({
    data: {
        // unitid: e.globalData.unitid,
        searchs: [],
        current: null,
        hidden: !0,
        scrollTop: 0,
        inputShowed: !1,
        inputVal: "",
        textareaValue: "",
        newValue: []
    },
    onLoad: function() {},
    onShow: function() {},
    bindKeyInput: function(t) {
        this.data.current = t.detail.value, this.setData({
            inputShowed: !0
        });
    },
    clearInput: function() {
        this.data.current = null, this.setData({
            textareaValue: ""
        });
    },
    changeText: function(e) {
        if (this.data.current) switch (e.target.id) {
          case "hxw":
            for (var r = "", h = this.data.current, s = 0; s < h.length; s++) -1 != t.ftPYStr().indexOf(h.charAt(s)) ? r += t.qqPYStr().charAt(t.ftPYStr().indexOf(h.charAt(s))) : -1 != t.charPYStr().indexOf(h.charAt(s)) ? r += t.qqPYStr().charAt(t.charPYStr().indexOf(h.charAt(s))) : r += h.charAt(s);
            this.setData({
                textareaValue: r
            }), this.textCopy();
            break;

          case "ftz":
            for (var r = "", h = this.data.current, s = 0; s < h.length; s++) -1 != t.charPYStr().indexOf(h.charAt(s)) ? r += t.ftPYStr().charAt(t.charPYStr().indexOf(h.charAt(s))) : -1 != t.qqPYStr().indexOf(h.charAt(s)) ? r += t.ftPYStr().charAt(t.qqPYStr().indexOf(h.charAt(s))) : r += h.charAt(s);
            this.setData({
                textareaValue: r
            }), this.textCopy();
            break;

          case "sbdh":
            for (var r = "", h = this.data.current, s = 0; s < h.length; s++) r += a.tpTELStr().charAt(a.charTELStr().indexOf(h.charAt(s)));
            this.setData({
                textareaValue: "℡" + r
            }), this.textCopy();
            break;

          case "xbdh":
            for (var r = "", h = this.data.current, s = 0; s < h.length; s++) r += a.ftTELStr().charAt(a.charTELStr().indexOf(h.charAt(s)));
            this.setData({
                textareaValue: "℡" + r
            }), this.textCopy();
            break;

          case "lhz":
            for (var i = String.fromCharCode(1160), c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += d.charAt(s) + i;
            this.setData({
                textareaValue: c
            }), this.textCopy();
            break;

          case "jhw":
            for (var i = String.fromCharCode(1161), c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += d.charAt(s) + i;
            this.setData({
                textareaValue: c
            }), this.textCopy();
            break;

          case "tmw1":
            for (var i = "ζั͡ ", c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += i + d.charAt(s);
            this.setData({
                textareaValue: c + "ζั͡✾"
            }), this.textCopy();
            break;

          case "tmw2":
            for (var i = "ζั͡ ", c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += i + d.charAt(s);
            this.setData({
                textareaValue: c + "ζั͡✿"
            }), this.textCopy();
            break;

          case "tmw3":
            for (var i = "ζั͡ ", c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += i + d.charAt(s);
            this.setData({
                textareaValue: c + "ζั͡❀"
            }), this.textCopy();
            break;

          case "hbw":
            for (var i = String.fromCharCode(2954), c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += d.charAt(s) + i;
            this.setData({
                textareaValue: c
            }), this.textCopy();
            break;

          case "ctw":
            for (var i = String.fromCharCode(3572), c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += d.charAt(s) + i;
            this.setData({
                textareaValue: c
            }), this.textCopy();
            break;

          case "kaw":
            for (var i = String.fromCharCode(4326), c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += i + d.charAt(s);
            this.setData({
                textareaValue: c + i
            }), this.textCopy();
            break;

          case "pgyw":
            for (var i = "ོ", c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += d.charAt(s) + i;
            this.setData({
                textareaValue: "៚" + c + "ོ ͜✿ ҉҉҉҉҉"
            }), this.textCopy();
            break;

          case "blw":
            for (var i = String.fromCharCode(794), c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += d.charAt(s) + i;
            this.setData({
                textareaValue: c
            }), this.textCopy();
            break;

          case "myw":
            for (var i = "็้", c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += d.charAt(s) + i;
            this.setData({
                textareaValue: c
            }), this.textCopy();
            break;

          case "sbw":
            for (var i = String.fromCharCode(860), c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += d.charAt(s) + i;
            this.setData({
                textareaValue: c
            }), this.textCopy();
            break;

          case "htw":
            for (var o = String.fromCharCode(862), u = String.fromCharCode(863), l = "", s = 0, n = (x = this.data.current).length; s < n; s++) l += o + x.charAt(s) + u;
            this.setData({
                textareaValue: l
            }), this.textCopy();
            break;

          case "shtw":
            for (var o = String.fromCharCode(831), u = String.fromCharCode(839), l = "", x = this.data.current, s = 0, n = x.length; s < n; s++) l += o + x.charAt(s) + u;
            this.setData({
                textareaValue: l
            }), this.textCopy();
            break;

          case "fnw":
            for (var i = "ོ", c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += d.charAt(s) + i;
            this.setData({
                textareaValue: c
            }), this.textCopy();
            break;

          case "yfw":
            for (var i = "♫", c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += d.charAt(s) + i;
            this.setData({
                textareaValue: "∮" + c
            }), this.textCopy();
            break;

          case "scx":
            for (var i = "̶", c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += d.charAt(s) + i;
            this.setData({
                textareaValue: c
            }), this.textCopy();
            break;

          case "xhx":
            for (var i = "꯭", c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += d.charAt(s) + i;
            this.setData({
                textareaValue: "꯭" + c
            }), this.textCopy();
            break;

          case "mlw":
            for (var i = "ℳℓ", c = "", s = 0, n = (d = this.data.current).length; s < n; s++) c += i + d.charAt(s);
            this.setData({
                textareaValue: c
            }), this.textCopy();
            break;

          case "mtz":
            for (var i = "ืุ", c = "", d = this.data.current, s = 0, n = d.length; s < n; s++) c += d.charAt(s) + i;
            this.setData({
                textareaValue: c
            }), this.textCopy();
            break;

          default:
            this.setData({});
        } else wx.showToast({
            title: "转换内容不能为空",
            icon: "none",
            duration: 800
        });
    },
    textCopy: function() {
        wx.setClipboardData({
            data: this.data.textareaValue,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data);
                        t.data;
                        wx.showModal({
                            title: "提示",
                            content: "已复制到粘贴板，粘贴即可使用",
                            cancelText: "关闭",
                            confirmText: "好的",
                            success: function(t) {}
                        });
                    }
                });
            }
        });
    },
    onShareAppMessage: function (t) {
      return {
        title: "给你推荐《QQ个性昵称生成器》",
        path: this.route,
      };
    }
});