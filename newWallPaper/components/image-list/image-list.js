var isFull = (wx._getSystemInfoSync ? wx._getSystemInfoSync() : wx.getSystemInfoSync()).screenHeight > 750;
const listBehavior = require('../utils/listBehavior')
Component({
  behaviors: [listBehavior],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isFull
  },
  ready(){
    if(!wx.safe){
      this.setData({
        noSafe:true
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    previewHandle(e){
      var index = e.target.dataset.index;
      if(index === undefined) return;
      wx.previewObj = {
         page:this,
         index
      }
      wx.navigateTo({
        url: '/pages/preview/preview',
      })
    }
  }
})
