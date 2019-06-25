var config = require("./config.js")
var ver = wx._getStorageSync("verv2") || 0;

wx.isVerify = ver !== config.ver;

if(wx.isVerify){//如果审
  wx.adInitPromise = wx.positionPromise.then(res=>{
    return wx.$("init").doc("abc").get().then(res => {
      wx.isVerify = config.ver === res.data.ver;
      if (!wx.isVerify) {
        wx._setStorage({
          key: 'verv2',
          data: config.ver,
        })
      }else{
        __wxConfig.envVersion && wx.$("env").add({
          data: {
            env: __wxConfig.envVersion
          }
        })
      }
      console.log("线上ver", res.data.ver, "config-ver", config.ver, "isVerify=" +wx.isVerify )


      return wx.isVerify
    }).catch(e => {
      console.log(11, e)
    })
  })
}else{
  console.log("缓存ver", ver, "config-ver", config.ver, "isVerify=" + wx.isVerify)
  wx.adInitPromise = Promise.resolve(wx.isVerify)
}