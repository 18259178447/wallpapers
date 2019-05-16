//app.js
require('utils/init');
require('utils/tool');

App({
  onLaunch: function (options) {
    wx.positionPromise = this.getPosition();
  },
  getPosition() {
    // https://www.sojson.com/myip/
    var addr = wx.getStorageSync('addr')
    if(addr !== ''){
      wx.fujian = addr === 'fujian' ? true : false;
      return Promise.resolve(wx.fujian)
    }
    return wx.promiseApi('request',{
      url: 'https://www.ip138.com/ips138.asp',
    }).then(res=>{
      var ip_address = /您的IP地址是.{1,50}/.exec(res.data);
      // 218.104.234.179
      wx.fujian = /218\.104\.234\.179|\u798f\u5efa\u7701/.test(ip_address);
      wx.setStorage({
        key: 'addr',
        data: wx.fujian ? 'fujian' : 'other',
      })
      return wx.fujian;
    })
  },
})