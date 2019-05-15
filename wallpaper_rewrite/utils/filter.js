export default {
  base(data) {//基本过滤函数
    return data.map(item => {
      return item.ThumbImage || item.Image;
    })
  },
  original(data){//原创过滤函数
    var reward = wx.Toggle('rewardStr');
    return data.map(item => {
      var isLock = item.PriceType && !reward.has(item.PicInfoID);
      isLock && (item.isLock = isLock);
      return {
        ThumbImage: item.ThumbImage,
        PriceType: item.PriceType,
        isLock
      }
    })
  },
  album(data){//专辑过滤
    return data.map(item => {
      return {
        ImgUrl: item.ImgUrl,
        AlbumName: item.AlbumName
      }
    })
  },
  comment(data){
    return data.map(item => {
      var { CommentDate, UserObject, ReplyComment,...obj } = item; 
          obj.user = {
            AvatarUrl: UserObject.avatarUrl,
            NickName: UserObject.nickName,
            UserID: UserObject.userID,
            CreateDate:CommentDate
          }
      if (ReplyComment){
        obj.ReplyNickName = ReplyComment.ReplyNickName || '游客';
        obj.ReplyContent = ReplyComment.ReplyContent;
      }
      return obj
    })
  }
}