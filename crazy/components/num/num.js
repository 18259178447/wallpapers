// components/num/num.js
Component({
  externalClasses: ['_class'],
  behaviors: ['wx://form-field'],
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 0, // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    type: {
      type: Number, 
      value: 1,
    },
    max:{
      type: Number,
      value:9999,
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
    changeHandle(e){
      var num = this.data.value + e.target.dataset.num;
      this.setData({ value: num })
      this.triggerEvent('change', { value: num });
    }
  }
})
