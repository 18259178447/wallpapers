var t = getApp();

Page({
    data: {
        list: [],
        page: 1
    },
    xiang: function(a) {
        var e = a.currentTarget.dataset.id, i = this;
        wx.showLoading({
            title: "加载中"
        }), console.log(e), t.theme_id = this.data.list[e].theme_id, t.cate_id = this.data.list[e].cate_id, 
        t.globalData.card = this.data.list[e], t.globalData.title = this.data.list[e].theme_title, 
        t.globalData.img = this.data.list[e].theme_logo, t.globalData.paixing = this.data.list[e].paixing, 
        t.theme_id = this.data.list[e].theme_id, i.data.list[e].star && (t.globalData.star = i.data.list[e].star), 
        wx.getLocation({
            success: function(a) {
                wx.hideLoading(), a.longitude = Math.floor(100 * a.longitude) / 100, a.latitude = Math.floor(100 * a.latitude) / 100, 
                t.globalData.location = a, wx.navigateTo({
                    url: "/pages/myCenter/jie/jie"
                });
            }
        });
    },
    goToBar: function(t) {
        var a = t.currentTarget.dataset.key;
        console.log(t), wx.switchTab({
            url: "/pages/" + a + "/" + a
        });
    },
    preview: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/share/share?theme_id=" + a
        });
    },
    onLoad: function(t) {
        this.getList();
    },
    onReachBottom: function() {
        this.getList();
    },
    getList: function() {
        var a = this, e = this.data.list;
        wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: t.yu + "/index.php/Index/getTestLog.html",
            data: {
                auth: t.auth.auth,
                secert: t.secert,
                page: a.data.page
            },
            header: {
                "content-type": "application/json"
            },
            method: "POST",
            success: function(t) {
                0 != t.data.status ? (e = e.concat(t.data.log), a.setData({
                    list: e,
                    page: a.data.page + 1
                }), wx.hideLoading()) : (wx.showToast({
                    title: "没有更多了",
                    icon: "none"
                }), wx.hideLoading()), console.log(t);
            }
        });
    },
    tobar: function(t) {
        var a = t.currentTarget.dataset.id;
        console.log(a), wx.navigateTo({
            url: "/pages/bar/bar?id=" + a
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onShareAppMessage: function() {}
});