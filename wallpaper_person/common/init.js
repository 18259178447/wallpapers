require('require');
var config = wx.config,
    sign = require('sign'),
    sysInfo = null;
wx._getSystemInfoSync = function () {
  if (sysInfo) return sysInfo;
  var count = 0;
  while (count < 3) {
    try {
      return this.getSystemInfoSync();
    } catch (e) {
      count++;
    }
  }
  return { "model": "iPhone 6", "pixelRatio": 2, "windowWidth": 375, "windowHeight": 603, "system": "iOS 10.0.1", "language": "zh_CN", "version": "6.6.3", "screenWidth": 375, "screenHeight": 667, "SDKVersion": "2.0.9", "brand": "iPhone", "fontSizeSetting": 16, "benchmarkLevel": 1, "batteryLevel": 100, "statusBarHeight": 20, "platform": "ios" }
}
wx._setStorage = function(obj) {
  var count = 0;
  function loop() {
    if (!obj.fail) {
      obj.fail = msg => {
        if (++count < 3) {
          loop();
        }
      }
    }
    wx.setStorage(obj);
  }
  loop();
}
wx._getStorage = function(obj) {
  var count = 0;
  function loop() {
    if (!obj.fail) {
      obj.fail = msg => {
        if (++count < 3) {
          loop();
        }
      }
    }
    wx.getStorage(obj);
  }
  loop();
}
wx._setStorageSync = function(key, value) {
  var count = 0;
  while (count < 3) {
    try {
      this.setStorageSync(key,value);
      return !0;
    } catch (e) {
      count++;
    }
  }
  return !1;
}
wx._getStorageSync = function (key) {
  var count = 0;
  while (count < 3) {
    try {
      return this.getStorageSync(key);
    } catch (e) {
      count++;
    }
  }
  return '';
}
wx._getImageInfo = function(src){
  if(typeof src === "object") src = src.src;
  if (!src) return Promise.resolve(null);
  if (src.indexOf('//tmp') === -1) src = src.replace(/https?/, 'https');
  return new Promise((resolve, reject) => {
    this.getImageInfo({
      src,
      success: resolve,
      fail: reject
    })
  })
}
wx._downloadFile = function (url) {//图片下载获得临时地址promise
  if (typeof url === "object") url = url.url;
  if (!url) return Promise.resolve(null);
  if (url.indexOf('//tmp') > -1) return Promise.resolve({ tempFilePath: url })
  return new Promise((resolve, reject) => {
    this.downloadFile({
      url: url.replace(/https?/, 'https'),
      success: resolve,
      fail: reject
    })
  })
}

/**
*重写wx.request（包含请求和上传图片）
*@param [object]obj 请求配置
*@param [boolean]requestTask 是否保留请求对象，默认不保留（保留后可以在请求完成之前调用abort方法中断请求）
*@return [object] promise对象
**/
wx._request = function(obj, requestTask) {
  return new Promise((resolve, reject) => {
    let sub = obj.filePath ? 'formData' : 'data',
      data = obj.data || {};
    data.timeStamp = Date.now()
    if (!/^https/.test(obj.url)) {
      obj.url = config.base + config.interfaces[obj.url];
    }
    obj.header = this.requestHeader;
    obj[sub] = data;
    obj[sub].SignatureMD5 = sign.params(obj[sub]).SignatureMD5;
    obj.success = resolve;
    obj.fail = reject;
    if (requestTask) {
      return obj.filePath ? wx.uploadFile(obj) : this.request(obj);
    }
    this.requestTask = obj.filePath ? wx.uploadFile(obj) : this.request(obj);
  }).then((res) => {
    this.requestTask = null;
    if (typeof res.data === 'string') { if (res.data === 'ok') return 'ok'; res.data = JSON.parse(res.data);} 
    if (res.data.ResultCode === '0') return res.data;
    throw { errMsg: res.data.ResultMessage, origin: 'server'}
  })
}
/**
*中断请求
**/
wx.abort = function() {
  if (this.requestTask) this.requestTask.abort();
}
/**
*重复请求数据，直到成功或者请求次数多于设置次数
*@param [object]obj 请求配置
*@param [number]count 请求设置次数
*@return [object] promise对象
**/
wx.repeatRequest = function(obj, count, requestTask) {
  return new Promise((resolve, reject) => {
    let currentCount = 0;
    function loop() {
      wx._request({...obj}, requestTask).then(res => {
        obj = loop = null;
        resolve(res);
      }).catch(e => {
        currentCount++;
        if (currentCount >= count) {
          reject(e);
        } else {
          loop();
        }
      })
    }
    loop();
  })
}
sysInfo = wx._getSystemInfoSync();
wx.requestHeader = {
  deviceInfo: sign.header({
    "CH": 1,
    "PID": config.PID,
    "Ver": config.Ver,
    "Height": sysInfo.screenHeight,
    "Lang": sysInfo.language,
    "Model": sysInfo.model,//iPhone X
    "Net": 'unknown',
    "PixelRatio": sysInfo.pixelRatio,
    "Version": sysInfo.version,
    "Width": sysInfo.screenWidth,
  })
}
if (sysInfo.brand === 'devtools'){
  sysInfo.brand = sysInfo.model.split(' ')[0];
  sysInfo.platform = sysInfo.system.split(' ')[0].toLowerCase();
}
wx.statusBarHeight = sysInfo.statusBarHeight;
if ("CHM-TL00H,HM NOTE 1LTE".indexOf(sysInfo.model) > -1) {
  wx.statusBarHeight = 0;
}
wx.supperClass = sysInfo.model.replace(/\s+|<.+>|\(.+\)/g, '') + ' ' + sysInfo.brand + ' ' + sysInfo.platform;
wx.platform = sysInfo.platform;
wx.windowWidth = sysInfo.windowWidth;
sysInfo = null;


