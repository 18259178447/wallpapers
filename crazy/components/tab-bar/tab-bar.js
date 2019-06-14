// components/tab-bar/tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // selected: 0,
    color: "#515567",
    selectedColor: "#61a397",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "/assets/tab-home.png",
        selectedIconPath: "/assets/tab-home-on.png",
        text: "首页"
      },
      {
        pagePath: "pages/renling/renling",
        iconPath: "/assets/tab-rl.png",
        selectedIconPath: "/assets/tab-rl-on.png",
        text: "认领"
      },
      {
        pagePath: "pages/act/act",
        iconPath: "/assets/tab-act.png",
        selectedIconPath: "/assets/tab-home-on.png",
        text: "活动"
      },
      {
        pagePath: "pages/my/my",
        iconPath: "/assets/tab-my.png",
        selectedIconPath: "/assets/tab-my-on.png",
        text: "我的"
      },
    ]
  },
  // attached(){
  //   var index = 0;
  //   var route = getCurrentPages().slice(-1)[0].route;

  //   this.data.list.some((item,_index)=>{
  //     if (item.pagePath === route){
  //       index = _index;
  //     }
  //   })

  //   if (this.data.selected !== index){
  //     this.setData({
  //       selected:index
  //     })
  //   }

  //   console.log(getCurrentPages().slice(-1)[0].route)
  // },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      var index = e.target.dataset.index;
      wx.reLaunch({
        url: '/' + this.data.list[index].pagePath,
      })
    }
  }
})
