var modifyWx = require('modifyWx'), //wx对象增加修改方法
  sysInfo = wx._getSystemInfoSync(); //系统信息
wx.windowWidth = sysInfo.windowWidth;
wx.windowHeight = sysInfo.windowHeight;
/**
 *重写wx.request（包含请求和上传图片）
 *@param [object]obj 请求配置
 *@return [object] promise对象
 **/
wx._request = function (obj) {
  return this.promiseApi('request',obj)
}

//合并mixins
wx.mergeMixins = function (obj) {
  if (Array.isArray(obj.mixins) && obj.mixins.length > 0) {
    var base = {
      data: {}
    },
      mixins = obj.mixins,
      onloads = [];
    delete obj.mixins;
    mixins.push(obj);
    mixins.forEach(item => {
      if (item.mixins) {
        item = wx.mergeMixins(item);
      }
      if (item.onLoad) {
        onloads[typeof item.onLoad === 'function' ? 'push' : 'concat'](item.onLoad)
        delete item.onLoad
      }
      //data 浅拷贝
      if (item.data) {
        Object.assign(base.data, item.data);
        delete item.data;
      }

      //其它方法浅拷贝
      Object.assign(base, item);
    })
    onloads.length > 0 && (base.onLoad = onloads);
    obj = base;
  }
  return obj;
}
//设置全局mixin
wx.mixin = function (mixin) {
  if (!mixin || typeof mixin !== 'object') return console.error('mixin must be Object')
  this.globalMixin = mixin;
}

wx.Page = function (obj) {
  if (this.globalMixin) { //如果有全局mixin
    (obj.mixins || (obj.mixins = [])).unshift({
      ...this.globalMixin
    });
  }
  obj = wx.mergeMixins(obj); //合并mixin
  //如果有header 补上statusBarHeight
  if (obj.data && obj.data.header && obj.data.header.mode) {
    obj.data.header.statusBarHeight = sysInfo.statusBarHeight
  }
  if (obj.onLoad_cover) obj.onLoad = obj.onLoad_cover, delete obj.onLoad_cover;
  else if (obj.onLoad && obj.onLoad.length === 1) obj.onLoad = obj.onLoad[0];

  if ((obj.onLoad && obj.onLoad.length > 1)) {
    wx.decorator(obj, 'onLoad', function (options) {})
  }
  Page(obj);
  obj = null;
}
