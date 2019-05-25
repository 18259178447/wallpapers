// commonPkg/pages/albumDetail/albumDetail.js
var listMinxin = require('../../utils/list-mixin');
wx.Page({
  mixins: [listMinxin],
  /**
   * 页面的初始数据
   */
  data: {
    navArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onInit({ currentIndex = 0 }) {
    if (!wx.safe) return this.selectComponent('#image-list0').init({
      interfaceName: '',
      filterFn: 'album',
      data: {
        "do": "Iad",
        m: "yj_erha"
      },
      correctData(data,obj){
        obj.LoadingText = ""
        this.hasNext = false;
        return data.DataList;
      }
    });
    currentIndex = +currentIndex;
    wx.Tool.getCatetorys().then(categorys => {
      this.setData({
        navArr: [{ title: "最新", id: 0 }].concat(categorys.mainCategorys.map(item => {
          return {
            title: item.CategoryTitle,
            id: item.CategoryID,
            image: item.Image
          }
        })),
        currentIndex
      },()=>{
        this.navChanges(currentIndex)
      })
    })
  },
  initListComponent(index) {
    this.selectComponent('#image-list' + index).init({
      interfaceName: 'AlbumList',
      filterFn:'album',
      data: {
        categoryId: this.data.navArr[index].id,
        needCateList:2
      }
    })
  },
  __addShare(obj) {
    obj.path = `${this.route}?currentIndex=${this.data.currentIndex}`;
  }
})