require('common/init');
wx.isNotify = wx._getStorageSync('isNotify');
wx.isNotify === '' && (wx.isNotify  = true);

// wx._request({
//   url:'https://www.baidu.com/s?wd=ip&rsv_spt=1&rsv_iqid=0x9736807300009f7c&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=2&rsv_sug1=1&rsv_sug7=100&rsv_sug2=0&inputT=816&rsv_sug4=816',
// }).then(res=>{
//   console.log(res)
// })

// wx.downloadFile({
//   url: 'https://www.laiyangde.top/download/' + encodeURIComponent('https://fx1.313515.com/f2b95bd3f24145039481a240954ede2b.jpg')  , //仅为示例，并非真实的资源
//   success(res) {
//     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
//     console.log(res)
//   }
// })

// https://minibizhi.313515.com/List/SelectionList
// http://fx1.313515.com/f2b95bd3f24145039481a240954ede2b.jpg
App({
  onLaunch(options) {

  },
  onLogin(options){
    options.query.spm = options.query.spm || '';
    options.openID = wx.userInfo.openID;
    options.ProductID = 19;
    wx._request({
      url: 'https://adsapi.gao7.com/MiniProgram/UserPath',
      data: options,
      method: 'post'
    })
  }
})