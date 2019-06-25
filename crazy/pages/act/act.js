
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
      interfaceName: 'GetActList',
      correctData(data) {
        data.DefaultActList = (data.DefaultActList || []).map(item => {
          item.type = 1;//活动报名
          return item;
        });
        data.SubscribeActList = (data.SubscribeActList || []).map(item=>{
          item.type = 0;//预约
          item.Status = 2;// Status 1 未开始 2进行中 3 已结束
          return item;
        });
        console.log(data)
        return data.SubscribeActList.concat(data.DefaultActList)
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