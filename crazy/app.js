require('utils/init');
var loginCount = 0;
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function (options) {
    wx.loginPromise = this.login(options);
  },
  login(options) {//获取用户信息及会员权益  本地缓存用户信息是为了防止有用户信息时后端请求微信解析opendid
    loginCount++;
    var openid = wx._getStorageSync("openid");
    if (openid){
      return Promise.resolve(wx.openid = openid)
    }
    return wx.promiseApi('login').then(res => {
      if (res.code) {
        return wx._request({
          url: 'login',
          data: {
            code: res.code,
          }
        })
      }
      throw res;
    }).then(res => {
      wx.openid = res.Data || "";
      wx._setStorage({
        key: 'openid',
        data: wx.openid
      })
      return wx.openid;
    }).catch(e => {
      if (loginCount < 3) {
        return wx.delay(1000).then(() => {
          return this.login(options)
        })
      }
      throw e;
    })
  },

})
