//app.js
require('utils/init');
require('utils/tool');//各种函数
require('utils/cloud');//云开发
require('utils/todayAction');//记录今天动作的数量

App({
  onLaunch: function (options) {
    wx.positionPromise = wx.Tool.addrPromise();
  },
  onHide(){
    wx.Tool.saveData();
    wx.saveAllActions();
  }
})


