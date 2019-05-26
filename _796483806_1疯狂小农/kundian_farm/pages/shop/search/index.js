Page({
    data: {
        historyList: []
    },
    onLoad: function(t) {
        var i = this;
        wx.getStorage({
            key: "history",
            success: function(t) {
                var a = t.data || [];
                i.setData({
                    historyList: a
                });
            }
        });
    },
    search: function(t) {
        console.log(t);
        var a = t.detail.value, i = this.data.historyList;
        if (0 < i.length) {
            var o = !1;
            i.map(function(t) {
                t == a && (o = !0);
            }), o || i.unshift(a);
        } else i.unshift(keyWord);
        wx.setStorage({
            key: "history",
            data: i
        }), wx.navigateTo({
            url: "../proList/index?goods_name=" + a
        });
    },
    clearHistory: function() {
        var a = this;
        wx.removeStorage({
            key: "history",
            success: function(t) {
                a.setData({
                    historyList: []
                });
            }
        });
    },
    formSubmit: function(t) {
        var a = t.detail.value.keyWord, i = this.data.historyList;
        if (0 < i.length) {
            var o = !1;
            i.map(function(t) {
                t == a && (o = !0);
            }), o || i.unshift(a);
        } else i.unshift(a);
        wx.setStorage({
            key: "history",
            data: i
        }), wx.navigateTo({
            url: "../proList/index?goods_name=" + a
        });
    },
    intoGoodsList: function(t) {
        var a = t.currentTarget.dataset.goodsname;
        wx.navigateTo({
            url: "../proList/index?goods_name=" + a
        });
    }
});