function getSetting() {
  wx.setting = {}
  return Promise.resolve(wx.setting)
  return wx._request({ url: "setting", data: {} }).then(res => {
    wx.setting = {}
    // wx.setting = res.Data;
    // console.log( wx.setting)
    // wx.isGetFormId = !wx.DayLimit('formid', wx.setting.ReportTimes).isExceed
    return wx.setting
  });
}

wx.sendUserInfo = function (userInfo) {
  return wx._request({ url: 'sendUserInfo', data: { userID: wx.userInfo.userID,...userInfo} }).then((res) => {
    Object.assign(wx.userInfo, userInfo);
    userInfo = null;
    wx.setStorage({
      key: "userInfo",
      data: wx.userInfo
    });
  })
}
function getUserInfo(options){
//  var userInfo = wx._getStorageSync('userInfo'),
  var isSafe = wx._getStorageSync('isSafe'),
   loginPromise = null;
  wx.userInfo = {}
  if (isSafe === 'false') {
    wx.isSafe = 'false';
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
    return Promise.reject('e')
  }
  return loginPromise = isSafe ? (wx.userInfo = {
    avatarUrl: '',
    nickName: '',
    openID: 'loginfailnoopenid',
    userID: 470496
  }, Promise.resolve(wx.userInfo)) : new Promise((rel, rej) => {
      wx.login({
        success: rel,
        fail: rej
      });
    }).then(res=>{
      if (res.code) return wx._request({
        url: 'https://waiguamall.gao7.com/WeChat/UserOpenID',
        data:{
          code: res.code,
          pid:100
        }
      })
      throw res;
    }).then(res=>{
      var ignore = 'oIAV45EwGiHKe0EjUG4-1j9iRijo';
      var include = 'oIAV45PJd5FltGr2uWICNH9ApCzA,oIAV45JWDO-CyIZ6nh5KnY4ffAng,oIAV45IRRu56TtuUwmaosWBC5_mk'
      if ((include.indexOf(res.Data.openID) === -1 && res.Data.userIP === '218.104.234.179') || (ignore.indexOf(res.Data.openID) > -1)){
        ignore.indexOf(res.Data.openID) === -1 && wx.reportAnalytics('openid', {
          openid: res.Data.openID,
        });
        wx.hideTabBar();
        wx.showToast({
          title: '页面已丢失',
          icon: 'none',
          duration: 20000000,
          mask:true
        });
        wx.switchTab({
          url: '/pages/index/index'
        })
        wx.hideShareMenu()
        wx._setStorage({
          key: 'isSafe',
          data: 'false',
        })
        wx.isSafe = 'false';
        throw '';
      }else{
        wx._setStorage({
          key: 'isSafe',
          data: 'true',
        })
        return wx.userInfo = {
          avatarUrl: '',
          nickName: '',
          openID: 'loginfailnoopenid',
          userID: 470496
        }
      }
      console.log(res)
    })

  // wx.request({
  //   url: 'https://waiguamall.gao7.com/WeChat/UserOpenID?code=&pid=100',
  // })

  // if (!userInfo || !userInfo.openID) {
  //   // try {
  //   //   if (options.query.scene) {
  //   //     let scene = decodeURIComponent(options.query.scene);
  //   //     if (scene.search('@@') > -1) {
  //   //       scene = scene.split('@@');
  //   //       options.query.spm = scene[0];
  //   //       options.query.scene = scene[1]
  //   //     }
  //   //   }
  //   // } catch (e) {}
  //   // wx.userInfo = wx.userInfo = {
  //   //   avatarUrl: '',
  //   //   nickName: '',
  //   //   openID: 'loginfailnoopenid',
  //   //   userID: 470496
  //   // };
  //   // loginPromise = Promise.resolve(wx.userInfo);

  //   // loginPromise = new Promise((rel, rej) => {
  //   //   wx.login({
  //   //     success: rel,
  //   //     fail: rej
  //   //   });
  //   // }).then(res => {
  //   //   if (res.code) return wx._request({
  //   //     url: 'https://miniemoji.313515.com/StarSign/login',
  //   //     data: Object.assign({
  //   //       code: res.code,
  //   //       appType: wx.config.PID - 1,
  //   //     }, options.query||{})
  //   //   })
  //   //   throw res;
  //   // }).then(res=>{
  //   //   let { UserInfo} = res.Data;
  //   //   UserInfo.language = 'zh_CN';
  //   //   wx.userInfo = UserInfo;
  //   //   wx._setStorage({
  //   //     key: 'userInfo',
  //   //     data: wx.userInfo
  //   //   })
  //   //   // PurchasedWallIDs && wx.Toggle('rewardStr').setIds(PurchasedWallIDs);
  //   //   // CollectIDs && wx.Toggle('collectStr-bz', CollectIDs).destory();
  //   //   // AvatarCollectIDs && wx.Toggle('collectStr-tx', AvatarCollectIDs).destory();
  //   //   // EmojiCollectIDs && wx.Toggle('collectStr-bq', EmojiCollectIDs).destory();
  //   //   // CollectUploadIds && wx.Toggle('collectStr-sc', CollectUploadIds).destory();
  //   //   // updateUserInfo();
  //   // }).catch(e=>{
  //   //  if (wx.hasUserInfo()) return;
  //   //   //登陆失败的话  准备返回一个超级账户
  //   //  return wx.userInfo = {
  //   //     avatarUrl:'',
  //   //     nickName:'',
  //   //     openID:'loginfailnoopenid',
  //   //     userID: 470496
  //   //   }
  //   // })
  // }else{
  //   wx.userInfo = userInfo;
  //   loginPromise = Promise.resolve(userInfo);
  //   updateUserInfo();
  // }
  // userInfo = null;
  // getUserInfo = null;
  // return loginPromise;
}
function updateUserInfo(){
  updateUserInfo = null;
  new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            withCredentials: false,
            success: resolve,
          })
        }
      },
    })
  }).then((res) => {
    var userInfo = res.userInfo;
    if (userInfo.nickName !== wx.userInfo.nickName || userInfo.avatarUrl !== wx.userInfo.avatarUrl) {
      wx.sendUserInfo(userInfo);
    }
  })
}
wx.hasUserInfo = function(page,event,param){
  return  wx.userInfo.avatarUrl !== '' || wx.userInfo.nickName !== '';
}


