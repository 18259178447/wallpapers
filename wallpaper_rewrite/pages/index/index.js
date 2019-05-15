import filter from '../../utils/filter'
Page({
  mode:'List',// List有列表的时候 Base无列表
  interfaceName: 'WallpaperList',
  /**
   * 页面的初始数据
   */
  data: {
    header: { mustShowShare: true, mode: 'back-search-btn' },
    swiper:null,
    swiperIndex:0,
    nav:null,
    hotAlbum:null,
    hotDynamic:null,
    authorColumn:null,
    dynamicWallpaper:null,
    listNav:[],//有这个属性时开启多列表
    isCrossPos:false
  },
  onLoad(options){

    // console.log(wx.adad && wx.adad.load().catch(e => { console.log(123456789) }), 6565656)
    let videoAd = wx.createRewardedVideoAd({

      adUnitId: 'adunit-b0682cfe132cc9e8'
    })
    videoAd.load()
      .then((res) => {
        console.log(videoAd.isReady(), 333)
        return videoAd.show()
      })
      .catch(err => console.log(err.errMsg, 987654))

    // videoAd.onError((e) => { console.log(e) })

    // videoAd.onClose((e) => {
    //   console.log(e)
    // })
    // wx.adad = videoAd;
    // let videoAd = wx.createRewardedVideoAd({

    //   adUnitId: 'adunit-b0682cfe132cc9e8'
    // })
    // console.log(videoAd === wx.createRewardedVideoAd({

    //   adUnitId: 'adunit-b0682cfe132cc9e8'
    // }),33)
    // videoAd.load()
    //   .then((res) => {
    //     console.log(videoAd.isReady(), 333)
    //     return videoAd.show()
    //   })
    //   .catch(err => console.log(err.errMsg))
      
    // videoAd.onError((e) => { console.log(e) })
    
    var currentIndex = +options.currentIndex || 0,
    obj = { currentIndex };
    this.listIndex = currentIndex;
    this.__loadUpperPart(obj);
    obj = null;
  },
  onShow(){
    // 如果有临时解锁的壁纸,检查作者专栏是否要更新
    var isUnlockObj = wx.Tool.checkIsUnlock(this.authorColumnWallpaper,'authorColumn.wallpapers',true);
    isUnlockObj && this.setData(isUnlockObj);
  },
  //请求上半部分
  __loadUpperPart(obj){
    var count = 0;
    this.isLoading = true;
    wx._request({
      url: 'SelectionList',
    }).then(res => {
      res = res.Data;
      obj.swiper = parseSwiper(res.CarouselArray);
      obj.hotAlbum = parseHotAlbum(res.AlbumArray);
      obj.dynamicWallpaper = parseDynamicWallpaper(res.MotionVideo);
      obj.hotDynamic = parseHotDynamic(res.TopicResultInfo || res.HotTrendsArray, res.BrandObj);
      obj.authorColumn = parseAuthorColumn.call(this,res.OriginalColumn);
      obj.muduleSort = res.PageSort.split(',').map(item => {
        switch (item) {
          case "1":
            item = "hot-album"
            break;
          case "2":
            item = "dynamic-wallpaper"
            break;
          case "3":
            item = "hot-dynamic"
            break;
          case "4":
            item = "author-column"
            break;
        }
        return item;
      })
      obj.listNav = res.NavigationList.map(item=>{
        if (item.CategoryName === '主题套图' || item.CategoryName === '天生一对'){
          item.diffPos = true;
        }
        return item;
      })
      count++;
      if (count === 2) this.setData(obj, this.__loadDownPart)
    }).catch(e=>{
      console.log(e)
    })
    wx.adPromise.then(res=>{
      obj.nav = res['10001'];
      count++;
      if (count === 2) this.setData(obj, this.__loadDownPart)
    })
  },
  //请求下半部分
  __loadDownPart(){
    //设置悬浮导航观察点
    wx.getRectsLoop('.follow-nav-container,.header').then(rect => {
      this.observePos = rect[0].top - rect[1].height;
    })
    //获取导航位置
    wx.getRectsLoop('.nav-item').then(res => {
      var positionArr = [];
      res.forEach((item, index) => {
        positionArr.push(item.left + (item.width - wx.windowWidth >> 1))
      });
      this.positionArr = positionArr;
    });
    this.isLoading = false;
    this.__loadedMore();
  },
  //轮播切换
  swiperChange(e){
    this.setData({
      swiperIndex: e.detail.current
    })
  },
  //换一换按钮
  changeData(e){
    if (this.isLoading) return;
    this.isLoading = true;
    var _type = e.currentTarget.dataset.type;
    wx._request({
      url: _type == 1 ? 'hotDynamic' : (_type == 2 ? 'authorColumn':'dynamicWallpaper')
    }).then(res => {
      var obj = {};
      if (_type == 1) {
        obj.hotDynamic = parseHotDynamic(res.Data)
      } else if (_type == 2) {
        obj.authorColumn = parseAuthorColumn.call(this,res.Data.DataList);
      }else{
        obj.dynamicWallpaper = parseDynamicWallpaper(res.Data);
      }
      this.setData(obj)
      this.isLoading = false;
    }).catch(e => {
      console.log('换一换错误')
      this.isLoading = false;
    })
  },
  //点击列表导航
  navSwitch(e){
    var index = e.target.dataset.index, 
      obj = { currentIndex : index };
    if (index === this.data.currentIndex || index === undefined) return;
    this.dynamicRelative.scrollTop = this.scrollPos;
    this.listIndex = index;
    obj.isHideBackTop = this.isHideBackTop;
    if (this.positionArr) {
      obj.scrollLeft = this.positionArr[index];
    }
    obj.toScollTop = this.dynamicRelative.scrollTop < this.observePos ? this.observePos : this.dynamicRelative.scrollTop;
    this.setData(obj);
    if (this.dataList.length === 0) {
      this.__loadedMore();
    }
  },
  //点击作者专栏图片
  oriPreview(e) {
    wx.page = {
      hasNext: false,
      dataCache: this.authorColumnWallpaper
    };
    wx.navigateTo({
      url: '/pages/preview/preview?index=' + e.currentTarget.dataset.index
    })
  },
  videoPreview(e){
    if (e.target.dataset.index === undefined) return;
    wx.page = {
      hasNext: false,
      dataCache: this.data.dynamicWallpaper
    };
    wx.navigateTo({
      url: '/pages/preview/preview?index=' + e.target.dataset.index
    })
  },
  backTop() {
    this.sectionIndex = 0;
    this.__reSetData({
      paddingTop: 0,
      beforeIndex: -1 * this.every,
      afterIndex: 2 * this.every,
      toScollTop: 0
    })
  },
})



