// components/header/back-title/back-title.js
Component({
  externalClasses: ['_class'],
  /**
   * 组件的属性列表
   */
  properties: {
    header:{
      type:Object,
      value:{
        title:'',
        backgroundColor:'',
        type:'fixed'
      }
    },
    backType:{
      type:String,
      value: 'back-3'//back-1是带圆圈的 back-2不带圆圈黑色  back-3 不带圆圈白色
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  ready() {
    if (getCurrentPages().length === 1 && this.data.backType.indexOf('back') > -1){
      this.setData({
        backType: this.data.backType + '-home'
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    back(){
      if (this.data.backType.indexOf('home') > -1){
       return wx.switchTab({
          url: '/pages/index/index',
        })
      }
      if (this.data.backType.indexOf('search') > -1) {
        return wx.navigateTo({
          url: '/pages/search/search',
        })
      }
      wx.navigateBack();
    }
  }
})
