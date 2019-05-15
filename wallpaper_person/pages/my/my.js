Page({

  /**
   * 页面的初始数据
   */
  data: {
    header:{
      title:'我的',
      mode:'only-title'
    },
    nav: [
      { title: '我的收藏', icon: 'my-collect.svg', url:'/pages/collect/collect'},
      { title: '我的下载', icon: 'my-dl.svg', url:'/pages/download/download'},
      // { title: '原创专栏', icon: 'icon-my-reward.svg', url:'/packageA/pages/pageList/pageList?pagename=rewardList'},
      // { title: '我发布的', icon:'icon-my-publish.svg',url:''},
      // // { title: '意见反馈', icon:'icon-give-feedback.svg',url:''},
      // { title: '上传壁纸', icon: 'my-nav-upload.svg', url:'/packageA/pages/pageList/pageList?pagename=uploadList'},
      // { title: '设置', icon: 'setting.svg', url:'/packageA/pages/pageBase/pageBase?pagename=setting'},
    ],
    newMessage:false,//是否有新消息
    UserAttentionCount:0,//已关注
    fansCount:0,//粉丝
  },
  onShow(){

  },
  aaa() {
    wx.msg('256356565656')
  },
})