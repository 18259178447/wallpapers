// pages/preview/preview.js

var shareTitles = ['一万句我爱你，不如一句在一起。', '星星跳进你的眼睛 听过的爱你从没这么坚定', '你应该是一场梦，我应该是一阵风。'];
import Draw from '../../common/draw';
var Color = require('../../common/color');
Page({
  /**
   * 页面的初始数据
   */
  interfaceName: 'WallpaperRelate',
  data: {
    imgs:[],
    scrollTops:[],
    current: 0,
    currentIndex: 0,
    circular: true,
    tpl: 'wallpaper',
    header:{
      'class': 'transparent',
      backClass:'white',
      title:''
    },
    footer:{
      btns: ['home', 'collect', 'download','share'],
      isCollected:false,
      mode:'empty'
    },
    isWifi:true,
    isPlayVideo:false,
    rewardWallPaper:null,//分享奖励壁纸
    adIndex:0,
    bottomType:-1,//-1不显示  0解锁 1下载
  },
  /**
   * 生命周期函数--监听页面加载、
   */
  onSetting: function ({ scene, index = 0, suffix = 'bz' }) {
    wx.showLoading({ title: '请稍候...', mask: true });
    this.adCom = this.selectComponent('#ad-fn');
    this.collectData = wx._getStorageSync('collectData') || [];
    this.collectIds = this.collectData.map(item=>{
      return item.PicInfoID
    })
    if (scene){
      let [id, isPay = 0, suffix = 'bz', isUserUpload = 0] = scene.split('_');
     return wx._request({
        url: suffix === 'bz' ? 'WallpaperInfo' : 'EmojiPortraitInfo',
        data: suffix === 'bz' ? { picID: id, isPay, isUserUpload } : { ID: id}
      }).then(res=>{
        wx.page = {dataCache: [res.Data]}
        this.onSetting({
          suffix
        })
      }).catch(e=>{
        wx.showModal({ title: '提示', content: '壁纸不存在', showCancel: false, confirmText: '返回首页', success(res) { wx.switchTab({ url: '/pages/index/index' }) } })
      })
    }
    index = +index;
    var obj = {}, 
        page = wx.page,
        current = index % 3,
        start = Math.max(0,index - 1),
        imgs = null;
    if (current) obj.current = current, obj.currentIndex = current;
    //如果小于等于三个  
    if (page.dataCache.length <= 3) imgs = page.dataCache;
    else{//大于三张图片的情况
      imgs = page.dataCache.slice(start, index + 2);
      //如果点击了最后一张
      if (index + 1 === page.dataCache.length) imgs.push(page.dataCache[0]);
      if (!start) obj.circular = false;
      if (current === 0 && imgs.length === 3){
        imgs.push(imgs.shift())
      } else if (current === 2){
        imgs.unshift(imgs.pop());
      }
    }
    this.suffix = suffix;
    checkImage(imgs[current], this, obj);//判断是否解锁
    
    obj.imgs = parses(imgs);

    
    obj.tpl = suffix === 'bz' ? (imgs[current].VideoUrl ? 'dynamic-wallpaper' : 'wallpaper') : 'emote-avatar';
    if (suffix === 'tx') obj.diyLink = true;
    if (obj.tpl === 'dynamic-wallpaper'){
      obj['header.class'] = '';
      obj['header.backClass'] = '';
      obj['header.title'] = '动态壁纸';
      wx.getNetworkType({
        success: (res) => {
          if (res.networkType !== 'wifi') this.setData({
            isWifi: false
          })
        }
      })
    }
    this.setData(obj);
    this.page = page;
    this.dataIndex = index;
    obj = null;
    if (shareTitles.length < 10){
      wx._request({
        url: 'https://miniemoji.313515.com/List/RandomSignList',
        data: { pagesize: 10 }
      }).then(res => {
        shareTitles = res.Data;
      })
    }
  },
  swiperChange(e) {
    var currentIndex = e.detail.current,
      preCurrentIndex = this.data.currentIndex,
      direct = currentIndex - preCurrentIndex,
      obj = { currentIndex },
      page = this.page,
      isLoadMore = false;
    direct = direct === 1 || direct === -2 ? 1 : -1
    this.dataIndex += direct;
    if (this.dataIndex === 0 && page.hasNext){
      obj.circular = false;
      return this.setData(obj)
    }
    if (!this.data.circular){
      obj.circular = true;
    }
    if (this.data.isPlayVideo) obj.isPlayVideo = false
    if (direct === 1){
      if (this.dataIndex === page.dataCache.length) this.dataIndex = 0;
      obj[`imgs[${(currentIndex + 1) % 3}]`] = parse(page.dataCache[this.dataIndex + 1] || page.dataCache[0]);
      if (page.hasNext && page.dataCache.length - this.dataIndex < 3) isLoadMore = true
    }else{
      if (this.dataIndex === -1) this.dataIndex = page.dataCache.length - 1;
      obj[`imgs[${(currentIndex + 2) % 3}]`] = parse(page.dataCache[this.dataIndex - 1] || page.dataCache[page.dataCache.length - 1]);
    }
    wx.showLoading({ title: '请稍候...', mask: true });
    checkImage(page.dataCache[this.dataIndex], this, obj);//判断是否解锁
    if (this.dataList.length > 0) {
      this.pageIndex = 0;
      this.hasNext = !0;
      obj.dataList = [];
      obj.LoadingText = wx.loadingTipText.loading;
      obj[`scrollTops[${preCurrentIndex}]`] = 0.01;
    }
    // console.log(direct, obj, this.dataIndex + 1)
    // wx.showLoading({ title: '请稍后...', mask: true });
    if (isLoadMore){
      // wx.showLoading({ title: '加载中...', mask: true });
      this[obj.dataList ? '__reSetData' : 'setData'](obj,()=>{
        page.__loadedMore().then(wx.hideLoading)
      })
    }else{
      this[obj.dataList ? '__reSetData' : 'setData'](obj,()=>{
        setTimeout(wx.hideLoading,150)
      })
    }
  },
  previewImage() {
    return;
    var dataItem = this.page.dataCache[this.dataIndex]
    if (this.data.tpl === 'dynamic-wallpaper') {
      // this.videoContext.play();
      return this.setData({
        isPlayVideo: true
      })
    }
    if (!dataItem.isLock) {
      wx.previewImage({
        urls: [dataItem.Image]
      })
    }
  },
  videoEnd() {
    this.setData({
      isPlayVideo: false
    })
  },
  // 收藏
  collectHandle(){

    // this.collectData = wx._getStorageSync('collectData') || [];
    // this.collectIds = this.collectData.map(item => {
    //   return item.PicInfoID
    // })
    if (this.isLoading) return;
    this.isLoading = true;
    var dataItem = this.page.dataCache[this.dataIndex],
      isCollected = this.data.footer.isCollected,
      obj = {};
      wx.msg(isCollected ? '取消收藏成功' : '收藏成功');
    if (isCollected){
      var index = this.collectIds.indexOf(dataItem.PicInfoID);
      this.collectData.splice(index,1);
      this.collectIds.splice(index,1);
    }else{
      this.collectData.unshift(dataItem);
      this.collectIds.unshift(dataItem.PicInfoID);
      if (this.collectIds.length > 100){
        this.collectData.pop();
        this.collectIds.pop();
      }
    }
    this.setData({
      'footer.isCollected': !isCollected
    },()=>{
      this.isLoading = false
    })
  },
  // onShow() {
  //   if (this.data.isShowFreeUnlock && wx.AdLimit('downloadCount').remainCount > 0) {
  //     this.closeFreeUnlock();
  //     wx.showModal({
  //       title: '解锁成功',
  //       content: '继续下载壁纸吧！',
  //       showCancel: false,
  //     });
  //   }
  // },
  // closeFreeUnlock() {
  //   this.setData({
  //     isShowFreeUnlock: false,
  //     adIndex: 1
  //   },()=>{
  //     this.setData({
  //       adIndex:0
  //     })
  //   });
  // },
  // adClick(){
  //   wx.AdLimit('downloadCount').remainCount++;
  //   if (wx.appid){
  //     wx.reportAnalytics('appidclick', {
  //       appid: wx.appid,
  //     });
  //   }
  //   console.log('点击了广告')
  // },
  // adLoad(){
  //   this.isAdLoad = true;
  // },
  // adError(e){
  //   console.log(e)
  // },
  unlock(){
    var dataItem = this.page.dataCache[this.dataIndex];
    this.adCom.openAd(dataItem.PicInfoID,()=>{});
  },
  downloadInit(){
    // if (wx.setting.LimitCount === undefined) return;
    var dataItem = this.page.dataCache[this.dataIndex];
    // if (this.isAdLoad && !wx.setting.IsClose){
    //   var adLimit = wx.AdLimit('downloadCount', 1,1);
    //   if (adLimit.isLimitByKey(dataItem.PicInfoID)){
    //     return this.setData({
    //       isShowFreeUnlock: true,
    //     })
    //   }
    // }

  // 新的规则
  //   LimitCount 代表从第几张开始限制 0表示关闭下载限制
  //   AdPopupCount 代表每几张限制一次 0代表只限制一次
  //   比如
  //   LimitCount = 1 AdPopupCount=2  从第一张开始，每两张点击一次广告，既第1 3 5 7 9...张需要点击广告
  //   LimitCount = 1 AdPopupCount=0 表示现在线上使用的规则 第一张开始限制，点击一次后不再不需要点击

    // if (wx.setting.LimitCount !== undefined && this.isAdLoad){
    //   if (dayLimit.isExceedByKey(dataItem.PicInfoID)) {
    //     return this.setData({
    //       isShowFreeUnlock: true,
    //     })
    //   }
    // }
    // this.downloadHandle(dataItem, this.isAdLoad)
    this.selectComponent('#ad-fn').openAd(dataItem.PicInfoID, this.downloadHandle);
  },
  downloadHandle(dataItem, isAdLoad){
    dataItem = dataItem || this.page.dataCache[this.dataIndex];
    wx.Tool.downloadFile(dataItem,this.suffix).then(res=>{
      // isAdLoad && wx.AdLimit('downloadCount').countByKey(dataItem.PicInfoID);
      dataItem = null;
      console.log('download success')
    });
  },
  onUnload() {
    wx._setStorage({
      key: 'collectData',
      data: this.collectData
    });
    wx.Tool.saveDownloadData();
  },
  // 壁纸举报
  wallpaperReport() {
    var { IsUserUpload = 0, PicInfoID } = this.page.dataCache[this.dataIndex]
    wx.showActionSheet({
      itemList: ['图片缺失、错误', '不雅内容', '版权问题'],
      itemColor: "#007aff",
      success: (res) => {
        wx._request({
          url: 'WallpaperReport',
          data: {
            "type": IsUserUpload == 0 ? 1 : 5,
            reason: res.tapIndex + 1,
            picID: PicInfoID
          }
        }).then(res => {
          wx.msg('举报成功!')
        }).catch(e => {
          wx.msg('举报失败!', 1)
        })
      }
    })
  },
  __supplementParam(obj) {
    obj.label = this.page.dataCache[this.dataIndex].Labels;
  },
  correctData(data,obj){
    obj.LoadingText = ''
    return data
  },
  onShareAppMessage(shareEvent) {
    var { PicInfoID, Image, PriceType = 0, ID = PicInfoID, IsUserUpload = 0 } = this.page.dataCache[this.dataIndex],
    obj = {
      path: `${this.route}?scene=${ID}_${PriceType && 1}_${this.suffix}_${IsUserUpload}`,
      imageUrl: `${wx.config.base}WeChat/GenerateSharePicStream?picType=${this.suffix === "bz" ? 1 : 2}&picUrl=${encodeURIComponent(Image)}`,
      title: shareTitles[wx.random(0, shareTitles.length - 1)]
    };
    // this.shareReward()
    // if (shareEvent.from === 'button' && this.suffix === "bz") {
    //   obj.success = (e) => {
    //     switch (shareEvent.target.dataset.type) {
    //       case '1':
    //         this.shareUnlock();
    //         break;
    //       case '2':
    //         this.shareReward()
    //     }
    //     shareEvent = null;
    //   }
    //   obj.fail = (e) => {
    //     console.log(e)
    //   }
    // }
    console.log('转发', obj.path)
    return obj;
  },
  hasVideo(e){
    wx.hideLoading()
    this.setData({
      [`footer.mode`]: e.detail ? 'unlock-btn' : ''
    })

  },
  
})

