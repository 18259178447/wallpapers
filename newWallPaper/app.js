//app.js
require('utils/init');
require('utils/tool');
App({
  onLaunch: function (options) {
    wx.positionPromise = wx.Tool.addrPromise();
  },
})