// pages/albumDetail/albumDetail.js
import Comment from '../../tpls/comment-panel';
import Poster from '../../tpls/poster';
import filter from '../../utils/filter';
import Draw from '../../common/draw';
Page( new Comment({
  praiseUrl:'CommentPraise',//评论点赞接口
  commentUrl:'Comment'
}), Poster,{
  interfaceName: 'AlbumContent',
  /**
   * 页面的初始数据
   */
  data: {
    AlbumObj: null,
    header: {
      title: '专辑'
    },
    footer: {
      btns: ['home', 'share', 'comment-list', 'poster', 'comment'],
      commentCount: 0
    }
  },
  publish(e) {
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLogin: function(options) {

    this.albumID = options.albumID || options.scene;
    this.__loadedMore().then(this.getComment);
  },
  collectHandle() {
    if (this.isLoading || !wx.userInfo.userID) return;
    this.isLoading = true
    wx.showLoading({
      title: '正在收藏',
      mask: !0
    });
    var IsCollection = this.data.AlbumObj.IsCollection;
    wx._request({
      url: 'AlbumCollection',
      data: {
        albumIDs: this.albumID,
        userID: wx.userInfo.userID,
        isCollection: +!IsCollection
      }
    }).then(res => {
      this.setData({
        ['AlbumObj.IsCollection']: !IsCollection
      })
      wx.msg(IsCollection ? '取消收藏成功' : '收藏成功');
      this.isLoading = false
    }).catch(e => {
      wx.msg(IsCollection ? '取消收藏失败' : '收藏失败', 1);
      this.isLoading = false
    })
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
    if (!this.hasNext) { //专辑加载完毕，可以加载评论列表了
      obj.LoadingText = '';
      obj.albumLoaded = true;
      // setTimeout(this.getComment,1000)
    }
    return data.DataList
  },
  getComment() {
    var data = {
      pageIndex: 0,
      pageSize: this.showCount,
      albumID: this.albumID,
      userID: wx.userInfo.userID
    }
    wx._request({
        url: 'CommentList',
        data: {
          pageIndex: 0,
          pageSize: 50,
          albumID: this.albumID,
          userID: wx.userInfo.userID
        }
      })
      .then((res) => {
        var obj = {};
        var {
          RecordCount,
          DataList,
          HasNext
        } = res.Data;
        obj.commentObj = {
          dataList: filter.comment(DataList || []),
          listName:'commentObj'
        };
        if (obj.commentObj.dataList.length === 0) obj.commentObj.defaultPage = true
        obj.isMoreComment = HasNext;
        obj['footer.commentCount'] = RecordCount;
        this.setData(obj);
      })
  },
  moreComment(e){
    wx.navigateTo({
      url: '/packageA/pages/commentList/commentList?id=' + this.albumID
    })
  },
  openPoster(){
    if (this.data.poster) return this.setData({ isShowPoster: true});
    this.setData({ isShowPoster: true, poster: '' });
    var imgs = this.dataList.slice(0, 6);
    if (imgs.length === 0) return;
    var { ImgUrl: banner, Desc } = this.data.AlbumObj;
    var draw = this.draw || (this.drwa = new Draw('myCanvas', "rpx"));
    var ctx = draw.ctx;
    var qrcode = `${wx.config.base}WeChat/WeChatQRCode?jumpUrl=${this.route}&pid=${wx.config.PID}&width=132&scene=${this.albumID}`;
    Desc = Desc.map(item => {
      return item.text
    }).join('')
    ctx.drawImage('../../assets/poster-bg1.png', 0, 0, draw.rpx2px(466), draw.rpx2px(773));
    draw.addCustom((ctx) => {
      ctx.drawImage('../../assets/phone.png', draw.rpx2px(83), draw.rpx2px(42), draw.rpx2px(300), draw.rpx2px(547));//画手机壳
      ctx.setFillStyle('#fff')
      ctx.fillRect(draw.rpx2px(98), draw.rpx2px(101), draw.rpx2px(270), draw.rpx2px(412))
    })
    draw.addImage({
      src: banner,
      dy: 101,
      dx: 100,
      dw: 267,
      dh: 125,
      // radiu: 20
    })
    draw.addText({
      text: Desc,
      size: 12,
      color: "#979797",
      x: 105,
      y: 240,
      width: 256,
      lineClamp: 1,
      vAlign: 'center'
    })
    var x = 105, y = 252;
    imgs.forEach((item, i) => {
      draw.addImage({
        src: item,
        dy: y + Math.floor(i / 3) * 151,
        dx: x + (i % 3) * 87,
        dw: 83,
        dh: 147,
        // radiu: 20
      })
    })
    draw.addCustom((ctx) => {
      let width = draw.rpx2px(466), height = draw.rpx2px(773);
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
    draw.addText({
      text: Desc,
      size: 20,
      color: "#949494",
      x: 42,
      y: 540,
      width: 386,
      lineClamp: 2,
      lineHeight: 30
    })

    draw.addText({
      text: wx.config.PID === 1 ? '壁纸精选' : (wx.config.PID === 3 ? '高清壁纸' : '哎喔壁纸'),
      size: 28,
      weight: "bold",
      color: "#4C4C4C",
      x: 198,
      y: 640
    })
    draw.addText({
      text: '长按识别免费下载该壁纸',
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
    }).catch(e=>{
      console.log(e)
    })

  },
  __supplementParam(obj) {
    obj.albumID = this.albumID;
    obj.userID = wx.userInfo.userID;
  },
})