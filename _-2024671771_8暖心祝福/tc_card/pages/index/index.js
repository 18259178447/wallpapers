var app = getApp();

Page({
    data: {
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 1e3
    },
    onLoad: function(a) {
        var t = this;
        app.getConfig(function(a) {
            t.setData({
                config: a
            }), wx.setNavigationBarTitle({
                title: app.globalData.config.spacename
            }), a.review ? wx.hideTabBar() : app.login(function(a) {
                t.setData({
                    user: a
                });
            }), t.cardData();
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.spacename,
            imageUrl: app.globalData.config.skinurl + app.globalData.config.sharepic,
            path: "/tc_card/pages/index/index",
            success: function(a) {}
        };
    },
    cardData: function() {
        var t = this;
        app.util.request({
            url: "entry/wxapp/carddata",
            method: "post",
            dataType: "json",
            showLoading: !1,
            success: function(a) {
                t.setData({
                    skinurl: app.globalData.config.skinurl,
                    imgurl: app.globalData.config.imgurl,
                    spacename: app.globalData.config.spacename,
                    piaofu: app.globalData.config.piaofu,
                    openmsg: app.globalData.config.openmsg,
                    msgtext: app.globalData.config.msgtext,
                    rcData: a.data.rcdata,
                    jrData: a.data.jrdata,
                    ads: a.data.ads
                });
            }
        });
    },
    showCate: function(a) {
        var t = a.currentTarget.dataset.cid;
        wx.navigateTo({
            url: "/tc_card/pages/cate/index?cid=" + t
        });
    },
    hdGoto: function(a) {
        var t = a.currentTarget.dataset.id, o = this.data.ads[t];
        0 == o.type ? wx.navigateTo({
            url: o.path
        }) : 1 == o.type ? wx.navigateTo({
            url: "/tc_card/pages/web/index?url=" + escape(o.path)
        }) : wx.navigateToMiniProgram({
            appId: o.appid,
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(a) {}
        });
    },
    changeColor: function(a) {
        var t = a.currentTarget.dataset.color, o = a.currentTarget.dataset.coname;
        this.setData({
            bgcolor: t,
            title: "文字图片-" + o
        }), wx.setNavigationBarTitle({
            title: "文字图片 - " + o
        });
    },
    ChangeFontColor: function() {
        var t = this;
        wx.showActionSheet({
            itemList: [ "黑色", "白色" ],
            success: function(a) {
                "0" == a.tapIndex ? t.setData({
                    fontcolor: "#000"
                }) : t.setData({
                    fontcolor: "#FFF"
                });
            },
            fail: function(a) {
                console.log(a.errMsg);
            }
        });
    },
    bindKeyInput: function(a) {
        this.setData({
            inputValue: a.detail.value
        });
    },
    drawPic: function() {
        var a = this;
        if (a.data.inputValue) {
            var t = app.util.url("entry/wxapp/tpic", {
                m: "tc_card",
                font: encodeURIComponent(a.data.inputValue),
                fontcolor: encodeURIComponent(a.data.fontcolor),
                bgcolor: encodeURIComponent(a.data.bgcolor)
            });
            console.log(t), wx.previewImage({
                current: "imgurl",
                urls: [ t ]
            });
        } else wx.showModal({
            content: "请输入文字",
            showCancel: !1,
            success: function(a) {}
        });
    },
    formid: function(a) {
        console.log(a.detail.formId), app.upForm(a.detail.formId);
    }
});