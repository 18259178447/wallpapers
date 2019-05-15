// 新的规则
//   threshold 代表从第几张开始限制 0表示关闭下载限制
//   every 代表每几张限制一次 0代表只限制一次
//   videoThreshold 代表第几次限制是视频广告
//   比如
//   threshold = 1 every=2  从第一张开始，每两张点击一次广告，既第1 3 5 7 9...张需要点击广告
//   threshold = 1 every=0 表示现在线上使用的规则 第一张开始限制，点击一次后不再不需要点击广告
//   videoThreshold = 1  //代表第1次限制是视频广告





wx.adSetting = {}
wx.adInitPromise = new Promise((res, rej) => {
  return wx.request({
    url: 'https://waiguamall.gao7.com/WeChat/Init',
    data:{
      ver:0
    },
    success: res,
    fail: rej
  })
}).then(res => {
  return res.data;
}).then(res => {
  res.Data.videoCount = 0;
  
  return wx.adSetting = res.Data || {
    threshold: 1, //代表从第几张开始限制 0表示关闭下载限制
    every: 1, //代表每几张限制一次 0代表只限制一次
    videoThreshold: 1, //代表第一次限制是视频广告
    videoCount:0,//视频广告几次
    isClose: 1,
  }
})


function getMiniData(_type){
  switch (_type){
    case 0:
      return {
        appid: 'wx7d5c5308d07a1559',
        title: '占卜师傅',
        image: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM5n58WWufM7nEL9NKvpte43TIMCBoZHNNAoNvEhCviclCg/0",
        desc: "一款有趣的测试,心里测试、趣味情感测试、智商测试、爱情测试、性格测试！"
      }
      break;
    case 1:
      return {
        appid: 'wx94eb1e51887344a9',
        title: '头像小歌',
        image: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM4B62P9wXlcHS5H520tksvs6b7LXISy9zTG0WqFPrwibzQ/0",
        desc: "头像小歌包括了很多头像的素材，包括情侣头像、卡通头像、风景头像、男生头像、女生头像等"
      }
      break;
  }
}
function getAdData(_type){
  switch (_type) {
    // qianmeng_xcx01@163.com  qmxcx001 wxd3fab7dc660d0a6f 超清壁纸精选
    case 0:
      return {
        video: 'adunit-f043d80e16bdd2e0',
        banner: 'adunit-cf02a930ba6c97f1',
        mini: getMiniData(0)
      }
      break;
    case 1:
  }
}

wx.adData = getAdData(0);

wx.adConfig = {
  // ladloop
  count: 3,//正常曝光次数
  min: 6,//切换随机事件范围
  max: 16,
  firstMin: 5,//第一次切换随机范围
  firstMax: 8,
}


getMiniData = getAdData = null;



class AdLimit {
  static today = (() => {
    var date = new Date();
    return date.getMonth() + 1 + ',' + date.getDate();
  })()
  constructor(name, start = 0, every = 0) {
    if (!name) throw '请给此限制命名';
    this.name = name;
    this.info = wx.getStorageSync('limit-' + name) || {};
    if (AdLimit.today !== this.info.date || this.info.limitCount !== undefined) {
      this.info = {
        date: AdLimit.today,
        currentCount: 0,
        remainCount: 0,
        keys: ','
      }
    }
    this.start = start;//第几次开始限制
    this.every = every;//每多少次限制一次
  }
  get isLimit() {
    if (this.start === 0 //不限制
      || this.start > this.info.currentCount + 1 //还没有到第start次
      || this.info.remainCount > 0 //还剩下可操作次数
      || (this.every === 0 && this.info.currentCount >= this.start)) return false;

    return this.every === 0 || (this.info.currentCount + 1 - this.start) % this.every === 0;
  }
  get count(){//此次限制是第几次限制
    if(this.every === 0) return 1;
    return (this.info.currentCount + 1 - this.start) / this.every + 1
    // start = 1 every = 2  从第一张开始，每两张点击一次广告，既第1 3 5 7 9...张需要点击广告
  }
  isLimitByKey(key) {
    return !this.has(key) && this.isLimit
  }
  get currentCount() {
    return this.info.currentCount
  }
  set currentCount(count) {//直接加次数
    if (this.start === 0) return;
    this.info.currentCount = count;
    if (this.info.remainCount) this.info.remainCount--;
    this._saveInfo();
  }
  countByKey(key) {//根据key加次数
    if (key) {
      if (this.start === 0 || this.has(key)) return;
      this.info.keys += `${key},`;
    }
    this.currentCount++;
  }
  set remainCount(count) {
    this.info.remainCount = count;
    this._saveInfo();
  }
  get remainCount() {
    return this.info.remainCount
  }
  _saveInfo() {
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      wx.setStorage({
        key: 'limit-' + this.name,
        data: this.info
      })
    }, 200)
  }
  has(key) {
    return this.info.keys.indexOf(`,${key},`) > -1
  }
  destroy() {
    AdLimit[this.name] = null;
  }
}

wx.AdLimit = function (name, start, every) {
  var res = AdLimit[name];
  if (res) {
    if (start !== undefined) res.start = start;
    if (every !== undefined) res.every = every;
    return res;
  }
  return AdLimit[name] = new AdLimit(name, start, every);
}