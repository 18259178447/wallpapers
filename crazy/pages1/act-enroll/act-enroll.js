// pages1/act-enroll/act-enroll.js
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
  inputHandle(e){
    var name = e.target.dataset.name;
    var val = e.detail.value.trim();
    if(!this.data[name] !== !val){
      this.setData({
        [name]: val
      })
    }
  }
})