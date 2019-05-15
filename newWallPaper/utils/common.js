/********************************************************************************************
                                        增加wx对象Api 
********************************************************************************************/
/**
*延迟后返回Promise
*@param time 延迟时间 单位毫秒
*@return promise对象
**/
wx.delay = function (time) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve() }, time)
  })
}
/**
*wx部分方法运行后返回Promise化结果
*@param name 微信方法名
*@param obj 微信方法的参数
*@return 包含运行wx方法后结果的Promise对象
**/
wx.promiseApi = function (name, obj = {}) {
  return new Promise((resolve, reject) => {
    obj.success = resolve;
    obj.fail = reject;
    this[name](obj);
    obj = null;
  });
}

/**
*深度拷贝source对象到target对象
*@param target 目标对象
*@param source 源对象
*@return 返回添加的节点
**/
wx.deepAssign = function (target, source) {
  var _toString = Object.prototype.toString;
  for (var key in source) {
    if (_toString.call(source[key]) === "[object Object]") {
      target[key] = this.deepAssign(target[key] || {}, source[key])
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
/**
*判断对象是否为空对象
*@param [object]obj 目标对象
*@return [boolean] 是否为空对象
**/
wx.isEmpty = function (obj) {
  for (var key in obj) {
    return !1
  }
  return !0
}

/*
*创建并返回一个像节流阀一样的函数，当重复调用函数的时候，至少每隔 wait毫秒调用一次该函数。
*对于想控制一些触发频率较高的事件有帮助。
*默认情况下，throttle将在你调用的第一时间尽快执行这个function，并且，
*如果你在wait周期内调用任意次数的函数，都将尽快的被覆盖。
*如果你想禁用*第一次首先执行的话，传递{leading: false}，
*还有如果你想禁用最后一次执行的话，传递{trailing: false}
* 例子：
  var throttled = throttle(updatePosition, 100,{leading: true,trailing:true});
  $(window).scroll(throttled);
*/
wx.throttle = function (func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);

    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}


wx.throttle_ = function (func, wait) {
  var previous = 0, timeout = null, args, context;
  var last = function () {
    previous = 0;
    func.call(context, ...args, 'last');
    args = context = null;
  }
  return function () {
    var now = Date.now();
    var remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout);
      args = arguments;
      context = this;
      previous === 0 ? func.call(this, ...arguments, 'first') : func.apply(this, arguments);
      previous = now;
      timeout = setTimeout(last, wait + 50);
    }
  };
}


/**
*装饰器  给目标对象需要装饰的方法装饰回调函数
*@param target 目标对象
*@param methodName 目标对象里需要装饰的方法
*@param callback 装饰回调
**/
wx.decorator = function (target, methodName, callback) {
  let method = target[methodName];
  if (method) {
    target[methodName] = function (options) {
      callback.call(this, options);
      if (Array.isArray(method)) {
        for (var i = 0; i < method.length; i++) {
          method[i].call(this, options);
        }
      } else {
        method.call(this, options);
      }
    }
  } else {
    target[methodName] = callback;
  }
  target = null;
}

/**
* 提示
*@param title 提示内容
*@param time 提示显示时间
**/
wx.msg = function (title,time) {
  var obj = {
    title: title,
    icon: 'none',
    duration: time || 1000
  }
  wx.showToast(obj);
}
/**
* 模态提示
*@param content 提示内容
*@param title 提示标题
*@param showCancel 是否显示取消
**/
wx.modal = function (content, title, showCancel = true) {
  return wx.promiseApi('showModal', {
    title: title || '提示',
    content,
    showCancel
  })
}


/**
*多层属性设置获取值，
*@param target 目标对象
*@param deepKey 多层属性 如a.b[1].f
*@param val 
*@return 多层属性值
**/
wx.deepVal = function (target, deepKey, val) {
  var lastKey;
  deepKey = deepKey.replace(/\[(.+?)\]/g, '.$1').split('.');
  lastKey = deepKey.splice(-1, 1);
  deepKey.forEach(item => {
    target = target[item]
  })
  if (val !== undefined) target[lastKey] = val;
  return target[lastKey];
}
/**
*多层属性设置值，
*@param target 目标对象
*@param keyValObj 多层属性键值对 {'a.b.c':5,'fff.vv':9}
**/
wx.setDeepVals = function (target, keyValObj) {
  for (var key in keyValObj) {
    this.deepVal(target, key, keyValObj[key]);
  }
}


wx.getRect = function (selector) {
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery().select(selector).boundingClientRect(resolve).exec()
  })
}



/********************************************************************************************
                          对原有wx对象Api优化，并在方面名前面加_              
********************************************************************************************/

/**
* 捕获错误，并尝试3次失败后返回一个默认的
**/
wx._getSystemInfoSync = function () {
  var count = 0;
  while (count < 3) {
    try {
      return this.getSystemInfoSync();
    } catch (e) {
      count++;
    }
  }
  return { "model": "iPhone 6", "pixelRatio": 2, "windowWidth": 375, "windowHeight": 603, "system": "iOS 10.0.1", "language": "zh_CN", "version": "6.6.3", "screenWidth": 375, "screenHeight": 667, "SDKVersion": "2.0.9", "brand": "iPhone", "fontSizeSetting": 16, "benchmarkLevel": 1, "batteryLevel": 100, "statusBarHeight": 20, "platform": "ios" }
}
/**
* Promise化，失败后间隔time秒后重新尝试直到reCount次失败后抛出错误
**/
wx._setStorage = function (obj, time = 1000, reCount = 3) {
  return this.promiseApi('setStorage', obj).catch(e => {
    var count = 0;
    function loop() {
      count++;
      return wx.delay(time).then(() => {
        return wx.promiseApi('setStorage', obj).catch(e => {
          if (count < reCount) {
            return loop()
          }
          throw e;
        });
      })
    }
    return loop();
  })
}
/**
* 捕获错误，并尝试reCount次失败后返回''
**/
wx._getStorageSync = function (key, reCount = 2) {
  var count = 0;
  while (count < reCount) {
    try {
      return this.getStorageSync(key);
    } catch (e) {
      count++;
    }
  }
  return '';
}
