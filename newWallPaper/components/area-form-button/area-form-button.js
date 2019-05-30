// components/form-button/form-button.js
Component({
  externalClasses: ['_class'],
  /**
   * 组件的属性列表
   */
  properties: {
    height:String
  },
  data:{
    isCollect:true
  },
  /**
   * 组件的初始数据
   */
  ready() {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    formSubmit(e) {
      console.log(e.detail.formId)
    }
  }
})