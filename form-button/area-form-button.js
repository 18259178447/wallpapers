// components/form-button/form-button.js
import FormIdManage from './formIdManage';
Component({
  externalClasses: ['_class'],
  /**
   * 组件的属性列表
   */
  properties: {
    height:String,
    minHeight:{
      type:String,
      value:0
    }
  },
  /**
   * 组件的初始数据
   */
  ready() {
    if(!this.data.height){
      this.getHeight()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    formSubmit(e) {
      FormIdManage.add(e.detail.formId);
    },
    getHeight() {
      var query = wx.createSelectorQuery().in(this);
      query.select('.content').boundingClientRect(rect => {
        var height = rect.height + 'px';
        if (height !== this.data.height || rect.height === 0) {
          rect.height && this.setData({
            height
          })
          setTimeout(()=>{
            this.getHeight();
          },500)
        }
        query = rect = null;
      }).exec()
    }
  }
})