var e = require("D7289E0325CA1DDFB14EF6042CAB28B0.js"), t = {
    homeListUrl: e.server_url + "HomeList/details",
    detailUrl: e.server_url + "HomeList/DescrList",
    ReturnGif: e.server_url + "HomeList/ReturnGif",
    greetings: e.server_url + "HomeList/greetings",
    requestVidewUrl: "https://baiaf.com"
}, o = {
    homeList: function(e) {
        wx.request({
            url: t.homeListUrl,
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "GET",
            success: function(t) {
                console.log(t), e(t);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    detailList: function(e, o) {
        console.log(e), wx.request({
            url: t.detailUrl,
            data: {
                typeid: e
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                for (var t = 0; t < e.data.list.length; t++) e.data.list[t].color = "#ffffff", e.data.list[t].color1 = "#515151";
                console.log(e), o(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    makeIamge: function(e, o, i, n, r) {
        console.log(), wx.request({
            url: t.ReturnGif,
            data: {
                gifid: e,
                text: o,
                name: i,
                userid: n
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function(e) {
                r(e);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    textList: function(e) {
        wx.request({
            url: t.greetings,
            data: {},
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "GET",
            success: function(t) {
                console.log(t, 11323), e(t);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    requestVideo: function(e, o) {
        wx.showLoading({
            title: "加载中"
        }), wx.request({
            url: t.requestVidewUrl,
            data: {
                page: e
            },
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            method: "GET",
            success: function(e) {
                o(e), wx.hideLoading();
            },
            fail: function(e) {
                wx.hideLoading();
            }
        });
    }
};

module.exports = o;