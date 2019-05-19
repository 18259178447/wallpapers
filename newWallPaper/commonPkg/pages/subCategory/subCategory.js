// commonPkg/pages/albumDetail/albumDetail.js
var listMinxin = require('../../../utils/list-mixin');
wx.Page({
  mixins: [listMinxin],
  /**
   * 页面的初始数据
   */
  data: {
    navArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onInit({ id = 1, label ="推荐" }) {
    if (!wx.safe) return this.backHome();
    id = +id;
    this.categoryId = id;
    this.label = label;
    var currentIndex = 0;
    wx.Tool.getCatetorys().then(categorys => {
      var { mainCategorys, subCategorys } = categorys,subCategoryIndex = 0;
      mainCategorys.some((item,index)=>{
         let b = item.CategoryID === id;
         if (b) subCategoryIndex = index;
         return b;
      });
      this.setData({
        navArr: subCategorys[subCategoryIndex].map((item,index) => {
          if (item.SubName === label) currentIndex = index;
          return {
            title: item.SubName,
            id: item.SubID
          }
        }),
        currentIndex
      }, () => {
        this.navChanges(currentIndex)
      })
    })
  },
  initListComponent(index) {
    this.selectComponent('#image-list' + index).init({
      interfaceName: 'CategoryContent',
      data: {
        label: this.data.navArr[index].title,
        needCateList: 2,
        sort:1,
        categoryId: this.categoryId
      }
    })
  }, 
  __addShare(obj) {
    obj.path = `${this.route}?id=${this.categoryId}&label=${this.label}`;
  }
})