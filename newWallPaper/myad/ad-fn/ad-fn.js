// components/myAd/ad-fn/ad-fn.js
require('../adManage.js')
var {adData} = require("../config.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: 'download'
    },
    viewTip: {
      type: String,
      value: '就可以下载壁纸啦'
    },
    tip: {
      type: String,
      value: '解锁成功！请继续下载壁纸吧'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    adType: 0, // 1 banner广告 2 普通小程序
    banner: '',
    isHide: true,
    adIndex: 0
  },
  ready() {
    wx.adInitPromise.then(this.init.bind(this))
  },
  detached() {
    this.loaded = this.callback = null;
  },
  pageLifetimes: {
    show() {
      if (!this.data.isHide && this.startTime) {
        var viewTime = Date.now() - this.startTime;
        if (this.data.adType === 2){
          let isUnlock = viewTime / 1000 > this.data.mini.viewTime;
          if(isUnlock){
            wx.todayAction(this.data.name).next();
            this.loaded[2] = adData.minis && adData.minis.length ? true : false;
            this.setData({
              mini:null
            })
          }else{
          return  wx.showModal({
              title: '提示',
              content: `需要体验${this.data.mini.viewTime}秒哦`,
            })
          }
        }
        this.startTime = 0;
        this.callback ? this.callback() : this.adSuccess()
        this.closeAd()
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    openAd(key, next, success) {

      var action = wx.todayAction(this.data.name);
      // this.callback = callback;
      // var adLimit = wx.AdLimit(this.data.name);
      if (wx.isVerify) return next();
      var actionSuccess = action.done(key);
      // var isLimit = key ? adLimit.isLimitByKey(key) : adLimit.isLimit;
      //可以做此次动作,没有碰到断点
      if (actionSuccess) return next();

      if (this.loaded[0]) {//banner广告有的话
        this.setData({
          isHide: false,
          adType: 1
        })
      } else if (this.loaded[1]) {//留给小盟广告

      } else if (this.loaded[2]){
        let obj = {
          isHide: false,
          adType: 2
        }
        if (!this.data.mini) {
          obj.mini = adData.minis.pop();
        }
        this.setData(obj)        
      }
      else {
        next();
        success = null;
      }
      if (success) this.callback = success;
    },

    init() {
      if (wx.isVerify) return;
      var action = wx.todayAction(this.data.name);
      action.setBreakPoint([1,2,4]);
      // var adLimit = wx.AdLimit(this.data.name, wx.adSetting.threshold, wx.adSetting.every);
      this.loaded = [];
      if (adData.banner) {
        this.setData({
          banner: adData.banner,
          adType: 1
        })
      }
      if (adData.minis && adData.minis.length){
        this.loaded[2] = true; 
      }
    },
    adLoad() {
      console.log('加载了banner')
      this.loaded[0] = true;
    },
    adError() {
      this.loaded[0] = false;
      console.log('错误了banner')
    },
    adClick(e) {
      this.startTime = Date.now();
      // wx.AdLimit(this.data.name).remainCount++;
      wx.todayAction(this.data.name).next()
    },
    adMiniClick() {
      var _this = this;
      wx.navigateToMiniProgram({
        appId: this.data.mini.appid,
        success() {
          _this.startTime = Date.now();
        }
      })
    },
    closeAd(flag) {
      this.callback = null;
      this.setData({
        isHide: true,
        adIndex: 1
      }, () => {
        this.setData({
          adIndex: 0
        })
      });
    },
    adSuccess() {
      wx.showModal({
        title: '恭喜',
        content: this.data.tip,
        showCancel: false,
      });
    },
    adFail() {
      wx.showModal({
        title: '提示',
        content: '操作失败',
        showCancel: false,
      });
    }
  }
})