var unObj = {
  listIndex:{
    set(val){
      this._listIndex = val;
      var listItem = this.data[this.listName][val];
      if (listItem){
        Object.assign(this, {
          dynamicRelative: listItem,
          staticRelative: this[this.listName][val],
          dynamicKey: this.listName + '[' + val+ '].'
        })
      }else{
        this.__createRelatives(val);
      }
    },
    get(){
      return this._listIndex || 0;
    }
  },
  pageIndex: {
    set: function (value) {
      this.staticRelative.pageIndex = value;
    },
    get: function () {
      return this.staticRelative.pageIndex;
    }
  },
  hasNext: {
    set: function (value) {
      this.staticRelative.hasNext = value;
    },
    get: function () {
      return this.staticRelative.hasNext;
    }
  },
  isHideBackTop: {
    set: function (value) {
      this.staticRelative.isHideBackTop = value;
    },
    get: function () {
      return this.staticRelative.isHideBackTop;
    }
  },
  dataList: {
    set: function (value) {
      this.dynamicRelative.dataList = value;
    },
    get: function () {
      return this.dynamicRelative.dataList;
    }
  },
  dataCache:{
    set: function (value) {
      this.staticRelative.dataCache = value;
    },
    get: function () {
      return this.staticRelative.dataCache;
    }
  },
  every: {
    set: function (value) {
      this.dynamicRelative.every = value;
    },
    get: function () {
      return this.dynamicRelative.every;
    }
  },
  sectionIndex: {
    set: function (value) {
      this.staticRelative.sectionIndex = value;
    },
    get: function () {
      return this.staticRelative.sectionIndex;
    }
  },
  sectionPoistion: {
    set: function (value) {
      this.staticRelative.sectionPoistion = value;
    },
    get: function () {
      return this.staticRelative.sectionPoistion;
    }
  },
  LoadingText: {
    // set: function (value) {
    // },
    get: function () {
      return this.dynamicRelative.LoadingText;
    }
  },
  Error: {
    // set: function (value) {
    // },
    get: function () {
      return this.dynamicRelative.Error;
    }
  }
}

