Page({
  interfaceName: 'CategoryContent',
  /**
   * 页面的初始数据
   */
  data: {
    header: {
      mode: 'back-search-scroll-nav',//返回搜索=滚动  双导航
      placeholdClass: 'bothHeader',//双导航样式
      'class': 'pb0',
      hasNavView: true,//是否显示滚动导航的导航下拉
      // mustShowShare: true
    },
    footer: {
      btns: ['home', 'sort', 'share'],
      extra: 'footer-sort-extra', //额外的模板   这里试排序选项显示
      sortText: ['按最新排序', '按热度排序', '按总榜排序'],//排序使用
      sortIndex: 0,//排序所以
      isSortItem: false,//是否显示排序内容
    },
    listNav: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({ categoryId = 1, currentIndex = 0 }) {
    var obj = {};
    currentIndex = +currentIndex;
    obj.currentIndex = currentIndex;
    this.listIndex = currentIndex;
    this.categoryId = categoryId;
    wx._request({
      url: 'CategoryContent',
      data: { categoryId, pageSize: 0 }
    }).then(res => {
      res = res.Data.SubArray.map(item => {
        return {
          CategoryID: item.CategoryID,
          CategoryName: item.SubName,
          CategoryIcon: item.IconUrl,
        }
      })
      obj.listNav = res;
      this.setData(obj, () => {
        //获取导航位置
        wx.getRectsLoop('.nav-item').then(res => {
          var positionArr = [];
          res.forEach((item, index) => {
            positionArr.push(item.left + (item.width - wx.windowWidth >> 1))
          });
          this.positionArr = positionArr;
          currentIndex > 1 && this.setData({
            scrollLeft: positionArr[currentIndex]
          })
        }).then(this.__loadedMore);
      });
      obj = null;
    })
  },
  __supplementParam(obj) {
    obj.categoryId = this.categoryId;
    obj.sort = this.data.footer.sortIndex + 1;
    obj.label = this.data.listNav[this.listIndex].CategoryName
    obj.needCateList = 2;
  },
  __addShare(obj) {
    obj.path = this.route + '?categoryId=' + this.categoryId + '&currentIndex=' + this.listIndex
  }
})