// pages/preview/preview.js
wx.Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onInit(){
    this.selectComponent('#image-preview').init(wx.previewObj)
    wx.previewObj = null;
    return;
    var data = [{ "PicInfoID": 704493, "Title": "暗蓝色系风景 森林中的微光拼接壁纸8", "ThumbImage": "http://shoppic.gao7.com/9f9a127f6079430bbe8108131d79c452.jpg?imageMogr2/auto-orient/thumbnail/!300x533r", "Image": "http://shoppic.gao7.com/9f9a127f6079430bbe8108131d79c452.jpg", "VideoUrl": "", "PriceType": 0, "Labels": "风景建筑,摄影,夜景,自然风景", "Source": "网友上传", "AuthorID": 2646776, "AuthorName": "枪蹦狗友", "AuthorAvatar": "http://resources.gao7.com/edm/udb/75.png", "IsUserUpload": 0, "LockType": 0 }, { "PicInfoID": 704487, "Title": "暗蓝色系风景 森林中的微光拼接壁纸2", "ThumbImage": "http://shoppic.gao7.com/d6cd55fcb8c246479e2d4418e9ec1709.jpg?imageMogr2/auto-orient/thumbnail/!300x533r", "Image": "http://shoppic.gao7.com/d6cd55fcb8c246479e2d4418e9ec1709.jpg", "VideoUrl": "", "PriceType": 0, "Labels": "风景建筑,摄影,夜景,自然风景", "Source": "网友上传", "AuthorID": 2646776, "AuthorName": "枪蹦狗友", "AuthorAvatar": "http://resources.gao7.com/edm/udb/75.png", "IsUserUpload": 0, "LockType": 0 }];
    var count = 0;
    for (var i = 0; i < 3; i++) {
      data = data.concat(data)
    }

    this.selectComponent('#image-preview').init({
      index: 0,
      page: {
        dataCaches: data,
        hasNext: true,
        getData() {
          count++;
          if (count === 3) {
            this.hasNext = false;
          }
          for (var i = 0; i < 3; i++) {
            data = data.concat(data)
          }
          this.dataCaches.concat(data)
          return Promise.resolve(data)
        }

      }
    })
  }
})