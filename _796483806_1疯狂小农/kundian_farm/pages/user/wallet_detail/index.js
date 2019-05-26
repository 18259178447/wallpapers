var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        list: [],
        page: 1
    },
    onLoad: function(t) {
        this.getList(1, 0);
    },
    getList: function(n, e) {
        var s = this, t = wx.getStorageSync("kundian_farm_uid");
        1 == e && (n = parseInt(n) + 1), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "user",
                op: "getDetail",
                uid: t,
                uniacid: uniacid,
                page: n
            },
            success: function(t) {
                if (console.log(t), 1 == e) {
                    var a = t.data.list, i = s.data.list;
                    a.map(function(t) {
                        i.push(t);
                    }), s.setData({
                        list: i,
                        page: n
                    });
                } else s.setData({
                    list: t.data.list,
                    page: 1
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onReachBottom: function() {
        var t = this.data.page;
        this.getList(t, 1);
    }
});