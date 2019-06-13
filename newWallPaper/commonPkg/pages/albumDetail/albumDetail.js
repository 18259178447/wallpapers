// commonPkg/pages/albumDetail/albumDetail.js
var config = require("../../../utils/config.js")
wx.Page({
  /**
   * 页面的初始数据
   */
  data: {
    header:{
      type:"fixed"
    },
    banner:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onInit: function ({ id = 39280,safe}) {
    if (safe && wx.safe != !!+safe) return this.backHome();

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
                id: item.AlbumID,
                count: item.ImgCount
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
  send(){
    if (!wx.__my || !wx.safe) return;
    if(wx.sended) return wx.msg("进入已经发送过了");
    wx.showLoading({
      title: `正在获取formid`,
      mask: true
    });
    return wx.cloud.callFunction({
      name: 'formidMark',
      data: {}
    }).then(res=>{
      var send = res.result;
      if(send){
        this.total = send;
        this.sendedCount = 0;
        this.sendAjax();
        console.log("总共获得"+send);

      }else{
        this.send();
      }
    }).catch(e=>{
      wx.showModal({
        title: '提示',
        content: '获取formid数据失败，请重新尝试',
      })
    })
  },
  sendAjax(){
    var { id, count, desc } = this.data.banner;
    wx.showLoading({
      title: `${this.sendedCount}/${this.total}`,
      mask: true
    });
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'message',
      // 传递给云函数的event参数
      data: {
        templateId: config.tpl["1"],
        page: "commonPkg/pages/albumDetail/albumDetail?id=" + id,
        data: {
          keyword1: {
            value: this.data.header.title
          },
          keyword2: {
            value: count
          },
          keyword3: {
            value: desc
          }
        }
      }
    }).then(res => {
      var { send, hasNext} = res.result;
      this.sendedCount += send;
      if(hasNext){
        this.sendAjax()
      }else{
        setTimeout(()=>{
          wx.msg("发送成功")
        },500)
      }
      wx.sended = true;
      console.log(res)
      // output: res.result === 3
    }).catch(err => {
      wx.msg("发送失败")
      // handle error
    })
  },
  __addShare(obj){
    var { ImgUrl, id } = this.data.banner;
    obj.title = this.data.header.title;
    obj.path = `${this.route}?id=${id}&safe=${wx.safe ? 1 : 0}`;
    obj.imageUrl = ImgUrl;
  }
})


