// pages/preview/preview.js

var shareTitles = ['一万句我爱你，不如一句在一起。', '星星跳进你的眼睛 听过的爱你从没这么坚定', '你应该是一场梦，我应该是一阵风。'];
import Poster from '../../tpls/poster';
import Draw from '../../common/draw';
var Color = require('../../common/color');
Page(Poster,{
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
      btns: ['home', 'collect', 'download','poster','share'],
      isCollected:false
    },
    isWifi:true,
    isPlayVideo:false,
    rewardWallPaper:null,//分享奖励壁纸
  },
  /**
   * 生命周期函数--监听页面加载、
   */
  onSetting: function ({ scene, index = 0, suffix = 'bz' }) {
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
    if (this.isLoading || !wx.userInfo.userID) return;
    this.isLoading = true;
    var dataItem = this.page.dataCache[this.dataIndex],
      isCollected = this.data.footer.isCollected,
      url = '',
      data,
      obj = {};
      wx.showLoading({ title: `正在${isCollected ? '取消收藏' : '收藏'}`, mask: !0 });
      if(this.suffix === 'bz'){
        url = isCollected ? 'collect' : 'cancelcollect';
        data = {
          picInfoID: dataItem.PicInfoID,
          userID: wx.userInfo.userID,
          "type": dataItem.VideoUrl ? 2 : dataItem.IsUserUpload,
        }
      }else{
        url = 'networkpiccollect';
        data={
          id: dataItem.ID,
          userID: wx.userInfo.userID,
          'type': this.suffix === 'bq' ? 1 : 3,
          isCollection: isCollected ? 0 : 1
        }
      }
      wx._request({
        url,
        data
      }).then(res=>{
        this.setData({
          'footer.isCollected': !isCollected
        },()=>{
          wx.msg(isCollected ? '取消收藏成功' : '收藏成功');
          this.isLoading = !1;
          if (dataItem.IsUserUpload == 1) {
            wx.Toggle('collectStr-sc').add(dataItem.PicInfoID || dataItem.ID);
          } else {
            wx.Toggle('collectStr-' + this.suffix).add(dataItem.PicInfoID || dataItem.ID);
          }
          dataItem = data = null;
        })
      }).catch(e=>{
        wx.msg(isCollected ? '取消收藏失败' : '收藏失败', 1);
        this.isLoading = !1;
        dataItem = data = null;
      })
  },
  downloadHandle(e){
    var dataItem = this.page.dataCache[this.dataIndex];
    wx.Tool.downloadFile(dataItem,this.suffix).then(res=>{
      console.log('download success')
    })
  },
  onUnload() {
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
  //分享解锁
  shareUnlock(){
    if (!wx.setting.SharingUnlockCount) return wx.modal('抱歉，已暂停分享解锁功能！')
    var dayLimit = wx.DayLimit('shareUnlock', wx.setting.SharingUnlockCount);
    if (dayLimit.isExceed) {
      return wx.modal(`今日分享解锁${dayLimit.LimitCount}次机会已全部用完`);
    }
    var dataItem = this.page.dataCache[this.dataIndex]
    wx._request({
      url: 'SharingUnlockPic',
      data: {
        picID: dataItem.PicInfoID,
        userID: wx.userInfo.userID,
        unlockType: 1
      }
    }).then(res => {
      dayLimit.currentCount = res.Data;
      wx.modal(`今日原创专栏分享解锁次数还剩${dayLimit.remain}次`, '解锁成功');
      wx.Toggle('rewardStr').onlyAdd(dataItem.PicInfoID);
      wx.tmpUnlockStr = (wx.todayUnlockStr || '') + dataItem.PicInfoID + ',';
      this.setData({
        'footer.mode': ''
      });
      dataItem.isLock = !1;
      dayLimit = null;
      dataItem = null;
    }).catch(e => {
      if (e.errMsg === '已超出当天解锁限制') {
        dayLimit.currentCount = dayLimit.LimitCount;
        wx.modal(`今日分享解锁${dayLimit.LimitCount}次机会已全部用完`)
      }
      dayLimit = null;
      dataItem = null;
    })
  },
  // 分享奖励
  shareReward() {
    if (!wx.setting.SharingRewards) return;
    var dayLimit = wx.DayLimit('shareReward', wx.setting.SharingRewards);
    if (dayLimit.isExceed) {
      return;
    }
    wx._request({
      url: 'SharingRewardsPic',
      data: {
        userID: wx.userInfo.userID,
      }
    }).then(res => {
      if (res.Data == null) {
        dayLimit.currentCount = dayLimit.LimitCount;
        dayLimit = null;
        return;
      }
      res.Data.remain = dayLimit.remain;
      res.Data.PriceType = res.Data.PriceType.toFixed(2);
      this.setData({
        rewardWallPaper: res.Data
      })
      dayLimit = null;
    }).catch(e => {
      dayLimit = null;
    })
  },
  shareRewardReceive() {//分享奖励领取
    var { PicInfoID } = this.data.rewardWallPaper;
    var dayLimit = wx.DayLimit('shareReward');
    wx._request({
      url: 'SharingUnlockPic',
      data: {
        picID: PicInfoID,
        userID: wx.userInfo.userID,
        unlockType: 2
      }
    }).then(res => {
      dayLimit.currentCount = res.Data;
      var rewardWallPaper = this.data.rewardWallPaper;
      this.setData({
        ['rewardWallPaper']: null
      });
      wx.Toggle('rewardStr').onlyAdd(PicInfoID);
      wx.Tool.downloadFile(rewardWallPaper, 'bz').then(res => {
        console.log('success')
      })
      dayLimit = null;
    })
  },
  onShareAppMessage(shareEvent) {
    var { PicInfoID, Image, PriceType = 0, ID = PicInfoID, IsUserUpload = 0 } = this.page.dataCache[this.dataIndex],
    obj = {
      path: `${this.route}?scene=${ID}_${PriceType && 1}_${this.suffix}_${IsUserUpload}`,
      imageUrl: `${wx.config.base}WeChat/GenerateSharePicStream?picType=${this.suffix === "bz" ? 1 : 2}&picUrl=${encodeURIComponent(Image)}`,
      title: shareTitles[wx.random(0, shareTitles.length - 1)]
    };
    this.shareReward()
    if (shareEvent.from === 'button' && this.suffix === "bz") {
      obj.success = (e) => {
        switch (shareEvent.target.dataset.type) {
          case '1':
            this.shareUnlock();
            break;
          case '2':
            this.shareReward()
        }
        shareEvent = null;
      }
      obj.fail = (e) => {
        console.log(e)
      }
    }
    console.log('转发', obj.path)
    return obj;
  },
  openPoster() {
    if (this.data.isPlayVideo) {
      return wx.msg('请等待播放完成');
    }
    this.setData({ isShowPoster: true, poster: '' });
    var draw = this.draw || (this.drwa = new Draw('myCanvas', "rpx"));
    var ctx = draw.ctx;
    var { Image, ThumbImage = Image, PicInfoID, Labels, ID, PriceType = 0 } = this.page.dataCache[this.dataIndex];
    var qrcode = `${wx.config.base}WeChat/WeChatQRCode?pid=${wx.config.PID}&width=132&scene=${PicInfoID || ID}_${PriceType && 1}_${this.suffix}`;
    ctx.drawImage(`../../assets/poster-bg${this.suffix === 'bz' ? 1 : 2}.png`, 0, 0, draw.rpx2px(466), draw.rpx2px(773));
    if (this.suffix === 'bz') {
      let width = draw.rpx2px(466), height = draw.rpx2px(773);
      draw.addImage({
        src: ThumbImage,
        dy: 100,
        dx: 100,
        dw: 268,
        dh: 'auto',
      })

      draw.addCustom((ctx) => {
        ctx.drawImage('../../assets/phone.png', draw.rpx2px(83), draw.rpx2px(42), draw.rpx2px(300), draw.rpx2px(547));//画手机壳
        //画底部白色区域
        ctx.beginPath();
        ctx.moveTo(0, draw.rpx2px(538));
        ctx.quadraticCurveTo(width / 2, draw.rpx2px(470), width, draw.rpx2px(538));
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.setFillStyle('white');
        ctx.fill();

      })
      if (Labels) {//画便签
        draw.addLabel({
          label: Labels.slice(0, 3),
          size: 22,
          color: "r",
          randomColor: function () {
            return Color({ hue: wx.random(0, 360), saturation: wx.random(40, 80) / 100, lightness: wx.random(50, 70) / 100 }).toCSS()
          },
          x: 233,
          y: 538,
          radiu: 20,
          between: 15,
          padding: "10 15",
          hAlign: "center",
          vAlign: "top"
        })
      }
    } else {
      draw.addText({
        text: this.suffix === 'tx' ? '头像专区' : '表情专区',
        size: 37,
        weight: "bold",
        color: "#004D39",
        x: 56,
        y: 65
      })
      let txt = Labels.split(',')[1] || Labels.split(',')[0]
      txt && draw.addLabel({
        label: txt,
        size: 22,
        color: "#004D39",
        x: 56,
        y: 140,
        radiu: 20,
        padding: "10 20",
        bgColor: "#fff"
      })
      draw.addImage({
        src: Image,
        dy: 205,
        dx: 233,
        dw: 364,
        dh: 364,
        radiu: 24,
        hAlign: "center"
      })
    }
    draw.addText({
      text: wx.config.PID === 1 ? '壁纸精选' : (wx.config.PID === 3 ? '高清壁纸' : '哎喔壁纸'),
      size: 28,
      weight: "bold",
      color: "#4C4C4C",
      x: 198,
      y: 640
    })
    draw.addText({
      text: '长按识别免费下载该' + (this.suffix === 'bz' ? '壁纸' : (this.suffix === 'tx' ? '头像' : '表情')),
      size: 20,
      color: "#1DB18C",
      x: 198,
      y: 680
    })
    draw.addImage({
      src: qrcode,
      defealtSrc: 'https://minibizhi.313515.com/BiZhiStatic/qr.png',
      dy: 606,
      dx: 46,
      dw: 132,
      dh: 132,
    })
    draw.drawToImage().then(img => {
      this.setData({
        poster: img
      })
    })
  },
})

function checkImage(data,page,obj){
  var isCollected;
  if(page.suffix !== 'bz'){
    isCollected = wx.Toggle('collectStr-' + page.suffix).has(data.ID);
  }else{
    isCollected = wx.Toggle('collectStr-' + (data.IsUserUpload === 1 ? 'sc' : 'bz')).has(data.PicInfoID);
    if ((page.data.footer.mode ? true : undefined) !== data.isLock){//判断现在的解锁状态（显示解锁按钮还是下载按钮）是否和壁纸的相同，不同改变状态
      obj['footer.mode'] = data.isLock ? 'unlock-btn' : '';
    }
  }
  if (page.data.footer.isCollected !== isCollected){
    obj['footer.isCollected'] = isCollected;
  }
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
