// commonPkg/pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  switchHandle(){
    if(this.isLoading) return;
    this.isLoading = true;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'init',
      // 传给云函数的参数
      data: {}
    }).then(res=>{
      if(res.result.stats.updated === 1){
        wx.msg("成功")
      }
      this.isLoading = false;
      console.log(res)
    }).catch(e=>{
      this.isLoading = false;
      wx.msg("失败")
    })
  }
})