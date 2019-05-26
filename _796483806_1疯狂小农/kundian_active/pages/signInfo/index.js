var app = new getApp(), uniacid = app.siteInfo.uniacid, mudule_name = "kundian_farm_plugin_active";

Page({
    data: {
        sign: []
    },
    onLoad: function(a) {
        var i = this, n = a.active_id;
        console.log(n);
        var t = app.util.url("entry/wxapp/active") + "m=" + mudule_name;
        wx.request({
            url: t,
            data: {
                op: "getSignInfo",
                uniacid: uniacid,
                active_id: n
            },
            success: function(a) {
                i.setData({
                    sign: a.data.signInfo
                });
            }
        }), app.util.setNavColor(uniacid);
    }
});