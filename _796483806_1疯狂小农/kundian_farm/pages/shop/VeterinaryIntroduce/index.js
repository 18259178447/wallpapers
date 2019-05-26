var app = new getApp();

Page({
    data: {
        Veterinary: [],
        setData: []
    },
    onLoad: function(t) {
        var a = this, e = app.siteInfo.uniacid;
        t.title && wx.setNavigationBarTitle({
            title: t.title
        }), app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "user",
                op: "getVetData",
                uniacid: e
            },
            success: function(t) {
                a.setData({
                    Veterinary: t.data.vetData,
                    setData: wx.getStorageSync("kundian_farm_setData")
                });
            }
        }), app.util.setNavColor(e);
    },
    previewImg: function(t) {
        for (var a = t.currentTarget.dataset.vetid, e = this.data.Veterinary, r = t.currentTarget.dataset.index, i = new Array(), n = 0; n < e.length; n++) a == e[n].id && (i = e[n].certificate);
        console.log(i[r]), wx.previewImage({
            current: i[r],
            urls: i
        });
    }
});