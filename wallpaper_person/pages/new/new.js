// pages/new/new.js
Page({
  interfaceName: "CategoryContent",
  /**
   * 页面的初始数据
   */
  data: {
    header: {
      mode: 'back-search-scroll-nav',//返回搜索=滚动  双导航
      placeholdClass: 'bothHeader',//双导航样式
      'class': 'pb0',
      hasNavView: true,//是否显示滚动导航的导航下拉
      mustShowShare: true
    },
    listNav: [
      // { title: '清新可爱', categoryId:14 },
      // { title: '美女车模', categoryId:1},
      // { title: '明星写真', categoryId:2},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLogin: function ({ currentIndex = 0 }) {
    var obj = {};
    currentIndex = +currentIndex;
    // obj.currentIndex = currentIndex;
    this.listIndex = currentIndex;
    wx.Tool.getCatetorys().then(categorys => {
      obj.listNav = categorys.mainCategorys.map(item => {
        return {
          CategoryID: item.CategoryID,
          CategoryIcon: item.Image,
          CategoryName: item.CategoryTitle,
        }
      });
      this.setData(obj, () => {
        //获取导航位置
        wx.getRectsLoop('.nav-item').then(res => {
          var positionArr = [];
          res.forEach((item, index) => {
            positionArr.push(item.left + (item.width - wx.windowWidth >> 1))
          });
          this.positionArr = positionArr;
          currentIndex > 1 && this.setData({
            scrollLeft: positionArr[currentIndex],
            currentIndex
          })
        });
        this.__loadedMore()
      });
      obj = null;
    })
    wx.settingPromise.then((e) => {
      if (!e.noQuiz) this.setData({ istoQuiz: true })
    })
  },
  closeQuiz() {
    this.setData({ istoQuiz: false })
  },
  adError(e) {
    console.log(e)
  },
  __supplementParam(obj) {
    
    obj.categoryId = this.data.listNav[this.listIndex].CategoryID;
    obj.sort = 1;
    obj.label = '推荐';
    obj.needCateList = 2;
  },
  __addShare(obj) {
    obj.path = this.route + '?currentIndex=' + this.listIndex
  }
})