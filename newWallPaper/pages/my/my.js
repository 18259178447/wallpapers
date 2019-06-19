// pages/my/my.js
var config = require("../../utils/config.js");
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
  clicktest(){
    if (!wx.__my) return;
    this.clickcount++;
    if (this.clickcount > 2){
      this._switch();
    }
  },

  test(e){
    if (!wx.__my) return;
    if (config.appid === "wx2d3f209d87668933"){
      return;
    }
    this._switch();
  },
  _switch(){
    wx.safe = !wx.safe;
    wx._setStorage({
      key: 'safev2',
      data: wx.safe,
    })
    wx._setStorage({
      key: 'categorysV2',
      data: '',
    })

    wx.promiseApi("showModal", {
      title: '切换至',
      content: wx.safe + "",
    }).then(res => {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    })
  },

  open(){
    wx.__my = true;
    this.clickcount = 0;
  }
})