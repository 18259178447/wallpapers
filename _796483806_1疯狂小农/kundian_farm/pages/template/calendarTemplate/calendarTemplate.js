Object.defineProperty(exports, "__esModule", {
    value: !0
});

var app = new getApp(), conf = {
    getThisMonthDays: function(a, t) {
        return new Date(a, t, 0).getDate();
    },
    getFirstDayOfWeek: function(a, t) {
        return new Date(Date.UTC(a, t - 1, 1)).getDay();
    },
    getNowday: function() {
        var a = new Date();
        return a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate();
    },
    calculateEmptyGrids: function(a, t) {
        var e = conf.getFirstDayOfWeek(a, t), n = [];
        if (0 < e) {
            for (var r = 0; r < e; r++) n.push(r);
            this.setData({
                "calendar.hasEmptyGrid": !0,
                "calendar.empytGrids": n
            });
        } else this.setData({
            "calendar.hasEmptyGrid": !1,
            "calendar.empytGrids": []
        });
    },
    calculateDays: function(a, t) {
        var e = [], n = conf.getThisMonthDays(a, t), r = conf.getNowday();
        r = new Date(r);
        for (var s = 1; s <= n; s++) {
            var c = a + "/" + t + "/" + s;
            c = new Date(c);
            var d = void 0;
            d = !(0 < r.getTime() - c.getTime()), e.push({
                day: s,
                choosed: !1,
                size: d,
                sign: !1
            });
        }
        this.setData({
            "calendar.days": e
        });
    },
    handleCalendar: function(a) {
        var t = a.currentTarget.dataset.handle, e = this.data.calendar.curYear, n = this.data.calendar.curMonth, r = 0, s = 0;
        "prev" === t ? (s = e, (r = n - 1) < 1 && (s = e - 1, r = 12)) : (s = e, 12 < (r = n + 1) && (s = e + 1, 
        r = 1)), conf.calculateDays.call(this, s, r), conf.calculateEmptyGrids.call(this, s, r), 
        this.setData({
            "calendar.curYear": s,
            "calendar.curMonth": r
        });
        var c = wx.getStorageSync("kundian_farm_uid"), d = app.siteInfo.uniacid, i = this, o = i.data.calendar;
        app.util.request({
            url: "entry/wxapp/class",
            data: {
                control: "sign",
                op: "getChangeSign",
                uid: c,
                uniacid: d,
                year: s,
                month: r
            },
            success: function(a) {
                if (console.log(a), a.data.signData) {
                    for (var t = a.data.signData, e = 0; e < o.days.length; e++) for (var n = 0; n < t.length; n++) o.days[e].day == t[n].day && (o.days[e].choosed = !0, 
                    o.days[e].sign = !0);
                    i.setData({
                        calendar: o
                    });
                }
            }
        });
    },
    tapDayItem: function(a) {
        var t = a.currentTarget.dataset.idx, e = this.data.calendar.days, n = this.data.calendar.curYear + "/" + this.data.calendar.curMonth + "/" + e[t].day;
        console.log(n), n = new Date(n);
        var r = conf.getNowday();
        if ((r = new Date(r)).getTime() - n.getTime() == 0) {
            e[t].choosed = !e[t].choosed, this.setData({
                "calendar.days": e
            });
            var s = this.data.calendar.curYear, c = this.data.calendar.curMonth, d = e[t].day, i = wx.getStorageSync("kundian_farm_uid"), o = app.siteInfo.uniacid, l = this;
            app.util.request({
                url: "entry/wxapp/class",
                data: {
                    control: "sign",
                    op: "addSign",
                    uid: i,
                    uniacid: o,
                    year: s,
                    month: c,
                    day: d
                },
                success: function(a) {
                    console.log(a), 1 == a.data.code ? (wx.showToast({
                        title: "签到成功"
                    }), l.setData({
                        userData: a.data.userData,
                        is_sign: 1
                    })) : 2 == a.data.code ? wx.showToast({
                        title: "签到失败"
                    }) : 3 == a.data.code ? wx.showToast({
                        title: "今日已签到"
                    }) : wx.showToast({
                        title: "签到失败1"
                    });
                }
            });
        }
    }
};

function _getCurrentPage() {
    var a = getCurrentPages();
    return a[a.length - 1];
}

exports.default = function() {
    var a = _getCurrentPage(), t = new Date(), e = t.getFullYear(), n = t.getMonth() + 1;
    a.setData({
        calendar: {
            curYear: e,
            curMonth: n,
            weeksCh: [ "日", "一", "二", "三", "四", "五", "六" ],
            hasEmptyGrid: !1
        }
    }), conf.calculateEmptyGrids.call(a, e, n), conf.calculateDays.call(a, e, n), a.tapDayItem = conf.tapDayItem.bind(a), 
    a.handleCalendar = conf.handleCalendar.bind(a);
};