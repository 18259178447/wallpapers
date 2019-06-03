// pages/my/my.js
wx.Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.__my){
      this.setData({
        manage:true
      })
    }
  },
  test(){
    if (!wx.__my) return;
    wx.safe = !wx.safe;
    wx._setStorage({
      key: 'safe',
      data: wx.safe,
    })
    wx._setStorage({
      key: 'categorys',
      data: '',
    })

    wx.promiseApi("showModal", {
      title: '切换至',
      content: wx.safe + "",
    }).then(res=>{
      wx.reLaunch({
        url: '/pages/index/index'
      })
    })

    console.log(111)
  },
  open(){
    wx.__my = true;
  }
})