Page({
  interfaceName: 'AlbumContent',
  /**
   * 页面的初始数据
   */
  data: {
    AlbumObj: null,
    header: {
      title: '专辑详情'
    },
    footer: {
      btns: ['home', 'share'],
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.albumID = options.albumID || options.scene;
    this.__loadedMore();
  },
  correctData(data, obj) {
    if (!this.data.AlbumObj) {
      let {
        ImgUrl,
        Desc,
        IsCollection
      } = data.Album
      obj.AlbumObj = {
        ImgUrl,
        Desc: Desc.split(/{{(.+?)}}/g).map(item => {
          var arr = item.split(',');
          return {
            text: arr[0],
            url: arr[1] ? encodeURIComponent(arr[1]) : ''
          }
        }),
        IsCollection
      };
    }
    return data.DataList
  },
  __supplementParam(obj) {
    obj.albumID = this.albumID;
    // obj.userID = wx.userInfo.userID;
  },
})