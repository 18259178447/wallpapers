// pages1/order-act/order-act.js
wx.Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLogin: function (options) {
    this.selectComponent('#list-id').init({
      interfaceName: 'GetLandOrderList',
      correctData(data) {

        console.log(data)
        return data
      }
    })
  },

})