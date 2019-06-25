// pages/preview/preview.js
wx.Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBtnsEnter:false,//
    isBtnsHidden:false,//
    isSwitchBtnShow:true,//
    isReSetting:false,
    header: {
      title: '',
      backgroundColor: 'transparent',
      type: 'fixed'
    },
    isImageCollect:false
  },
  onUnload(){
    this.adCom = this.previewCom = null;
  },
  onInit({ safe, wallpaper }){
    
    if (safe && wx.safe != !!+safe) return this.backHome();
    this.previewCom = this.selectComponent('#image-preview');
    this.adCom = this.selectComponent('#ad-fn');
    if(wallpaper){
      wallpaper = JSON.parse(decodeURIComponent(wallpaper));
      this.previewCom.init({
        page: {
          data:{
            dataList:[wallpaper]
          },
          hasNext:false
        },
        index:0
      })
    }else{
      if(wx.safe){
        if (!wx.previewObj) return wx.msg("")
        this.previewCom.init(wx.previewObj)
      }else{
        this.previewCom.init({
          page: {
            data: {
              dataList: [wx.previewObj.page.data.dataList[wx.previewObj.index]]
            },
            hasNext: false
          },
          index: 0
        })
      }
     
      wx.previewObj = null;
    }
    wx.promiseApi('getSetting').then(res=>{
      if (res.authSetting["scope.writePhotosAlbum"] === false) {
        this.setData({
          isReSetting: true
        })
      }     
    })
  },
  changeHandle(e){
    this.currentImage = e.detail;
    var isImageCollect = wx.Tool.checkImageIsCollect(e.detail.id);
    if (isImageCollect !== this.data.isImageCollect){
      this.setData({
        isImageCollect
      })
    }
  },
  dayHandle(){
    wx.msg("此功能暂未开放,敬请期待!")
  },
  collectHandle(){
    wx.Tool.collectImage(this.currentImage).then(res=>{
      this.setData({
        isImageCollect:res
      })
      wx.msg(res ? "收藏成功" : "取消收藏成功")
    })
    // wx.msg("此功能暂未开放,敬请期待!")
  },
  downloadHandle(){
    var imageItem = this.previewCom.data.imgs[this.previewCom.currentIndex];
    if (wx.safe){
      console.log(imageItem)
      this.selectComponent('#ad-fn').openAd(imageItem.id, () => {
        this._downloadHandle(imageItem)
      })
    }else{
      this._downloadHandle(imageItem)
    }
  },
  _downloadHandle(imageItem){
    // return wx.previewImage({
    //   urls: [imageItem.Image],
    //   current: imageItem.Image
    // })
    wx.showLoading({title: '下载中,请稍后...',mask: !0});
    wx.Tool.downloadImage(imageItem).then(res=>{
      wx.msg("下载成功!");
    }).catch(e => {
      console.log(e)
      wx.hideLoading();
      if (e.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
        this.setData({ isReSetting : true})
       return wx.showModal({title: '下载失败',content: '需要授权后才可下载'})
      }
      wx.promiseApi("showModal", {
        title: '提示', content: '此图片需要长按保存噢！必要时请到我的页面联系管理员！',
      }).then(res => {
        wx.previewImage({
          urls: [imageItem.Image],
          current: imageItem.Image
        })
      })
      wx.$("feedback").add({
        data: {
          wenti: e,
          sys:wx._getSystemInfoSync(),
          image: imageItem
        }
      })
      // wx.showModal({title: '下载失败',content: '请到我的页面联系管理员！',})
    })
  },
  reSettingHandle(e){
    var authSetting = e.detail.authSetting;
    if (authSetting['scope.writePhotosAlbum']){
      this.setData({ isReSetting: false })
      wx.showModal({ title: '授权成功', content: '请重新下载吧！' })
    }else{
      wx.showModal({ title: '授权失败', content: '需要授权后才可下载壁纸哦' })
    }
  },

  toggleBtnsHandle(){
    this.setData({
      isBtnsHidden: !this.data.isBtnsHidden
    },()=>{
      this.setData({
        isBtnsEnter: !this.data.isBtnsEnter
      })
    })
  },
  back(){
    if (getCurrentPages().length === 1){
     return wx.switchTab({
        url: '/pages/index/index',
      })
    }
    wx.navigateBack()
  },
  __addShare(obj){
    obj.title = "送你一张壁纸，快来和我一起换上吧！";
    var item = this.previewCom.data.imgs[this.previewCom.currentIndex]
    obj.path = `${this.route}?safe=${wx.safe ? 1 : 0}&wallpaper=${encodeURIComponent(JSON.stringify(item))}`;
  }
})