function parseSwiper(data){
  return data.map(item => {
    var { AlbumId, DataType, ImgUrl, Title, ContentUrl, ID } = item, url = '', obj;
    obj = {
      jumpType: 'navigateTo',
      ImgUrl
    }
    switch (DataType) {
      case 1:
        url = '/pages/albumDetail/albumDetail?albumID=' + AlbumId;
        break;
      case 3:
        url = '/packageB/pages/web/web?url=' + ContentUrl;
        break;
      default:
        url = ContentUrl;
        obj.appid = ID;
        obj.jumpType = 'miniProgram'
    }
    obj.url = url;
    return obj;
  })
}
function parseHotAlbum(data) {
  return data.map(item => {
    var { AlbumID, AlbumType, AlbumName, ImgUrl } = item, url = '';
    switch (AlbumType) {
      case 1: url = '/pages/albumDetail/albumDetail?albumID=' + AlbumID; break;
      case 2: url = '/packageC/pages/officeNotes/officeNotes?albumID=' + AlbumID; break;
      case 3:
      case 4: url = '/packageA/pages/topicDetail/topicDetail?topicID=' + AlbumID; break;
    }
    return {
      AlbumName,
      url,
      ImgUrl
    }
  })
}
function parseDynamicWallpaper(data){
  return data.map(item=>{
      return {
        Image: item.Image,
        PicInfoID: item.PicInfoID,
        VideoUrl: item.VideoUrl,
        ThumbImage: item.ThumbImage,
        Labels: item.Labels
      }
  })
}

function parseHotDynamic(data, BrandObj) {
  if (!data) return []
  if (data.TypeID) {
    if (BrandObj) {
      data.Icon = BrandObj.Icon;
      data.OfficialIcon = BrandObj.OfficialIcon;
    }
    return data;
  }
  var { ObjTopicPartPicResultInfo: { Thumb } } = data;
  delete data.ObjTopicPartPicResultInfo;
  data.Thumb = Thumb;
  return data
}
function parseAuthorColumn(data) {
  var { AuthorObject: { AuthorName, AuthorDesc, AuthorID, AuthorAvatarUrl, AuthorMotto }, MiniOriginalWallpaperInfoArray } = data;
  var rewardStr = wx.Toggle('rewardStr');
  this.authorColumnWallpaper = MiniOriginalWallpaperInfoArray;
  return {
    AuthorName,
    AuthorDesc,
    AuthorAvatarUrl,
    AuthorMotto,
    url: '/packageB/pages/authorHome/authorHome?authorid=' + AuthorID,
    wallpapers: filter.original(MiniOriginalWallpaperInfoArray)
  }
}