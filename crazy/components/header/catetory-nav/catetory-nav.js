// components/header/base-nav-scroll/base-nav-scroll.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    current: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) {
        if (this.positionArr && this.positionArr.length) {
          this.setData({
            scrollLeft: this.positionArr[newVal]
          })
        }
        // 属性值变化时执行
      }
    },
    navArr: {
      type: Array,
      // value: [{ title: '推荐' }, { title: '新品' }],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollLeft: 0
  },
  ready() {
    wx.createSelectorQuery().in(this).selectAll('.catetory-nav__item').boundingClientRect((res) => {
      var positionArr = [];
      res.forEach((item, index) => {
        positionArr.push(item.left + (item.width - wx.windowWidth >> 1))
      });
      this.positionArr = positionArr;
      var scrollLeft = positionArr[this.data.current];
      if (scrollLeft !== this.data.scrollLeft) {
        this.setData({
          scrollLeft
        })
      }
    }).exec()
  },
  detached() {
    this.positionArr = null;
  },
  /**
   * 组件的方法列表
   */
  methods: {
    navSwitch(e) {
      var index = e.target.dataset.index;
      if (index === undefined || index == this.data.current) return;
      this.setData({
        current: index
      })
      this.triggerEvent('change', {
        current: index,
        item: this.data.navArr[index]
      });
    }
  }
})
