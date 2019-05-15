require('common');
var config, // 配置文件
  sign = require('sign'), //签名文件
  diff = require('diff').default,
  sysInfo = wx._getSystemInfoSync(); //系统信息
try {
  config = require('config')
} catch (e) {
  config = {}
}
wx.windowWidth = sysInfo.windowWidth
//添加请求头
wx.requestHeader = {
  deviceInfo: sign.header({
    "CH": 1,
    "PID": 1,
    "Ver": 5,
    "Height": sysInfo.screenHeight,
    "Lang": sysInfo.language,
    "Model": sysInfo.model, //iPhone X
    "Net": 'unknown',
    "PixelRatio": sysInfo.pixelRatio,
    "Version": sysInfo.version,
    "Width": sysInfo.screenWidth,
  })
}

/**
 *重写wx.request（包含请求和上传图片）
 *@param [object]obj 请求配置
 *@param [boolean]requestTask 是否保留请求对象，默认不保留（保留后可以在请求完成之前调用abort方法中断请求）
 *@return [object] promise对象
 **/
wx._request = function (obj, requestTask) {
  return new Promise((resolve, reject) => {
    let sub = obj.filePath ? 'formData' : 'data',
      data = obj.data || {};
    data.timeStamp = Date.now();
    if (config.interfaces && !/^https*/.test(obj.url)) {
      obj.url = config.base + config.interfaces[obj.url];
    }
    obj.header = this.requestHeader;
    obj[sub] = data;
    obj[sub].SignatureMD5 = sign.params(obj[sub]).SignatureMD5;
    obj.success = resolve;
    obj.fail = reject;
    if (requestTask) {
      return obj.filePath ? wx.uploadFile(obj) : this.request(obj);
    }
    this.requestTask = obj.filePath ? wx.uploadFile(obj) : this.request(obj);
  }).then((res) => {
    this.requestTask = null;
    if (typeof res.data === 'string') {
      if (res.data === 'ok') return 'ok';
      res.data = JSON.parse(res.data);
    }
    if (res.data.ResultCode === '0') return res.data;
    throw {
      errMsg: res.data.ResultMessage,
      origin: 'server'
    }
  })
}
/**
 *中断请求
 **/
wx.abort = function () {
  if (this.requestTask) this.requestTask.abort();
}


//合并mixins
wx.mergeMixins = function (obj) {
  if (Array.isArray(obj.mixins) && obj.mixins.length > 0) {
    var base = {
      data: {},
      computed: {}
    },
      mixins = obj.mixins,
      onloads = [];
    delete obj.mixins;
    mixins.push(obj);
    mixins.forEach(item => {
      let { onLoad, data, computed, ...target } = item;
      if (target.mixins) {
        target = wx.mergeMixins(target);
      }
      if (onLoad) {
        onloads[typeof onLoad === 'function' ? 'push' : 'concat'](onLoad)
      }
      //data 浅拷贝
      if (data) {
        Object.assign(base.data, data);
      }
      if (computed) {
        Object.assign(base.computed, computed);
      }
      //其它方法浅拷贝
      Object.assign(base, target);
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

var commonMethods = {
  /**
   * 跳转页面或者触发事件
   *@param e 事件对象  如果包含data-url 则跳转页面  否则触发事件
   **/
  event(e) {
    var dataset = e.target.dataset;
    if (dataset.url) {
      !/^[\/\.]+/.test(dataset.url) && (dataset.url = '/' + dataset.url);
      return wx[dataset.method || 'navigateTo']({
        url: dataset.url
      })
    }
    console.log(dataset)
    if (dataset.event) {
      this.__emit(dataset.event, e)
    }
  },
  /**
   *调用回调函数
  *@param name 函数名
  *@param params 函数参数
  **/
  __emit(name, ...params) {
    return this[name] && this[name].apply(this, params);
  },
}


wx.Page = function (obj) {
  if (this.globalMixin) { //如果有全局mixin
    (obj.mixins || (obj.mixins = [])).unshift({
      ...this.globalMixin
    });
  }
  obj = wx.mergeMixins(obj); //合并mixin

  //删除空的计算属性
  if (obj.computed && wx.isEmpty(obj.computed)) delete obj.computed

  if (obj.onLoad_cover) obj.onLoad = obj.onLoad_cover, delete obj.onLoad_cover;
  else if (obj.onLoad && obj.onLoad.length === 1) obj.onLoad = obj.onLoad[0];
  if ((obj.onLoad && obj.onLoad.length > 1) || obj.computed) {
    wx.decorator(obj, 'onLoad', function (options) {
      if (this.computed) {
        this._setData = this.setData;
        this.setData = reSetData.bind(this);
        this.setData({});
      }
    })
  }
  Page(obj);
  obj = null;
}

wx.Component = function (obj) {
  Object.assign(obj.methods || {}, commonMethods)
  if (obj.computed && wx.isEmpty(obj.computed)) delete obj.computed;
  if (obj.computed) {
    obj.data.computed = obj.computed
    delete obj.computed;
    wx.decorator(obj, 'ready', function (options) {
      if (this.data.computed) {
        this.computed = this.data.computed
        this._setData = this.setData;
        this.setData = reSetData.bind(this);
        this.setData({});
      }
    })
  }
  Component(obj);
}

/**
 *
 *@param obj,callBack setData的参数
 *@param flag 是否会影响计算属性，不加也可以，但浪费性能
 **/
function reSetData(obj, callBack, flag = true) {
  if (typeof callBack === 'boolean') flag = callBack;
  if (flag) {
    wx.setDeepVals(this.data, obj); //静态的改变this.data里的值，
    var target, source;
    for (var key in this.computed) { //判断计算属性是否有改变，如果有就改变
      target = this.computed[key].call(this);
      source = this.data[key];
      if (typeof target === 'object' && typeof source === 'object') {
        let diffObj = diff({ [key]: target }, { [key]: source });
        if (!wx.isEmpty(diffObj)) {
          Object.assign(obj, diffObj);
          wx.setDeepVals(this.data, diffObj);
        }
      } else if (target != source) {
        obj[key] = target;
        this.data[key] = target;
      }
    }
  }
  //动态改变
  this._setData(obj, callBack || null)
}

wx.mixin(Object.assign({
  onLoad(options) {
    if (this.onInit) {
      wx.fujian !== undefined ? this.onInit(options) : wx.positionPromise.then(res => { this.onInit(options) })
    }
  },
  onShareAppMessage(e) {
    var obj = {
      title: "",
      path: this.route
    };
    this.__emit('__addShare', obj, e);
    console.log('转发路径', obj.path);
    return obj;
  },
}, commonMethods))
