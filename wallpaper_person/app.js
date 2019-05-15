var pushApp = require('./utils/pushsdk.js').pushSdk()
require('common/init');
// wx.isNotify = wx._getStorageSync('isNotify');
// wx.isNotify === '' && (wx.isNotify  = true);

App({
  onLaunch(options){
    if (options.referrerInfo && options.referrerInfo.appId){
      wx.appid = options.referrerInfo.appId;
      wx.reportAnalytics('from', {
        'from': wx.appid,
      });
    }
    console.log(options)
  },
  onLogin(options) {
    console.log('用户id',wx.userInfo.userID)
  },
  onShow(){
    if (wx.isSafe === 'false'){
      wx.hideTabBar();
      
      wx.showToast({
        title: '页面已丢失',
        icon: 'none',
        duration: 20000000,
        mask: true
      })
      wx.switchTab({
        url: '/pages/index/index'
      })
      wx.hideShareMenu()
    }
  }
})