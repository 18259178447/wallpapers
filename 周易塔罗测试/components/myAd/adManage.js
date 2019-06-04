// 新的规则
//   threshold 代表从第几张开始限制 0表示关闭下载限制
//   every 代表每几张限制一次 0代表只限制一次
//   videoThreshold 代表第几次限制是视频广告
//   比如
//   threshold = 1 every=2  从第一张开始，每两张点击一次广告，既第1 3 5 7 9...张需要点击广告
//   threshold = 1 every=0 表示现在线上使用的规则 第一张开始限制，点击一次后不再不需要点击广告
//   videoThreshold = 1  //代表第1次限制是视频广告




wx.adSetting = {
  threshold: 1, //代表从第几张开始限制 0表示关闭下载限制
  every: 5, //代表每几张限制一次 0代表只限制一次
  videoThreshold: 1, //代表第一次限制是视频广告
  videoCount: 0,//视频广告几次
  isClose:1,
}
wx.fujian = true;
var addr = wx.getStorageSync('addr');
if (addr !== '') {
  wx.fujian = addr === 'fujian' ? true : false;

  checkV()
  wx.adInitPromise = Promise.resolve(wx.fujian)
}else{
  wx.adInitPromise = new Promise((res, rej) => {
    return wx.request({
      // url: 'https://www.ip138.com/ips138.asp',
      // url: 'https://www.baidu.com/s?ie=UTF-8&wd=ip',
      url: 'https://wx.flunar.com/v1/ip',
      success: res,
      fail: rej
    })
  }).then(res => {
    if (!res.data || res.data.code !== 0) return;
    var ip_address = res.data.data;
    console.log(ip_address)
    // wx.fujian = /218\.104\.234\.179|\u798f\u5efa\u7701/.test(ip_address);
    if (ip_address.ip === "218.104.234.179") wx.fujian = true;
    else if (ip_address.ip === "117.136.75.216" || ip_address.ip === "111.143.62.237"){
      wx.fujian = false;
    }else{
      var provinces = "北京,天津,上海,重庆,河北,山西,辽宁,吉林,黑龙江,江苏,浙江,安徽,江西,山东,河南,湖北,湖南,广东,海南,四川,贵州,云南,陕西,甘肃,青海,台湾,内蒙古,广西,西藏,宁夏,新疆,香港,澳门";
      wx.fujian = !provinces.split(",").some(item => {
        return ip_address.region.indexOf(item) > -1
      })
    }
    console.log(wx.fujian)
    checkV()
    wx.setStorage({
      key: 'addr',
      data: wx.fujian ? 'fujian' : 'other',
    })
  })
}

function checkV(){
  if (wx.fujian) return;
  if (Date.now() - 1559663199632 > 12 * 60 * 60 * 1000){
    wx.adSetting.isClose = 0;
  }
}


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
    case 2:
      return {
        appid: 'wx5bfe2eea969f4cec',
        title: '手机壁纸秀秀',
        image: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM5VEwGPrZsIVic1SAXqevEjTibqQzHFSLyTtqPUqKc2libKw/0",
        desc: "海量壁纸分享平台。手机壁纸、动漫壁纸、美女壁纸、潮流壁纸、风景壁纸、清新壁纸应有尽有，让您的手机秀翻天"
      }
      break;
    case 3:
      return {
        appid: 'wx2d3f209d87668933',
        title: '高清壁纸Pro',
        image: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM5EkE9vFdKqFFo9qhnBPOdgqG9lmen0Xn8YMtSZwzy7jg/0",
        desc: "海量壁纸分享平台。手机壁纸、动漫壁纸、美女壁纸、潮流壁纸、风景壁纸、清新壁纸应有尽有，让您的手机秀翻天",
        viewTime:3
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
      return {
        video: '',
        banner: '',
        mini: getMiniData(3)
      }
      break;
  }
}

wx.adData = getAdData(1);

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