// components/footer/footer-box/footer-box.js
// 简单识别全屏
var isFull = (wx._getSystemInfoSync ? wx._getSystemInfoSync() : wx.getSystemInfoSync()).screenHeight > 750;

Component({
  externalClasses: ['_class'],
  /**
   * 组件的属性列表
   */
  properties: {
    placehold:String //占位高度
  },

  /**
   * 组件的初始数据
   */
  data: {
    isFull
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
