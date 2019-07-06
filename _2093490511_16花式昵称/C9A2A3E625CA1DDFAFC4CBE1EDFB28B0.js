var t = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}, e = "https://wk.ugapp.com/", n = {
    appid: "wx23578bb17f4d960f",
    appsecret: "",
    version: "2.0.3"
};

module.exports = {
    formatTime: function(e) {
        var n = e.getFullYear(), i = e.getMonth() + 1, o = e.getDate();
        e.getHours(), e.getMinutes(), e.getSeconds();
        return [ n, i, o ].map(t).join("");
    },
    imageUtil: function(t) {
        var e = {}, n = t.detail.width, i = t.detail.height / n;
        return wx.getSystemInfo({
            success: function(t) {
                var n = t.windowWidth;
                t.windowHeight, e.imageWidth = n - 24, e.oWidth = n, e.oHeight = parseInt(n * i), 
                e.imageHeight = parseInt((n - 24) * i);
            }
        }), e;
    },
    req: function(t, i, o) {
        i.appid = n.appid, wx.request({
            url: e + t,
            data: i,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                o(t);
            },
            fail: function() {
                o(!1);
            }
        });
    },
    getReq: function(t, n) {
        wx.request({
            url: e + t,
            method: "GET",
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                n(t);
            },
            fail: function() {
                n(!1);
            }
        });
    },
    rootDocment: e,
    AppConf: n
};