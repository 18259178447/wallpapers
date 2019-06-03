var config = require("./config.js");
var env = config[config.use];

wx.cloud.init({ env });

function cloudLogin() {
  var userInfo = wx._getStorageSync("userInfo");
  if (userInfo) {
    wx.userInfo = userInfo;
    return Promise.resolve(userInfo);
  }
  return wx.cloud.callFunction({
    // 云函数名称
    name: 'login',
    // 传给云函数的参数
    data: {}
  }).then(res => {
    wx._setStorage({
      key: 'userInfo',
      data: res.result,
    })
    return wx.userInfo = res.result;
  })
}
wx.cloudLoginPromise = cloudLogin();

wx.$ = function (collection){
  if (!this.db) this.db = wx.cloud.database();
  return this.db.collection(collection);
}
