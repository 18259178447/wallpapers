// pages/first-screen/first-screen.js
var { screenHeight, screenWidth} = wx._getSystemInfoSync();
var isFull = screenHeight / screenWidth > 2;
wx.Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFull,
    width: isFull ? 0.5 * screenHeight : 0,
    header: {
      title: '疯狂小农',
      // backgroundColor: '#',
      type: '',
      noback:true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})