var t, e = getApp();

Page({
    data: {
        show: !1,
        autoplay: !0,
        videoContext: null,
        percent: 0,
        isPlay: !0,
        count: 0,
        pages: 0,
        page: 1,
        subject: {},
        current: 0,
        subjectList: [],
        userInfo: {},
        hasUserInfo: !1,
        inputTalk: "",
        talks: [],
        talksPage: 1,
        talksPages: -1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        talksAnimationData: {}
    },
    changeSubject: function(t) {
        t = t || 0;
        var e = this.data.subjectList;
        e.length <= t || (this.setData({
            current: t,
            subject: e[t]
        }), e.length - t <= 5 && this.loadData(this.data.page + 1));
    },
    like: function(t) {
        if (this.checkUserInfo()) {
            var e = this.data.subject;
            e.like = !0, e.likes = e.likes + 1, this.setData({
                subject: e
            }), api.like({
                subjectId: e.subjectId
            });
        }
    },
    apply: function(t) {
        wx.showToast({
            icon: "none",
            title: "暂时还不能发布视频呦"
        });
    },
    checkUserInfo: function() {
        return !!e.globalData.userInfo || (wx.showModal({
            content: "请先授权访问你的基本信息",
            success: function(t) {
                t.confirm && wx.navigateTo({
                    url: "getuserinfo"
                });
            }
        }), !1);
    },
    talk: function(t) {
        wx.showToast({
            icon: "none",
            title: "敬请期待"
        });
    },
    share: function(t) {
        wx.showToast({
            icon: "none",
            title: "敬请期待"
        });
    },
    loadData: function(t, e) {
        var a = this;
        this.setData({
            page: t
        }), api.getRecommendList({
            data: {
                page: t,
                rows: 5,
                type: "video"
            },
            success: function(n) {
                var i = n.content;
                if (i) {
                    for (var o = [], s = 0; s < a.data.subjectList.length; s++) o.push(a.data.subjectList[s]);
                    for (s = 0; s < i.length; s++) o.push(i[s]);
                    a.setData({
                        count: n.count,
                        page: t,
                        pages: n.pages,
                        subjectList: o
                    }), e && e();
                }
            }
        });
    },
    onLoad: function(t) {
        var a = this, n = t.id;
        a.data.videotitle, a.data.videourl;
        e.func.getReq("video.php", function(t) {
            a.setData({
                videourl: t.data.list[n].videourl,
                videotitle: t.data.list[n].videotitle
            });
        });
    },
    onShow: function() {},
    onReady: function() {
        this.videoContext = wx.createVideoContext("myVideo"), wx.setNavigationBarTitle({
            title: "视频教程"
        });
    },
    timeupdate: function(t) {
        var e = t.detail.currentTime, a = t.detail.duration, n = Math.round(e / a * 1e4) / 100;
        this.setData({
            percent: n
        });
    },
    play: function() {
        this.data.isPlay ? this.videoContext.pause() : this.videoContext.play();
    },
    bindPlay: function() {
        this.setData({
            isPlay: !0
        });
    },
    bindPause: function() {
        this.setData({
            isPlay: !1
        });
    },
    bindEnded: function() {
        this.setData({
            isPlay: !1
        });
    },
    pre: function() {
        this.changeSubject(this.data.current - 1);
    },
    next: function() {
        this.changeSubject(this.data.current + 1);
    },
    touchstart: function(e) {
        t = e.changedTouches[0];
    },
    touchmove: function(t) {},
    touchend: function(e) {
        this.getDirect(t, e.changedTouches[0]);
    },
    touchcancel: function(e) {
        this.getDirect(t, e.changedTouches[0]);
    },
    getDirect: function(t, e) {
        var a = e.pageX - t.pageX, n = e.pageY - t.pageY;
        Math.abs(a) > Math.abs(n) && a > 0 ? console.log("left 2 right") : Math.abs(a) > Math.abs(n) && a < 0 ? console.log("right 2 left") : Math.abs(n) > Math.abs(a) && n > 0 ? (console.log("top 2 bottom"), 
        this.pre()) : Math.abs(n) > Math.abs(a) && n < 0 && (console.log("bottom 2 top"), 
        this.next());
    }
});