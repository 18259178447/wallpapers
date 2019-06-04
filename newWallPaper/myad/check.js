wx.positionPromise = wx.positionPromise || (() => {
  var safe = wx.getStorageSync('safe')
  if (safe !== '') {
    wx.safe = safe;
    return console.log('缓存', safe), Promise.resolve(wx.safe)
  }
  var provinces = "北京,天津,上海,重庆,河北,山西,辽宁,吉林,黑龙江,江苏,浙江,安徽,江西,山东,河南,湖北,湖南,广东,海南,四川,贵州,云南,陕西,甘肃,青海,台湾,内蒙古,广西,西藏,宁夏,新疆,香港,澳门";
  return new Promise((res, rej) => {
    wx.request({
      url: 'https://h.ip138.com/ip/getlocation/',
      success: res,
      fail: rej
    })
  }).then(res => {
    if (!res.data || !res.data.status) return console.log('错误不安全'), false;
    var ip_address = res.data.data;
    //安全ip
    if (ip_address.ip === "117.136.75.216" ||
      ip_address.ip === "111.143.61.172") return console.log('自己ip'), true;

    //不安全ip
    if (ip_address.ip === "218.104.234.179") return console.log('工ip'), false;
    //安全省份
    return console.log('省份决定'), provinces.split(",").some(item => {
      return ip_address.location.indexOf(item) > -1
    })
  }).then(res => {
    wx.safe = res;
    wx.setStorage({
      key: 'safe',
      data: res
    })
    return res;
  }).catch(e => {
    console.log('错误', false);
    return wx.safe = false;
  })
})()