var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        currentIndex: 6,
        orderData: [],
        page: 1,
        order_type: 1,
        isContent: !0
    },
    onLoad: function(a) {
        var t = this, e = a.order_type, r = t.data, n = r.currentIndex, d = r.page;
        t.getOrderData(n, uniacid, d, 0, e), t.setData({
            page: 1,
            order_type: e
        });
    },
    getOrderData: function(a, t, e, r, n) {
        wx.showLoading({
            title: "玩命加载中..."
        });
        var d = this, i = wx.getStorageSync("kundian_farm_uid"), o = d.data, s = o.orderData, c = o.isContent;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "distribution",
                op: "getSaleOrder",
                uniacid: t,
                uid: i,
                status: a,
                page: e,
                order_type: n
            },
            success: function(a) {
                1 == r ? a.data.orderData && a.data.orderData.map(function(a) {
                    s.push(a);
                }) : (s = a.data.orderData, c = !(0 == s.length || !s));
                d.setData({
                    orderData: s,
                    isContent: c
                }), wx.hideLoading();
            }
        });
    },
    changeIndex: function(a) {
        var t = a.currentTarget.dataset.index, e = this.data, r = e.page, n = e.order_type;
        this.getOrderData(t, uniacid, r, 0, n), this.setData({
            page: 1,
            currentIndex: t
        });
    },
    isShow: function(a) {
        var e = a.currentTarget.dataset.id, t = this.data.orderData;
        t.map(function(a) {
            if (a.id == e) {
                var t = a.click;
                a.click = !t;
            }
        }), this.setData({
            orderData: t
        });
    },
    onReachBottom: function(a) {
        var t = this.data.currentIndex, e = t.currentIndex, r = t.page, n = t.order_type;
        r = parseInt(r) + 1, this.getOrderData(e, uniacid, r, 1, n), this.setData({
            page: r
        });
    }
});