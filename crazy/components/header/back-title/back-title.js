// components/header/back-title/back-title.js
Component({
  externalClasses: ['_class'],
  /**
   * 组件的属性列表
   */
  properties: {
    fixed: Boolean,
    hideback:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    backHandle(){
      if(getCurrentPages().length > 1){
        wx.navigateBack()
      }else{
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
    }
  }
})
