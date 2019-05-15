class Community {
  /**
   *关注及取消关注
   *@param [number | string] attentionUserID 目标userid
   *@param [bool] IsAttention 是否关注
   *@return [object] Promise对象 表示成功
   **/
  attention(attentionUserID, IsAttention) {
    if (this.isLoading) return;
    this.isLoading = true;
    return wx._request({
      url: IsAttention ? 'CancelAttention' : 'AddAttention',
      data: {
        userID: wx.userInfo.userID,
        attentionUserID
      }
    }).then((res) => {
      this.isLoading = false;
      wx.msg(IsAttention ? '取消成功！' : '关注成功！', 1)
    }).catch((e) => {
      this.isLoading = false;
      if (e.errMsg !== '已关注该用户，请刷新页面') {
        wx.msg(IsAttention ? '取消失败！' : '关注失败！', 1);
        throw e
      } else {
        wx.msg('已关注用户', 1);
      }
    });
  }
}

export default new Community()