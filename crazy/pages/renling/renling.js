// pages/land-confirm/land-confirm.js
wx.Page({
  computed: {
    price(){
      if(!this.data.LandData) return 0;
      var { landIndex, LandData, areaIndex, rentIndex} = this.data;
      var land = LandData[landIndex];
      var price = land.SquarePrice * land.Areas[areaIndex].Size;//土地价格
      return price * (rentIndex + 1)//加月份
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    rentMonth: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"].map(item => item + "个月"),
    rentIndex: 0,//月份选择
    tel: "",
    areaIndex: 0, //面积选择
    landIndex: 0,//区域选择
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLogin: function (options) {
    wx.showLoading({
      title: '请稍候...',
      mask:true
    });
    wx._request({
      url: 'GetLandDetail',
    }).then(res => {
      wx.hideLoading()
      this.setData({
        LandData: res.Data.LandData.slice(0, 2).map(item => {
          return {
            LandID: item.LandID,
            Areas: item.Areas,
            SquarePrice: item.SquarePrice
          }
        }),
        DownImageUrl: res.Data.DownImageUrl
      })
    })
    var tel = wx._getStorageSync('tel');
    tel && this.setData({
      tel
    });
  },
  getTel(e) {
    console.log(e)
    if (e.detail.errMsg === 'getPhoneNumber:fail user deny') return;
    delete e.detail.errMsg;
    wx.promiseApi('login').then(res => {
      if (res.code) {
        e.detail.code = res.code;
        return wx._request({
          url: 'GetUserPhone',
          data: e.detail,
          method:"post"
        })
      }
      throw res;
    }).then(res => {
      this.setData({
        tel: res.Data
      })
      wx._setStorage({
        key: 'tel',
        data: res.Data,
      })
    }).catch(e => {
      wx.msg("获取手机号失败,请重试")
    })
  },
  rentChange(e) {
    var index = +e.detail.value;
    this.setData({
      rentIndex: index
    })
    console.log(e)
  },
  selectChange(e) {//选择改变
    var {index,type} = e.currentTarget.dataset;
    if(type==="land"){
      if (index === this.data.landIndex) return;
      if (!this.data.LandData[index].Areas[this.data.areaIndex]){
        this.setData({
          landIndex: index,
          areaIndex:0
        })
      }else{
        this.setData({
          landIndex: index,
        })
      }
    }else{
      if (index === this.data.areaIndex) return;
      this.setData({
        areaIndex: index
      })
    }
  },
  pay(){
    if(!this.data.tel) return wx.msg("请输入手机号！");
    if (this.isLoading) return;
    this.isLoading = true;
    wx.showLoading({
      title: '请稍候...',
    });
    var { landIndex, LandData, areaIndex, rentIndex,tel } = this.data;
    var land = LandData[landIndex];
    var price = land.SquarePrice * land.Areas[areaIndex].Size;//土地价格
    wx._request({
      url: 'CreateLandOrder',
      data:{
        landID: land.LandID, 
        areaID: land.Areas[areaIndex].ID, 
        objectType: 0,
        month: rentIndex + 1,
        phone:tel
      }
    }).then(res=>{
      var PayData = res.Data;
      return wx.promiseApi('requestPayment', {
        timeStamp: PayData.Timestamp,
        nonceStr: PayData.Noncestr,
        package: PayData.Package,
        signType: PayData.SignType,
        paySign: PayData.Sign,
      }).then(res => {
        wx.hideLoading();
        this.isLoading = false;
        return wx.redirectTo({
          url: '/pages1/land-pay-sucess/land-pay-sucess'
        })
      }).catch(e => {
        this.isLoading = false;
        wx.hideLoading();
        if (e.origin === 'server') {
          return wx.msg(e.errMsg, 'none')
        }
        if (e.errMsg.indexOf('requestPayment:fail') > -1) {
          return wx.msg('支付失败', 1)
        }
      })
    })
  }
})