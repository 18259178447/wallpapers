//app.js
require('utils/init');
require('utils/tool');

App({
  onLaunch: function (options) {
    wx.positionPromise = this.getPosition();
  },
  getPosition() {
    var addr = wx.getStorageSync('addr')
    if(addr !== ''){
      wx.fujian = addr === 'fujian' ? true : false;
      return Promise.resolve(wx.fujian)
    }
    return wx.promiseApi('request',{
      url: 'https://www.sojson.com/myip/',
    }).then(res=>{
      wx.fujian = /\u798f\u5efa\u7701/.test((/mainInfo.{1,20}/.exec(res.data) || [''])[0]);
      wx.setStorage({
        key: 'addr',
        data: wx.fujian ? 'fujian' : 'other',
      })
      return wx.fujian;
    })
  },
})