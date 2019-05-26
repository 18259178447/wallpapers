var WxParse = require("../../../../wxParse/wxParse.js"), app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {},
    onLoad: function(a) {
        var t = this, e = a.type, i = "";
        1 == e ? i = "农场协议" : 2 == e ? i = "认养协议" : 3 == e && (i = "积分规则说明"), wx.setNavigationBarTitle({
            title: i
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "index",
                op: "getAgreement",
                uniacid: uniacid,
                type: e
            },
            success: function(a) {
                if (0 != a.data.code) wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: "false",
                    success: function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                }); else {
                    var e = a.data.value;
                    "" != e && WxParse.wxParse("article", "html", e, t, 5);
                }
            }
        }), app.util.setNavColor(uniacid);
    }
});