var app = new getApp(), uniacid = app.siteInfo.uniacid;

Page({
    data: {
        currentType: 1,
        currentId: 0,
        parentData: [],
        typeData: [],
        setData: [],
        farmSetData: []
    },
    onLoad: function(a) {
        var t = this, e = app.siteInfo.uniacid;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "problem",
                op: "getData",
                uniacid: e
            },
            success: function(a) {
                t.setData({
                    parentData: a.data.parentData,
                    typeData: a.data.typeData,
                    setData: a.data.setData
                });
            }
        }), app.util.setNavColor(e), t.setData({
            farmSetData: wx.getStorageSync("kundian_farm_setData")
        });
    },
    changeType: function(a) {
        var t = a.currentTarget.dataset.type, e = this;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "problem",
                op: "changeType",
                uniacid: uniacid,
                pid: t
            },
            success: function(a) {
                e.setData({
                    typeData: a.data.typeData
                });
            }
        }), this.setData({
            currentType: t
        });
    },
    showDesc: function(a) {
        var e = a.currentTarget.dataset.id, t = this.data.typeData;
        this.data.currentId;
        t.map(function(a) {
            a.items.map(function(a) {
                if (e == a.id) {
                    var t = a.isShow;
                    a.isShow = !t, console.log(t);
                } else a.isShow = !1;
            });
        }), this.setData({
            typeData: t,
            currentId: e
        });
    }
});