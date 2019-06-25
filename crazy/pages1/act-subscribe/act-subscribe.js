// pages1/act-enroll/act-enroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"",
    start: new Date().format("YY-MM-DD"),
    // end: (new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 1)).format("YY-MM-DD")
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  inputHandle(e) {
    var name = e.target.dataset.name;
    var val = e.detail.value.trim();
    if (!this.data[name] !== !val) {
      this.setData({
        [name]: val
      })
    }
  },
  bindDateChange(e){
    this.setData({
      date:e.detail.value
    })
    console.log(e)
  }
})