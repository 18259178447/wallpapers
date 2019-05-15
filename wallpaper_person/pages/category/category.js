// pages/category/category.js
Page({
  mode:'Base',
  /**
   * 页面的初始数据
   */
  data: {
    header: { mustShowShare: true, mode: 'back-search-btn' },
    mainCategorys:[],       //主导航
    subCategory:[],         //字导航
    currentIndex:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLogin: function ({ currentIndex = 0}) {
    currentIndex = +currentIndex;
    wx.Tool.getCatetorys().then(categorys=>{
      this.subCategorys = categorys.subCategorys;
      if (wx.setting.IsClose === 1) {
        var idx = 0;
        categorys.mainCategorys = categorys.mainCategorys.filter((item, index) => {
          if (item.CategoryID === 1){
            idx = index;
          }
          return item.CategoryID !== 1
        })
        this.subCategorys.splice(idx,1)
      }

      this.setData({
        mainCategorys: categorys.mainCategorys,
        subCategory: categorys.subCategorys[currentIndex],
        currentIndex
      })
    })
  },
  navSwitch: function (e) {
    var index = e.target.dataset.index;
    if(index === undefined || index == this.data.currentIndex) return;
    this.setData({
      currentIndex: index,
      subCategory: this.subCategorys[index]
    })
  },
  navgatorEvent(e){
    var index = e.target.dataset.index;
    if(index === undefined) return;
    wx.navigateTo({
      url: '/pages/categoryList/categoryList?categoryId=' + this.data.mainCategorys[this.data.currentIndex].CategoryID + '&currentIndex=' + index
    })
  }
})