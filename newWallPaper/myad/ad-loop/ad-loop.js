var config = require("../config.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    adid: { // 广告adid
      type: String,
      value: config.adid
    },
    count: {//切换次数
      type: Number,
      value: config.count
    },
    delay: {//延迟加载时间
      type: Number,
      value: 0
    },
    min: {//时间最小值
      type: Number, String,
      value: config.min
    },
    max: {
      type: Number,
      value: config.max
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
ready(){
  if (!config.adid) return;
  setTimeout(() => {
    this.setData({
      index: 0
    })
  }, this.data.delay * 1000)

  if (wx.adSetting.isClose !== undefined) {
    return this.switchAd();
  }
  wx.adInitPromise.then(this.switchAd)
},
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
