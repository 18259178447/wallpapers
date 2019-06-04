// components/myAd/ad-fn/ad-fn.js
require('../adManage.js')
var adData = require("../data.js");
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
      value: '点击广告后下载壁纸'
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
          let isUnlock = viewTime / 1000 > adData.mini.viewTime;
          if(isUnlock){
            wx.AdLimit(this.data.name).remainCount++;;
          }else{
          return  wx.showModal({
              title: '提示',
              content: `需要体验${adData.mini.viewTime}秒哦`,
            })
          }
        }
        this.startTime = 0;
        this.callback ? this.callback() : this.adSuccess()
        this.closeAd(1)
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    checkUnlock(key) {
      var adLimit = wx.AdLimit(this.data.name);
      if (wx.adSetting.isClose !== 0) return false;
      var isLimit = key ? adLimit.isLimitByKey(key) : adLimit.isLimit;
      if (!isLimit) return false
      return false;
    },
    openAd(key, next, success) {
      // this.callback = callback;
      var adLimit = wx.AdLimit(this.data.name);
      if (wx.adSetting.isClose !== 0) return next();
      var isLimit = key ? adLimit.isLimitByKey(key) : adLimit.isLimit;
      if (!isLimit) return next(), this.reportAd(key);
      if (this.loaded[0]) {
        this.setData({
          isHide: false,
          adType: 1
        })
      } else if (this.loaded[1]) {
        let obj = {
          isHide: false,
          adType: 2
        }
        if (!this.data.mini) {
          obj.mini = wx.adData.mini;
        }
        this.setData(obj)
      } else {
        next();
        success = null;
      }
      if (success) this.callback = success;
    },

    init() {
      if (wx.adSetting.isClose) return;
      var adLimit = wx.AdLimit(this.data.name, wx.adSetting.threshold, wx.adSetting.every);
      this.loaded = [];
      var adData = wx.adData;
      if (adData.banner) {
        this.setData({
          banner: adData.banner,
          adType: 1
        })
      }
      if (adData.mini) {
        this.loaded[1] = true;
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
      wx.AdLimit(this.data.name).remainCount++;
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
      if (flag !== 1) {
        if (wx.AdLimit(this.data.name).remainCount > 0) {
          this.adSuccess()
        }
      }
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
    },
    reportAd(key) {
      if (wx.adSetting.isClose) return;
      var adLimit = wx.AdLimit(this.data.name);
      // if (adLimit.remainCount > 0) {
      key ? adLimit.countByKey(key) : (adLimit.currentCount++);
      // }
    },
  }
})