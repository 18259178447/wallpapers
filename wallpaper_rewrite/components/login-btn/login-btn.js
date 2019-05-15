// components/login-btn/login-btn.js
Component({
  externalClasses: ['_class'],
  /**
   * 组件的属性列表
   */
  properties:{
    disabled:{
      'type': Boolean,
      value:false
    }
  },
  data:{
    hasUserInfo: wx.hasUserInfo(),//是否有用户信息
  },
  /**
   * 组件的方法列表
   */
  methods: {
    login(e) {
      if (this.isLoading) return;
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
        return wx.showModal({
          title: '提示',
          content: '您拒绝了授权，为了不影响您的体验，请重新授权！',
          showCancel: false,
          confirmText: '已了解'
        })
      }
      if (!wx.userInfo.userID) {
        return wx.loginPromise.then(this.login.bind(e))
      }
      if (wx.userInfo.nickName || wx.userInfo.avatarUrl){
        this.triggerEvent('login', e);
        return this.setData({ hasUserInfo:true})
      }
      this.isLoading = true;
      wx.showLoading({ title: '正在登录...' });
      wx.sendUserInfo(e.detail.userInfo).then((userInfo) => {
        this.isLoading = false;
        this.triggerEvent('login', e);
        this.setData({ hasUserInfo: true })
        wx.hideLoading();
      }).catch((e) => {
        wx.hideLoading();
        wx.msg('登录失败', 1)
        this.isLoading = false
      })
    },
    tapHandle(e){
      this.triggerEvent('login', e)
    }
  }
})
