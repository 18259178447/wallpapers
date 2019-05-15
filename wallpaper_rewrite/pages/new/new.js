// pages/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      mode: 'back-nav-list',
      noBack:true
    },
    listNav: [
      { title: '原创', template: 'original-wallpaper-list' }, 
      { title: '壁纸', template: 'base-wallpaper-list' }, 
      { title: '专辑', defaultText: '暂无专辑', template: 'base-album-list'}
    ],
    currentIndex:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLogin: function ({ currentIndex = 1}) {




    this.listIndex = currentIndex = +currentIndex;
    if (currentIndex !== 1) this.setData({ currentIndex })
    this.__loadedMore()
  },
  onShow(){
    if(this.listIndex === 0){     
      var isUnlockObj = wx.Tool.checkIsUnlock(this.dataCache, 'dataList', true);
      isUnlockObj && this.__reSetData(isUnlockObj);
    }
  },
  __supplementParam(obj) {
    obj.userID = wx.userInfo.userID;
    if (this.listIndex === 1) {
      this.filterName = 'base';
      this.interfaceName = 'WallpaperList'
      obj.categoryID = 2;
    } else if (this.listIndex === 0) {
      this.interfaceName = 'OriginalList';
      this.filterName = 'original';
      
    } else {
      this.interfaceName = 'AlbumList';
      this.filterName = 'album';
      obj.needCateList = 2;
      obj.categoryId = 0;
    }
  },
})