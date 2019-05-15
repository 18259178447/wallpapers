// pages/new/new.js
import Comment from '../../../tpls/comment-panel';

Page(new Comment(),{
  filterName:'comment',
  noCache:true,
  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '评论列表',
    },
    footer:{
      mode:'comment-input',
      commentCount:0
    },
    defaultText:'就等你发表看法了~'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLogin: function ({id}) {
    this.id = id;
    Object.assign(this, {
      praiseUrl: 'CommentPraise',//评论点赞接口
      commentUrl: 'Comment',
    })
    this.interfaceName = 'CommentList'//评论列表接口
    // albumID: this.albumID,
    // userID: wx.userInfo.userID
    this.__loadedMore()
  },
  __supplementParam(obj) {
    obj.albumID = this.id;
    obj.userID = wx.userInfo.userID
  },
  correctData(data,obj){
    if (data.DataList && !this.data.footer.commentCount){
      obj['footer.commentCount'] = data.RecordCount
    }
    return data.DataList
  }
})