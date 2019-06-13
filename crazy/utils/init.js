require('common');
var config, // 配置文件
  diff = require('diff').default,
  sysInfo = wx._getSystemInfoSync(); //系统信息
try {
  config = require('config')
} catch (e) {
  config = {}
}
wx.windowWidth = sysInfo.windowWidth
wx.windowHeight = sysInfo.windowHeight


wx._request = function(obj) {
  return wx.promiseApi("request",obj);
}

//合并mixins
wx.mergeMixins = function(obj) {
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
      let {
        onLoad,
        data,
        computed,
        ...target
      } = item;
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
wx.mixin = function(mixin) {
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
    if (dataset.event) {
      this.__emit(dataset.event, e)
    }
  },
  backHome() {
    wx.switchTab({
      url: '/pages/index/index',
    })
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


wx.Page = function(obj) {
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
    wx.decorator(obj, 'onLoad', function(options) {
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

wx.Component = function(obj) {
  Object.assign(obj.data || (obj.data = {}), commonMethods.data)
  Object.assign(obj.methods || (obj.methods = {}), commonMethods);
  if (obj.computed && wx.isEmpty(obj.computed)) delete obj.computed;
  if (obj.computed) {
    obj.data.computed = obj.computed
    delete obj.computed;
    wx.decorator(obj, 'ready', function(options) {
      if (this.data.computed) {
        this.computed = this.data.computed
        this._setData = this.setData;
        this.setData = reSetData.bind(this);
        this.setData({});
      }
    })
  }
  delete obj.methods.data;
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
        let diffObj = diff({
          [key]: target
        }, {
          [key]: source
        });
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