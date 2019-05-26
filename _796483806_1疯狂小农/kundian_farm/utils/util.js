var formatTime = function(t) {
    var r = t.getFullYear(), o = t.getMonth() + 1, e = t.getDate(), a = t.getHours(), n = t.getMinutes(), u = t.getSeconds();
    return [ r, o, e ].map(formatNumber).join("/") + " " + [ a, n, u ].map(formatNumber).join(":");
}, formatNumber = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}, computeHeight = function(t, r, o) {
    for (var e = [], a = [], n = r.length, u = 0; u < n; u++) e[u] = !1, a[u] = Math.floor(u / 2) * (320 / 750) * 500;
    for (var m = 0; m < r.length; m++) m < o ? e[m] = !0 : a[m] < t.data.scrollTop && 0 == e[m] && (e[m] = !0);
    console.log(e), t.setData({
        arr: e,
        tarrHight: a
    });
}, returnTop = function() {
    wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
    });
};

module.exports = {
    formatTime: formatTime,
    computeHeight: computeHeight,
    returnTop: returnTop
};