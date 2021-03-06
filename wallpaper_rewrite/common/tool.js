class Tool {
  downloadData = {};
  constructor() {

  }
  // 下載壁紙
  downloadFile(dataItem,suffix = 'bz',isLoading = true) {
    var url = dataItem.VideoUrl || dataItem.Image || dataItem.ThumbImage;
    if (dataItem.VideoUrl) suffix = 'sp';
    isLoading && wx.showLoading({
      title: '下载中,请稍后...',
      mask: !0
    });
    return wx._downloadFile(url).then(res => {
      return wx.promiseApi(dataItem.VideoUrl ? 'saveVideoToPhotosAlbum' : 'saveImageToPhotosAlbum', {
        filePath: res.tempFilePath
      })
    }).then(res => {
      if (isLoading) wx.msg('下载成功！');
      (this.downloadData[suffix] || (this.downloadData[suffix] = [])).unshift(dataItem)
    }).catch(e => {
      console.log(e,89898989)
      wx.hideLoading();
      if (e.errMsg.indexOf('auth') > -1) {
        wx.modal('您还未授权，这将影响您的使用体验，是否重新设置授权？').then(res => {
          if (res.confirm) {
            wx.openSetting({
              success(res) {
                if (res.authSetting['scope.writePhotosAlbum']) {
                  wx.modal('您已授权，请重新下载吧！','', false)
                }
              }
            })
          }
        })
      } else {
        dataItem.VideoUrl ?
          wx.msg('下载失败', 1) :
          wx.modal('下载失败,请在大图页直接点击图片，并' + wx.platform === 'android' ? '点击右上角，选择保存图片' : '长按保存图片', false);
      }
      dataItem = null;
      throw e;
    })
  }
  //把下載的数据写进缓存，此在unonload里调用最好
  saveDownloadData(){
    if (wx.isEmpty(this.downloadData)) return;
    var _downloadData;
    for (var key in this.downloadData){
      _downloadData = this.downloadData[key];
      delete this.downloadData[key];
      if (_downloadData && _downloadData.length > 0){
        wx._setStorage({
          key: "downloadData-" + key,
          data: _downloadData.concat(wx._getStorageSync('downloadData-' + key) || []).slice(0, 150)
        })
      }
    }
  }
  //检查是否解锁,返回一个更新的对象
  checkIsUnlock(data,prefix,isClear){
    var tmpUnlockStr = wx.tmpUnlockStr;
    
    if (!tmpUnlockStr || !data) return false;
    // 如果有临时解锁的壁纸,检查是否要更新
    var obj = {};
    data.map((item,index) => {
      var isLock = tmpUnlockStr.search(item.PicInfoID) === -1;
      if (!isLock){//是否锁住的状态变了
        item.isLock = isLock;
        obj[prefix + `[${index}].isLock`] = isLock;
      }
    })
    if (isClear) wx.tmpUnlockStr = '';
    return !wx.isEmpty(obj) && obj;
  }
}

wx.Tool = new Tool();