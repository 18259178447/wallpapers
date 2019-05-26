var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        relays: []
    },
    onLoad: function(a) {
        this.getRelaysData();
    },
    getRelaysData: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "getRelays",
                control: "control",
                uniacid: uniacid
            },
            success: function(a) {
                t.setData({
                    relays: a.data.relays
                });
            }
        });
    },
    controlRelays: function(a) {
        var t = this, s = a.currentTarget.dataset, e = s.id, n = s.status, c = t.data.relays;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                op: "controlRelays",
                id: e,
                status: n,
                control: "control",
                uniacid: uniacid
            },
            success: function(a) {
                wx.showModal({
                    title: "提示",
                    content: a.data.msg,
                    showCancel: !1,
                    success: function(a) {
                        c.map(function(a) {
                            e == a.ID && (a.Status = 1 == n ? 0 : 1);
                        }), t.setData({
                            relays: c
                        });
                    }
                });
            }
        });
    },
    onPullDownRefresh: function(a) {
        this.getRelaysData();
    }
});