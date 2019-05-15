import message from '../../utils/message'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [
      { title: '我的收藏', icon: 'icon-my-collect.svg', url:'/packageA/pages/pageLists/pageLists?pagename=collectList'},
      { title: '我的下载', icon: 'icon-my-download.svg', url:'/packageA/pages/pageLists/pageLists?pagename=downloadList'},
      { title: '原创专栏', icon: 'icon-my-reward.svg', url:'/packageA/pages/pageList/pageList?pagename=rewardList'},
      { title: '我发布的', icon:'icon-my-publish.svg',url:''},
      // { title: '意见反馈', icon:'icon-give-feedback.svg',url:''},
      { title: '上传壁纸', icon: 'my-nav-upload.svg', url:'/packageA/pages/pageList/pageList?pagename=uploadList'},
      { title: '设置', icon: 'setting.svg', url:'/packageA/pages/pageBase/pageBase?pagename=setting'},
    ],
    newMessage:false,//是否有新消息
    UserAttentionCount:0,//已关注
    fansCount:0,//粉丝
  },
  onShow(){
    message().update().then(res=>{
      var newMessage = message().checkRedPoint();
      this.setData({
        UserAttentionCount: res.UserAttentionCount,
        fansCount: res.AttentionUserCount,
        newMessage
      })
    })
  }
})