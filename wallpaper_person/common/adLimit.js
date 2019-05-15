class AdLimit {
  static today = (() => {
    var date = new Date();
    return date.getMonth() + 1 + ',' + date.getDate();
  })()
  constructor(name, start = 0, every = 0) {
    if (!name) throw '请给此限制命名';
    this.name = name;
    this.info = wx._getStorageSync('limit-' + name) || {};
    if (AdLimit.today !== this.info.date || this.info.limitCount !== undefined) {
      this.info = {
        date: AdLimit.today,
        currentCount: 0,
        remainCount:0,
        keys: ',',
        // limitCount: count,
        // vip: false
        // vip: vip === undefined ? !Number(count) : vip
      }
      // this._saveInfo();
    }
    this.start = start;
    this.every = every;
  }
  get isLimit(){
    if (this.start === 0 
    || this.start > this.info.currentCount + 1 
    || this.info.remainCount > 0 
    || (this.every === 0 && this.info.currentCount >= this.start)) return false;
    return this.every === 0 || (this.info.currentCount + 1 - this.start) % this.every === 0;
  }
  isLimitByKey(key){
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
  set remainCount(count){
    this.info.remainCount = count;
    this._saveInfo();
  }
  get remainCount(){
    return this.info.remainCount
  }
  _saveInfo() {
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(()=>{
      wx._setStorage({
        key: 'limit-' + this.name,
        data: this.info
      })
    },200)
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

