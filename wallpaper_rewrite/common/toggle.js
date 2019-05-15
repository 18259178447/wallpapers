class Toggle{
  constructor(name, ids = '', separator = ','){
    this.name = name;
    this.separator = separator;
    this.setIds(ids || wx._getStorageSync('toggle-' + name), !!ids);
  }
  setIds(ids, isSaveStorage){
    if (ids) {
      ids.charAt(0) !== this.separator && (ids = this.separator + ids);
      ids.charAt(ids.length - 1) !== this.separator && (ids = ids + this.separator);
    }
    return this._setIds(ids, isSaveStorage);    
  }
  _setIds(ids, isSaveStorage = true) {
    this.ids = ids || this.separator;
    isSaveStorage && wx._setStorage({
      key: 'toggle-' + this.name,
      data: ids
    });
    return this;
  }
  has(id) {
    return this.ids.indexOf(this.separator + id + this.separator) > -1
  }
  add(id) {
    if (this.has(id)) {
      this._setIds(this.ids.replace(id + this.separator, ''));
    } else {
      this.ids += id + this.separator;
      this._setIds(this.ids);
    }
  }
  onlyAdd(id){
    if (!this.has(id)) {
      this.ids += id + this.separator;
      this._setIds(this.ids);
    }
  }
  destory(){
    this.ids = '';
    Toggle[this.name] = null;
  }
}
wx.Toggle = function (name, ids, separator) {
  var res = Toggle[name];
  if (res) {
    if (ids) {
      res.ids !== ids && res.setIds(ids);
    }
    return res;
  }
  return Toggle[name] = new Toggle(name, ids, separator);
}
