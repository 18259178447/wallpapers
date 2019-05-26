var app = getApp();

Component({
    properties: {
        src: {
            type: String,
            value: ""
        },
        poster: {
            type: String,
            value: ""
        },
        scrollTop: {
            type: Number,
            value: 0,
            observer: function(e, t, a) {
                var o = this;
                wx.createSelectorQuery().in(this).select(".video").boundingClientRect(function(e) {
                    var t = e.bottom, a = o.data.pause, i = 51;
                    o.data.isFullScreen && (i += 34), a = o.data.windowHeight - t <= i, o.setData({
                        pause: a
                    });
                }).exec();
            }
        }
    },
    data: {
        pause: !0,
        isFullScreen: !1,
        windowHeight: 0
    },
    attached: function() {
        this.setData({
            windowHeight: app.globalData.sysData.windowHeight,
            isFullScreen: app.globalData.isIphoneX
        });
    },
    methods: {}
});