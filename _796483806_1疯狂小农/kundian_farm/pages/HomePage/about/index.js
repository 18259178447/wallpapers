var WxParse = require("../../../../wxParse/wxParse.js"), app = new getApp();

Page({
    data: {},
    onLoad: function(a) {
        var t = app.siteInfo.uniacid, e = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getAboutData",
                uniacid: t,
                action: "index",
                control: "home"
            },
            success: function(a) {
                "" != a.data.aboutData.farm_desc && WxParse.wxParse("article", "html", a.data.aboutData.farm_desc, e, 5);
            }
        });
    }
});