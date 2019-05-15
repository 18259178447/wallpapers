'use strict'
function Base() {
  this.data = {
    supperClass: wx.supperClass,//包含机型 品牌 平台
    platform: wx.platform,//平台
    // reserved: {},//预留  所有wxml模板引入
    isHideBackTop: true,//是否隐藏返回顶部按钮
    netWork: true,//是否有网络
    header:{
      statusBarHeight: wx.statusBarHeight,
      title:'壁纸精选',
      mode:'back-title'
    }
  }
  this.isLoading = false;//是否正在加载中,用户排除多次点击
}
Base.prototype = {
  onShareAppMessage(e){
    var obj = {
      title:"壁纸精选",
      path:this.route
    };
    this.__emit('__addShare', obj, e);
    console.log('转发路径', obj.path);
    if (wx.isInsider){
      wx.setClipboardData({ data: obj.path,success(){wx.msg('复制成功')}})
    }
    return obj;
  },
  miniProgramClicked(e){
    console.log(e)
  },
  //登陆
  login(e) {
    if (this.isLoading) return;
    if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
      return wx.showModal({
        title: '提示',
        content: '您拒绝了授权，为了不影响您的体验，请重新授权！',
        showCancel: false,
        confirmText: '确认'
      })
    }
    this.isLoading = true;
    this.setData({ isOPenLoginPanel:false})
    // if (!wx.userInfo.userID) {
    //   return wx.loginPromise.then(this.login.bind(e))
    // }
    // var callback = e.currentTarget.dataset.event;
    // if (wx.userInfo.nickName || wx.userInfo.avatarUrl) return this.__emit(callback, e);
    // this.isLoading = true;
    wx.showLoading({ title: '正在登录...' });
    wx.sendUserInfo(e.detail.userInfo).then((userInfo) => {
      this.isLoading = false;
      if (this.loginCallBackObj){
        wx.hideLoading();
        this[this.loginCallBackObj.eventName](this.loginCallBackObj.param);
        this.loginCallBackObj = null;
      }else{
        wx.msg('请继续您的操作', 1);
      }
      // wx.msg('请继续您的操作', 1);
      // this.__emit(callback, e);
      // wx.hideLoading();
    }).catch((e) => {
      // wx.hideLoading();
      wx.msg('登录失败', 1)
      this.isLoading = false
    })

  },
  checkLogin(eventName,param){
    var hasUserInfo = wx.hasUserInfo();
    if (!hasUserInfo) {
      this.setData({
        isOPenLoginPanel: true,
      });
      this.loginCallBackObj = eventName ? { eventName, param} : null;
    }
    return hasUserInfo
  },
  /**
  * 跳转页面或者触发事件
  *@param e 事件对象  如果包含data-url 则跳转页面  否则触发事件
  **/
  event(e){
    var dataset = e.target.dataset;
    if (dataset.url) return wx[dataset.method || 'navigateTo']({
      url: dataset.url
    })
    if (dataset.event){
      this.__emit(dataset.event,e)
    }
  },
  formSubmit(e) {
    e.target = e.detail.target;
    this.event(e);
    var formId = e.detail.formId;
    console.log(formId)
    if (formId && formId !== 'the formId is a mock one') {
      this.pushFormSubmit(e)
      var dayLimit = wx.DayLimit('formid');
      dayLimit.currentCount++;
      if (dayLimit.isExceed) {
        dayLimit.destroy();
        dayLimit = null;
        wx.isGetFormId = false;
        return this.setData({
          'footer.formId': false
        })
      }

      // return wx._request({
      //   url: 'https://miniemoji.313515.com/list/pushreport',
      //   data: {
      //     userID: wx.userInfo.userID,
      //     code: formId
      //   }
      // }).then((res) => {
      //   var dayLimit = wx.DayLimit('formid');
      //   dayLimit.currentCount++;
      //   if (dayLimit.isExceed) {
      //     dayLimit.destroy();
      //     dayLimit = null;
      //     wx.isGetFormId = false;
      //     return this.setData({
      //       'footer.formId': false
      //     })
      //   }
      // }).catch((e) => {
      //   console.log(e)
      // })
    }
  },
  /**设置顶部标题**/
  __setTitle(title) {
    this.setData({
      ['header.title']: title || this.title
    })
  },
  /**
  *调用回调函数
  *@param name 函数名
  *@param params 函数参数
  **/
  __emit(name, ...params) {
    return this[name] && this[name].apply(this, params);
  },
  back() {
    wx.navigateBack({
      delta: 1,
    });
  },
}
wx.Base = Base;