var app = new getApp(), uniacid = app.siteInfo.uniacid, uid = wx.getStorageSync("kundian_farm_uid");

Page({
    data: {
        currenType: 1,
        couponData: [],
        farmSetData: wx.getStorageSync("kundian_farm_setData")
    },
    onLoad: function(a) {
        var t = this, n = 1;
        n = a.type ? a.type : t.data.currenType;
        var o = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "coupon",
                op: "getCouponList",
                uniacid: uniacid,
                type: n,
                uid: o
            },
            success: function(a) {
                t.setData({
                    couponData: a.data.couponData,
                    currenType: n
                });
            }
        }), app.util.setNavColor(uniacid);
    },
    changeType: function(a) {
        var t = this, n = a.currentTarget.dataset.index, o = wx.getStorageSync("kundian_farm_uid");
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "coupon",
                op: "getCouponList",
                uniacid: uniacid,
                type: n,
                uid: o
            },
            success: function(a) {
                t.setData({
                    couponData: a.data.couponData,
                    currenType: n
                });
            }
        });
    },
    getCoupon: function(a) {
        var t = this, n = a.currentTarget.dataset.cid, o = t.data.couponData, e = wx.getStorageSync("kundian_farm_uid");
        0 != e ? app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "coupon",
                op: "getCoupon",
                cid: n,
                uid: e,
                uniacid: uniacid
            },
            success: function(a) {
                1 == a.data.code ? (wx.showToast({
                    title: "领取成功"
                }), o.map(function(a) {
                    a.id == n && (a.isget = 0);
                }), t.setData({
                    couponData: o
                })) : 2 == a.data.code ? wx.showToast({
                    title: "领取失败"
                }) : 3 == a.data.code ? wx.showToast({
                    title: "已领取过了"
                }) : 4 == a.data.code ? wx.showModal({
                    title: "提示",
                    content: "优惠券已被领完"
                }) : wx.showToast({
                    title: "请稍后重试"
                });
            }
        }) : wx.navigateTo({
            url: "../../../login/index"
        });
    },
    onShow: function(a) {
        app.globalData.uid = wx.getStorageSync("kundian_farm_uid");
    }
});