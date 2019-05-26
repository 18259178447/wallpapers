// components/ladloop/ladloop.js

// <ad unit-id="adunit-9765afa921fd6646"></ad>
var config = wx.adConfig;
function random(min, max) {
  return ((max - min + 1) * Math.random()) + min
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: wx.adData.banner, // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    count: {
      type: Number,
      value: config.count
    },
    delay: {
      type: Number,
      value: 0
    },
    min: {
      type: Number, String,
      value: config.min
    },
    max: {
      type: Number,
      value: config.max
    },
    hide:{
      type:Boolean,
      value:false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    index: 1
  },
  ready() {
    if (!wx.adData.banner) return;

    setTimeout(()=>{
      this.setData({
        index:0
      })
    },this.data.delay * 1000)
    if (wx.adSetting.isClose !== undefined) {
      return this.switchAd();
    }
    wx.adInitPromise.then(()=>{
      this.switchAd()
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchAd() {
      if (this.data.count == 0) return;
      if (this.data.count > 0 && !wx.adSetting.isClose) {
        var time = random(config.firstMin, config.firstMax) + this.data.delay;
        for (var i = 0; i < this.data.count; i++) {
          setTimeout(() => {
            this.setData({
              index: 1
            }, () => {
              this.setData({
                index: 0
              })
            });

          }, time * 1000)
          time = time + random(this.data.min, this.data.max);
        }
      }
    },
    adError(){
      this.setData({ index:1})
    }
  }
})