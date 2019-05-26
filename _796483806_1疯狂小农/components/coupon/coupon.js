var app = new getApp();

Component({
    options: {
        multipleSlots: !0
    },
    properties: {
        couponData: {
            type: Array,
            value: []
        },
        icon: {
            type: String,
            value: ""
        },
        noIcon: {
            type: String,
            value: ""
        }
    },
    data: {
        setData: wx.getStorageSync("kundian_farm_setData")
    },
    methods: {
        examineMoreCoupon: function(e) {
            wx.navigateTo({
                url: "/kundian_farm/pages/user/coupon/index/index"
            });
        },
        getCoupon: function(e) {
            var n = e.currentTarget.dataset.type;
            wx.getStorageSync("kundian_farm_uid"), app.siteInfo.uniacid;
            wx.navigateTo({
                url: "/kundian_farm/pages/user/coupon/index/index?type=" + n
            });
        }
    }
});