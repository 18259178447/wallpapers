
var listMinxin = require('../../utils/list-mixin');
wx.Page({
  mixins: [listMinxin],
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
      interfaceName: 'GetHomePage',
      correctData(data){
        console.log(data.HomePagePics)
        return data.HomePagePics
        
      }
    })

    // wx._request({
    //   url: 'GetHomePage',
    // })

    // if (this.getTabBar){
    //   this.getTabBar().setData({
    //     selected: 0
    //   })
    // }
  },

})