function checkImage(data,page,obj){
  var isCollected = page.collectIds.indexOf(data.PicInfoID) > -1
  if (page.data.footer.isCollected !== isCollected){
    obj['footer.isCollected'] = isCollected;
  }
  if (page.data.footer.mode !== 'empty'){
    obj[`footer.mode`] = page.adCom.checkUnlock(data.PicInfoID) ? 'unlock-btn' : ''
  }
  // obj[`footer.mode`] = page.adCom.checkUnlock(data.PicInfoID) ? 'unlock-btn' : ''
  // collectIds
  // var isCollected;
  // if(page.suffix !== 'bz'){
  //   isCollected = wx.Toggle('collectStr-' + page.suffix).has(data.ID);
  // }else{
  //   isCollected = wx.Toggle('collectStr-' + (data.IsUserUpload === 1 ? 'sc' : 'bz')).has(data.PicInfoID);
  //   if ((page.data.footer.mode ? true : undefined) !== data.isLock){//判断现在的解锁状态（显示解锁按钮还是下载按钮）是否和壁纸的相同，不同改变状态
  //     obj['footer.mode'] = data.isLock ? 'unlock-btn' : '';
  //   }
  // }
  // if (page.data.footer.isCollected !== isCollected){
  //   obj['footer.isCollected'] = isCollected;
  // }
}
function parses(data) {
  return data.map(item=>{
      return parse(item)
  })
}
function parse(data) {
  if (data.ID !== undefined) return {
    Image: data.Image,
    ID: data.ID,
  }
  if (data.VideoUrl) return {
    Image: data.Image,
    PicInfoID: data.PicInfoID,
    ThumbImage: data.ThumbImage,
    VideoUrl: data.VideoUrl
  }
  return {
    ThumbImage: data.ThumbImage,
    Image: data.Image,
    PicInfoID: data.PicInfoID,
    Labels: data.Labels.split(','),
    user: {
      UserID: data.AuthorID,
      NickName: data.AuthorName,
      AvatarUrl: data.AuthorAvatar
    }
  }
}
