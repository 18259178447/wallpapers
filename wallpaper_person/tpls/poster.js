export default {
  data:{
    isShowPoster:false,
    poster:''
  },
  savePoster() {
    if (!this.data.poster) {
      return wx.msg('图片未加载')
    }
    wx.saveImageToPhotosAlbum({
      filePath: this.data.poster,
      success: res => {
        wx.msg('下载成功!');
        this.setData({
          isShowPoster:false
        })
      },
      fail(e) {
        console.log( e)
      }
    })
  },
}