// pages/catetory/catetory.js
var listMinxin = require('../../utils/list-mixin');
wx.Page({
  mixins: [listMinxin],
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
      if (categorys.mainCategorys){
        this.subCategorys = categorys.subCategorys;
        this.setData({
          mainCategorys: categorys.mainCategorys,
          subCategory: categorys.subCategorys[currentIndex],
          currentIndex
        })
      }else{
        this.setData({
          subCategory: categorys.subCategorys,
          currentIndex
        },()=>{
          this.navChanges(currentIndex)
        })
      }
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
  initListComponent(index) {
    this.selectComponent('#image-list' + index).init({
      interfaceName: '',
      data: {
        cid: this.data.subCategory[index].id,
        m: "yj_erha",
        "do": "NavWallpaper",
      }
    })
  },
  __addShare(obj){
    obj.path = `${this.route}?currentIndex=${this.data.currentIndex}`;
  }
})