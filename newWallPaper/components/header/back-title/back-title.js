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
    skin:{
      type:String,
      value: 'back'//
    }
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
  }
})
