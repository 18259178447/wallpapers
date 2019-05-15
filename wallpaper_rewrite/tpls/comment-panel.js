
function Comment(params={}){
  this.data = {
    isOpenCommentPanel: false, //是否打开评论框
    textAreaFocus: false,
    isTextAreaEmpty: true,   //根据输入框是否有内容 来判断按钮的亮暗
    commentPlaceholder: '',
    textareaVal: ''
  }
  /* 
  params = {
    praiseUrl:'',//点赞接口
    commentUrl:'',//评论接口
  }
  */

  Object.assign(this, params)
}
Comment.prototype = {
  //关闭评论框
  cancleComment() {
    this.setData({
      isOpenCommentPanel: !1,
      textareaVal: '',
      textAreaFocus: !1
    })
  },
  //打开评论框
  openComment(e) {
    if (!this.checkLogin('openComment',e)) return;
    var { id, nickname = '游客', content } = e.target.dataset;
    var obj = {
      isOpenCommentPanel: true,
      // textAreaFocus: true,
    };
    if (id !== undefined) {//回复评论
      this.ReplyComment = {
        ReplyNickName: nickname,
        ReplyContent: content,
        CommentID: id
      };
      obj.commentPlaceholder = '@' + nickname;
    } else {//评论
      this.data.commentPlaceholder && (obj.commentPlaceholder = '');
    }
    this.setData(obj,()=>{
      this.setData({ textAreaFocus: true,})
    });
  },
  // 评论输入
  textareaIphut(e) {
    var value = e.detail.value.trim();
    var isTextAreaEmpty = value === '';
    if (this.data.isTextAreaEmpty !== isTextAreaEmpty) {
      this.setData({
        isTextAreaEmpty: isTextAreaEmpty
      })
    }
    this.value = value;
  },
  //点赞
  thumbUp(e){
    if (!this.checkLogin('thumbUp', e) || this.isLoading) return;
    var { index, listname = ''} = e.target.dataset;
    var { CommentID, LikeCount, IsPraise } = listname ? this.data[listname].dataList[index] : this.dataList[index];
    if (IsPraise) return;
    this.isLoading = !0
    listname && (listname += '.')
    wx._request({ url: this.praiseUrl, data: { commentID: CommentID, userID: wx.userInfo.userID } }).then((res) => {
      this[listname ? 'setData' : '__reSetData']({
        [`${listname}dataList[${index}].IsPraise`]: !0,
        [`${listname}dataList[${index}].LikeCount`]: ++LikeCount
      },()=>{
        wx.msg('点赞成功！');
        this.isLoading = !1;
      });
    }).catch((e) => {
      this.isLoading = !1;
      wx.msg('点赞失败', 1);
    })
  },
  // 发布评论
  publishHandle() {
    if (this.isLoading) return
    var now = Date.now() / 1000;
    var obj = {
      isOpenCommentPanel: !1,
      'footer.commentCount': +this.data.footer.commentCount + 1,
      textareaVal: ''
    };
    var commentPromise;
    wx.showLoading({ title: '请稍后...', mask: true });
    if (this.data.commentPlaceholder) {//回复评论
      commentPromise = wx._request({
        url: 'ReplyComments', data: {
          commentID: this.ReplyComment.CommentID,
          userID: wx.userInfo.userID,
          content: this.value
        }
      })
    } else {//评论
      
      if (now - (wx.preCommentTime || 0) < (wx.setting.preCommentTime || 0)) return wx.msg('您的输入频繁，请稍后再来！');
      commentPromise = wx._request({
        url: this.commentUrl,
        data: {
          albumID: this.albumID,
          userID: wx.userInfo.userID,
          content: this.value
        }
      })
    }
    this.isLoading = true
    commentPromise.then(res=>{
      var itemObj = {
        CommentID: isNaN(res.Data) ? res.Data.CommentID : res.Data,
        Content: this.value,
        LikeCount: 0,
        IsPraise: 0,
        user: {
          CreateDate: wx.formatDate(new Date()),
          AvatarUrl: wx.userInfo.avatarUrl,
          NickName: wx.userInfo.nickName,
          UserID: wx.userInfo.userID
        }
      }
      if (this.data.commentPlaceholder) {//回复评论
        itemObj.ReplyNickName = this.ReplyComment.ReplyNickName;
        itemObj.ReplyContent = this.ReplyComment.ReplyContent;
      }else{
        wx.preCommentTime = now;
      }
      var commentObj = this.data.commentObj
      if (commentObj !== undefined) {
        commentObj.dataList.unshift(itemObj);
        obj['commentObj.dataList'] = commentObj.dataList;
        this.setData(obj, () => {
          wx.msg('评论成功！');
          this.isLoading = false
        });
      } else {
        this.dataList.unshift(itemObj);
        obj.dataList = this.dataList
        this.__reSetData(obj, () => {
          wx.msg('评论成功！');
          this.isLoading = false
        });
      }
    }).catch(e => {
      console.log(e)
      this.isLoading = !1
      if (e && e.errMsg) {
        return wx.msg(e.errMsg, 1);
      }
      wx.msg('评论失败！', 1);
      this.isLoading = false
    })
  }
}
export default Comment