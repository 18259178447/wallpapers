var app = new getApp(), order = [ "red", "yellow", "blue", "green", "red" ], uniacid = app.siteInfo.uniacid;

Page({
    data: {
        weather: {},
        weatherSet: [],
        farm_name: ""
    },
    onLoad: function(a) {
        var e = wx.getStorageSync("kundian_farm_weather"), t = JSON.parse(a.weatherSet);
        this.setData({
            weatherSet: t,
            weather: e,
            farm_name: a.farm_name
        }), app.util.setNavColor(app.siteInfo.uniacid);
    },
    intoFarmAddress: function(a) {
        var e = this.data.weatherSet;
        wx.openLocation({
            latitude: parseFloat(e.latitude),
            longitude: parseFloat(e.longitude),
            name: this.data.farm_name
        });
    }
});