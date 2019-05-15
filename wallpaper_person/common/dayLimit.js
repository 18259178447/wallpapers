/**
 * 按天限制次数类
 * @param  {string} name 给此限制命名
 * @param  {string} count 限制次数
 * @return {object}    创建的类
 * 
 * Api  
 * 属性  isExceed {boolean} 是否超出  只读
 *       vip  {boolean}   是否开启不限制  只写  （开启后今天将不会超出）
 *       LimitCount {number} 限制次数  可读可写
 *       remain   {number}  剩余次数  只读
 *       currentCount  {number} 已使用次数  可读可写
 * 方法  
 * constructor（name，count）  构造器  
 *      @param  {string} name 给此限制命名
 *      @param  {string} count 限制次数
 *      @return {object}    创建的类
 * 
 * countByKey（key）根据key加次数  如果没有key的限制用 currentCount属性（实例.currentCount++）
 *     @param  {string} key key值
 *     说明  此方法用于有key的情况，比如每天只能下载三种壁纸，key就是壁纸id，同一个id只能算一次，此方法会判断是否已经是下载过的key，如果是则不增加次数
 * isExceedByKey（key）根据key判断是否超出 如果没有key的限制使用 isExceed属性
 *     @param  {string} key key值
 * destroy()  释放此实例对象
 */
class DayLimit{
  static today = (() => {
    var date = new Date();
    return date.getMonth() + 1 + ',' + date.getDate();
  })()
  constructor(name, count=3, vip){
    if(!name) throw '请给此限制命名';
    this.name = name;
    this.info = wx._getStorageSync('limit-' + name) || {};
    if (DayLimit.today !== this.info.date) {
      this.info = {
        date: DayLimit.today,
        currentCount: 0,
        keys: ',',
        limitCount: count,
        vip:false
        // vip: vip === undefined ? !Number(count) : vip
      }
      this._saveInfo();
    }
  }
  get isExceed() {//是否超出
    if (this.info.vip) return false;
    return this.info.limitCount <= this.info.currentCount
  }
  set vip(value){
    this.info.vip = value;
    this._saveInfo();
  }
  set LimitCount(value) {
    if (this.info.limitCount == value) return;
    this.info.limitCount = value;
    this._saveInfo();
  }
  get LimitCount(){
    return this.info.limitCount
  }
  get remain(){
    return this.info.limitCount - this.info.currentCount
  }
  get currentCount(){
    return this.info.currentCount
  }
  set currentCount(count){//直接加次数
    this.info.currentCount = count;
    this._saveInfo();
  }
  _saveInfo() {
    wx._setStorage({
      key: 'limit-' + this.name,
      data: this.info
    })
  }
  has(key){
    return this.info.keys.indexOf(`,${key},`) > -1
  }
  isExceedByKey(key){
    return !this.has(key) && this.isExceed
  }
  countByKey(key) {//根据key加次数
    if (key) {
      if (this.has(key)) return;
      this.info.keys += `${key},`;
    }
    this.info.currentCount++;
    this._saveInfo();
  }
  destroy(){
    DayLimit[this.name] = null;
  }
}

wx.DayLimit = function (name, count, vip){
  var res = DayLimit[name];
  if (res) {
    count = Number(count);
    if (count && res.LimitCount != count) res.LimitCount = count;
    return res;
  }
  return DayLimit[name] = new DayLimit(name, count, vip);
}

