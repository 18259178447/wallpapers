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
  onLoad: function ({ currentIndex = 0}) {
    currentIndex = +currentIndex;
    var categorys = wx._getStorageSync('categorys')
    if (categorys){
      this.categorysStrJson = JSON.stringify(categorys);
      this.setData({
        mainCategorys: categorys.mainCategorys,
        subCategory: categorys.subCategorys[currentIndex],
        currentIndex
      }, this.updateData)
      this.subCategorys = categorys.subCategorys;
    }else{
      this.updateData(currentIndex);
    }
  },
  updateData(currentIndex){
    currentIndex = currentIndex || this.data.currentIndex
    wx._request({
      url: 'Categorys',
    }).then(data => {
      var subCategorys = [], categorys;//子分类
      data = data.Data.DataList.map(item => {
        if (item.CategoryID === 133 || item.CategoryID === 102){
          subCategorys.push(item.SubArray.map(subItem => {
            var { SubID, IconUrl, SubName, BigImgUrl } = subItem;
            return {
              SubID,
              IconUrl,
              SubName,
              appid: item.CategoryID === 133 ? 'wxf9154a17aa287e15' : 'wxb66c141ee02a4eb4',
              path: item.CategoryID === 133 ? (SubID ? `pages/index/index?StyleID=${SubID}&StyleName=${SubName}&CategoryID=133&StyleImg=${BigImgUrl}` : '') : 'pages/category/category?index=0&ID=' + SubID
            };
          }))
        }else{
          subCategorys.push(item.SubArray.map(subItem => {
            return {
              SubID: subItem.SubID,
              IconUrl: subItem.IconUrl,
              SubName: subItem.SubName,
            };
          }))
        }
        delete item.Count;
        delete item.SubArray;
        return item;
      });
      categorys = {
        mainCategorys: data,
        subCategorys,
      }
      if (!this.categorysStrJson || this.categorysStrJson !== JSON.stringify(categorys)){
        this.setData({
          mainCategorys: data,
          subCategory: subCategorys[currentIndex],
          currentIndex
        },()=>{
          wx._setStorage({
            key: 'categorys',
            data: categorys,
          })
        })
      }
      this.subCategorys = subCategorys;
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
      url: '/packageA/pages/pageLists/pageLists?pagename=categoryList&categoryId=' + this.data.mainCategorys[this.data.currentIndex].CategoryID + '&currentIndex=' + index
    })
  }
})