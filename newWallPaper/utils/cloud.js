var config = require("./config.js");
var env = config[config.use];
if(env){
  try {
    wx.cloud.init({ env });
  } catch (e) {
    console.log("第一次失败")
    try {
      wx.cloud.init({ env });
    } catch (e) {
      console.log("第2次失败")
      wx.cloud.init({ env });
    }
  }
}


var loginCount = 0;
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
  }).catch(e=>{
    console.log("失败登陆"+loginCount)
    if (loginCount < 3){
      loginCount++;
      return wx.delay(500).then(()=>{
        return cloudLogin()
      })
    }
    
  })
}
// wx.cloudLoginPromise = cloudLogin();

wx.$ = function (collection){
  if(!env) return {
    doc(){
      return this;
    },
    get(){
      return Promise.resolve({
        data:{
          ver:3
        }
      })
    },
    add(){
      return Promise.resolve({
        data: {
        }
      })
    }
  }

  if (!this.db) this.db = wx.cloud.database();
  return this.db.collection(collection);
}
