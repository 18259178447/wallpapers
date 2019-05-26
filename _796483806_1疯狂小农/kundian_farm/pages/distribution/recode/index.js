var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        status: -1,
        page: 1,
        list: [],
        isContent: !0
    },
    onLoad: function(t) {
        wx.getStorageSync("kundian_farm_uid");
        var a = this.data.page;
        this.getRecord(-1, a);
    },
    getRecord: function(t, a, s) {
        var i = wx.getStorageSync("kundian_farm_uid"), e = this, n = e.data, r = n.list, d = n.isContent;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "distribution",
                op: "getWithdrawRecord",
                uniacid: uniacid,
                uid: i,
                status: t
            },
            success: function(t) {
                if (1 == s) {
                    var a = t.data.list;
                    a && a.map(function(t) {
                        r.push(t);
                    }), e.setData({
                        list: r
                    });
                } else d = 0 < t.data.list.length, e.setData({
                    list: t.data.list,
                    isContent: d
                });
            }
        });
    },
    showDesc: function(t) {
        var s = t.currentTarget.dataset.id, a = this.data.records;
        a.map(function(t) {
            if (t.id == s) {
                var a = t.show;
                t.show = !a;
            }
        }), this.setData({
            records: a
        });
    },
    changeStatus: function(t) {
        var a = t.currentTarget.dataset.index, s = this.data.page;
        this.getRecord(a, s), this.setData({
            status: a,
            page: 1
        });
    },
    onReachBottom: function() {
        var t = this.data.status, a = t.status, s = t.page;
        s = parseInt(s) + 1, this.getRecord(a, s, 1), this.setData({
            status: a,
            page: s
        });
    }
});