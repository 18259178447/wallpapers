// packageC/pages/web/web.js
var sign = require('../../../common/sign');
Page({
  mode:'Base',
  /**
   * 页面的初始数据
   */
  data: {
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLogin: function ({ url}) {
    this.url = url;
    url = decodeURIComponent(url);
    if (url.indexOf('encrypt') > -1) {
      var [origin, search = ''] = url.split('?');
      var obj = { oauthid: wx.userInfo.userID };
      if (search) {
        var params = search.split('&');
        params.forEach(item => {
          item = item.split('=');
          if (item[0] !== 'encrypt') {
            obj[item[0]] = item[1]
          }
        });
      }
      url = origin + getUrlSearch(obj);
    }

    this.setData({ url });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var obj = {
      path: this.route + '?url=' + this.url,
    }
    console.log(obj)
    return obj;
  }
})

function getUrlSearch(obj){
  var search = '?'
  for (var key in obj) {
    search += key + '=' + obj[key] + '&'
  }
  return search + 'SignatureMD5=' + sign.params(obj).SignatureMD5;
}