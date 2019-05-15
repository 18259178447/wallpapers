// pages/catetory/catetory.js
wx.Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,
    subCategory:[],
    mainCategorys:[]
  },
  onInit({ currentIndex = 0}){
    currentIndex = +currentIndex;
    wx.Tool.getCatetorys().then(categorys=>{
      this.subCategorys = categorys.subCategorys;
      this.setData({
        mainCategorys: categorys.mainCategorys,
        subCategory: categorys.subCategorys[currentIndex],
        currentIndex
      })
    })
  },
  navSwitch: function (e) {
    var index = e.target.dataset.index;
    if (index === undefined || index == this.data.currentIndex) return;
    this.setData({
      currentIndex: index,
      subCategory: this.subCategorys[index]
    })
  },
})