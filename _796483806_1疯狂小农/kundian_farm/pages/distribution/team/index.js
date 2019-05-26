var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        currentId: 1,
        saleData: [],
        page: 1,
        isContent: !0
    },
    onLoad: function(a) {
        var t = this.data, e = t.currentId, n = t.page;
        this.getSaleData(e, n);
    },
    getSaleData: function(a, t, e) {
        wx.showLoading({
            title: "玩命加载中..."
        });
        var n = this, i = wx.getStorageSync("kundian_farm_uid"), s = n.data, d = s.saleData, o = s.isContent;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "distribution",
                op: "getSaleTeam",
                uniacid: uniacid,
                uid: i,
                current: a,
                page: t
            },
            success: function(a) {
                1 == e ? a.data.one_sale && (a.data.one_sale.map(function(a) {
                    d.push(a);
                }), n.setData({
                    saleData: d,
                    page: t
                })) : (o = 0 < a.data.one_sale.length, n.setData({
                    saleData: a.data.one_sale,
                    page: 1,
                    isContent: o
                }));
                wx.hideLoading();
            }
        });
    },
    changeId: function(a) {
        var t = a.currentTarget.dataset.id;
        this.getSaleData(t, 1), this.setData({
            currentId: t
        });
    },
    onReachBottom: function(a) {
        var t = this.data, e = t.currentId, n = t.page;
        n = parseInt(n) + 1, this.getSaleData(e, n, 1);
    }
});