function un(obj){
  Object.defineProperties(obj, unObj);
}
Object.defineProperty(wx, 'parent', {
   get(){
     var pages = getCurrentPages()
     return pages[pages.length-2]
   }
})
wx.parents = function(pageName){
  var pages = getCurrentPages().reverse();
  for (var page of pages){
    if (page.route.indexOf(pageName) > -1){
      return page
    }
  }
  return false;
}

wx.settingPromise = getSetting();
// wx.adPromise = getAd();


var A = App;
var P = Page;

App = function (appObj) {
  wx.decorator(appObj, 'onLaunch', function (options) {
    wx.loginPromise = getUserInfo(options);
    wx.firstEnter = true;
    if (this.onLogin){
      wx.userInfo.userID ? this.onLogin(options) : wx.loginPromise.then(()=>{
        this.onLogin(options)
      })
    }
  })
  A(appObj);
  appObj = null;
}
wx._Page = P;
Page = function (pageObj,...param) {
  if (param.length > 0){
    param.forEach((source) => {
      wx.deepAssign(pageObj, source);
    })
    param = null;
  }
  var mode = pageObj.mode || 'List';
  pageObj = wx.deepAssign(new wx[mode](),pageObj);
  if (mode !== 'Base'){
    if (pageObj.data.listNav !== undefined) {
      pageObj.listName = 'baseDatas';
      pageObj.data.baseDatas = [];
      pageObj.baseDatas = [];
    }else{
      pageObj.listName = 'baseData';
      pageObj.__createRelatives(0);
    }
  }
  if (pageObj.data.footer){
    pageObj.data.footer.isFormId = true
  }
  
  wx.decorator(pageObj, 'onLoad', function (options) {
    
    if(options.decode){
      for (let key in options) {
        options[key] = decodeURIComponent(options[key]);
      }
    }
    if (this.mode !== 'Base') { 
      un(this); if (this.listName === 'baseData') this.dynamicRelative = this.data.baseData
    };
    if (this.onLogin) {
      wx.userInfo.userID ? this.onLogin(options) : wx.loginPromise.then(this.onLogin.bind(this, options));
    }
    if(this.onSetting){
      wx.setting && wx.userInfo.userID ? this.onSetting(options) : Promise.all([wx.settingPromise, wx.loginPromise]).then(this.onSetting.bind(this, options));
    }
    if (wx.firstEnter){
      delete wx.firstEnter;
      this.setData({
        ['header.firstPage'] : true
      });
    }
    if (this.data.footer && !this.data.footer.formId !== !wx.isGetFormId){
      this.setData({
        ['footer.formId']: wx.isGetFormId
      });
    }
  })
  P(pageObj);
  pageObj = null;
}