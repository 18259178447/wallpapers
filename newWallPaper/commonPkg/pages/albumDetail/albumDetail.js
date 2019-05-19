// commonPkg/pages/albumDetail/albumDetail.js

wx.Page({
  /**
   * 页面的初始数据
   */
  data: {
    header:{
      type:"fixed"
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onInit: function ({ id = 39280,safe}) {
    if (safe && wx.safe != safe) return this.backHome();

    if(wx.safe){
      this.selectComponent('#image-list').init({
        interfaceName: 'AlbumContent',
        data: {
          albumID: id
        },
        correctData: (data) => {
          if (!this.data.banner) {
            let item = data.Album;
            this.setData({
              banner: {
                desc: item.Desc,
                ImgUrl: item.ImgUrl,
                id: item.AlbumID
              },
              "header.title": item.AlbumName
            })
          }
          return data.DataList;
        }
      })
    }else{
      this.selectComponent('#image-list').init({
        interfaceName: '',
        data: {
          sid: id,
          type: 1,
          m: "yj_erha",
          "do": "Subject"
        }, 
        correctData: (data) => {
          if (!this.data.banner) {
            let item = data.DataList.subject[0];
            this.setData({
              banner: {
                desc: item.name,
                ImgUrl: 'https://ehimg.1jianym.cn/' + item.thumb,
                id: item.id
              },
              "header.title": item.name
            })
          }
          return data.DataList.res;
        }
      })
    }
   
  },
  __addShare(obj){
    var { ImgUrl, id } = this.data.banner;
    obj.title = this.data.header.title;
    obj.path = `${this.route}?id=${id}&safe=${wx.safe ? 1 : 0}`;
    obj.imageUrl = ImgUrl;
  }
})