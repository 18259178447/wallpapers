// components/back-btn/back-btn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    skin:{
      type:String,
      value:"back"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready() {
    if (getCurrentPages().length === 1) {
      this.setData({
        skin: this.data.skin + '-home'
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    back() {
      if (this.data.skin.indexOf('home') > -1) {
        return wx.switchTab({
          url: '/pages/index/index',
        })
      }
      wx.navigateBack();
    }
  }
})
