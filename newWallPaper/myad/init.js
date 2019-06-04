var config = require("./config.js")
var ver = wx._getStorageSync("ver") || 0;

wx.isVerify = ver === config.ver;

if(wx.isVerify){//如果审
  wx.adInitPromise = wx.positionPromise.then(res=>{
    return wx.$("init").doc("abc").get().then(res => {
      wx.isVerify = config.ver === res.data.ver;
      if (!wx.isVerify) {
        wx._setStorage({
          key: 'ver',
          data: res.data.ver,
        })
      }
      console.log("isVerify",wx.isVerify)
      return wx.isVerify
    }).catch(e => {
      console.log(11, e)
    })
  })
}else{
  console.log("isVerify", wx.isVerify)
  wx.adInitPromise = Promise.resolve(wx.isVerify)
}