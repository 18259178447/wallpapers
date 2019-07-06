var t = require("../../BF48869725CA1DDFD92EEE90F4CB28B0.js"), a = getApp();
delete t.charENStr;
Page({
    data: {
        // unitid: a.globalData.unitid,
        searchs: [],
        current: null,
        hidden: !0,
        scrollTop: 0,
        inputShowed: !1,
        inputVal: "",
        textareaValue: "",
        newValue: [],
    },
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
    changeText: function(a) {
      var id = a.target.id.slice(2);
      var mapObj = t["ENStr" + id];
      if (this.data.current){
        this.setData({
          textareaValue: this.data.current.replace(/[a-zA-Z]/g, (item) => {
            console.log(mapObj[item],22)
            return mapObj[item]
          })
        })
        this.textCopy();
      }

      return;
        if (this.data.current) switch (a.target.id) {
          case "EN01":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr01().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN02":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr02().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN03":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr03().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN04":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr04().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN05":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr05().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN06":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr06().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN07":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr07().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN08":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr08().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN09":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr09().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN10":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr10().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN11":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr11().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN12":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr12().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN13":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr13().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN14":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr14().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN15":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr15().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN16":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr16().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN17":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr17().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN18":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr18().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN19":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr19().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN20":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr20().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN21":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr21().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN22":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr22().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN23":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr23().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN24":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr24().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN25":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr25().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN26":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr26().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN27":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr27().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN28":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr28().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
            }), this.textCopy();
            break;

          case "EN29":
            for (var e = "", r = this.data.current, h = 0; h < r.length; h++) e += t.ENStr29().charAt(t.charENStr().indexOf(r.charAt(h)));
            this.setData({
                textareaValue: e
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
    onShareAppMessage: function(t) {
        var e = wx.getStorageSync("sk");
        return {
            title: "给你推荐《英文昵称生成器》",
            path: this.route
        };
    }
});