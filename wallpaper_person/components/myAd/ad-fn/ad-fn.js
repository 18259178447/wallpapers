// components/myAd/ad-fn/ad-fn.js
require('../adManage.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    preload:{
      type:Boolean,
      value:true
    },
    name:{
      type:String,
      value:'download'
    },
    viewTip:{
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
    adType:0, //0视频广告 1 banner广告 2 普通小程序
    banner:'',
    isHide:true,
    adIndex:0
  },
  ready(){
    if (wx.adSetting.isClose !== undefined){
      return this.init();
    }
    wx.adInitPromise.then(this.init)
  },
  detached(){
    this.videoPromise = this.videoAd = this.loaded = this.callback = null;
  },
  pageLifetimes: {
    show() {
      if (!this.data.isHide && wx.AdLimit(this.data.name).remainCount > 0) {
        this.callback ? this.callback() : this.adSuccess()
        this.closeAd()
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    checkUnlock(key){
      var adLimit = wx.AdLimit(this.data.name);
      if (wx.adSetting.isClose !== 0) return false;
      var isLimit = key ? adLimit.isLimitByKey(key) : adLimit.isLimit;
      if (!isLimit) return false
      if (this.videoAd && adLimit.info.videoViewCount < wx.adSetting.videoCount && adLimit.count >= wx.adSetting.videoThreshold) {
         return true;          
      } else{
        return false;
      }
    },
    openAd(key, next,success){
      // this.callback = callback;
      var adLimit = wx.AdLimit(this.data.name);
      if (wx.adSetting.isClose !== 0) return next();
      var isLimit = key ? adLimit.isLimitByKey(key) : adLimit.isLimit;
      if (!isLimit) return next(), this.reportAd(key);
      if (this.videoAd && adLimit.info.videoViewCount < wx.adSetting.videoCount && adLimit.count >= wx.adSetting.videoThreshold){

        wx.showLoading({
          title: '请稍后...',
          mask: true
        })
        this.videoPromise.then(res => {
          wx.hideLoading()
          this.videoAd.show()
        }).catch(e=>{
          wx.hideLoading();
          try {
            this.videoAd.offError();
            this.videoAd.offClose();
          } catch (e) { }
          this.videoAd = null;
          this.videoPromise = null;
          this.openAd(key, next, success)
        })
      } else if (this.loaded[1]){
        this.setData({ isHide: false, adType: 1 })
      } else if (this.loaded[2] && !this.miniClick) {
        let obj = { isHide: false, adType: 2}
        if(!this.data.mini){
          obj.mini = wx.adData.mini;
        }
        this.setData(obj)
      }else{
        next();
        success = null;
      }
      if (success) this.callback = success;
    },

    init(){
      if (wx.adSetting.isClose) return this.triggerEvent('video', 0);;
      var adLimit = wx.AdLimit(this.data.name, wx.adSetting.threshold, wx.adSetting.every);
      var videoViewCount = adLimit.info.videoViewCount || (adLimit.info.videoViewCount =  0);
      this.loaded = [];
      var adData = wx.adData;
      if (videoViewCount < wx.adSetting.videoCount && adData.video && wx.createRewardedVideoAd){
        this.initVideo()
      }else{
        this.triggerEvent('video', 0);
      }
      if (adData.banner){
        this.setData({
          banner: adData.banner,
          adType:1
        })
      }
      if (adData.mini){
        this.loaded[2] = true;
      }
    },
    initVideo(){
      var videoAd = wx.createRewardedVideoAd({
        adUnitId: wx.adData.video
      });
      this.videoPromise = videoAd.load().then(res=>{
        this.triggerEvent('video', 1);
        return res;
      });
      videoAd.onError(() => {
        this.triggerEvent('video', 0);
        try {
          this.videoAd.offError();
          this.videoAd.offClose();
        }catch(e){}
        this.videoAd = null;
        this.videoPromise= null;
      })
      videoAd.onClose((status)=>{
         if(status && status.isEnded || status === undefined){
           var adLimit = wx.AdLimit(this.data.name);
           adLimit.info.videoViewCount++;
           adLimit.remainCount++;
           this.triggerEvent('video',0);
           this.callback ? this.callback() : this.adSuccess()
         }else{
           this.adFail()
         }
      })
      this.videoAd = videoAd;
    },
    adLoad() {
      console.log('加载了banner')
      this.loaded[1] = true;
    },
    adError() {
      this.loaded[1] = false;
      console.log('错误了banner')
    },
    adClick(e) {
      wx.AdLimit(this.data.name).remainCount++;
    },
    adMiniClick(){
      var _this = this;
      wx.navigateToMiniProgram({
        appId: this.data.mini.appid,
        success() {
          _this.miniClick = true;
          wx.AdLimit(_this.data.name).remainCount++;
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
    adSuccess(){
      wx.showModal({
        title: '恭喜',
        content: this.data.tip,
        showCancel: false,
      });
    },
    adFail(){
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
