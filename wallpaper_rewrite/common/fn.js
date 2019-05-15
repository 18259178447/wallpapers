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
      method.call(this, options);
      target = null;
    }
  } else {
    target[methodName] = callback;
    target = null;
  }
}

/**
* 提示
*@param title 提示内容
*@param isImage 是否提供提示图片(成功提示 填false   失败提示 true    默认false)
*@param time 提示显示时间
**/
wx.msg =  function (title, isImage, time) {
  var obj = {
    title: title,
    icon: 'success',
    duration: time || 1000
  }
  if (isImage) {
    obj.image = '/common/tip.png'
  }
  wx.showToast(obj);
}
/**
* 模态提示
*@param content 提示内容
*@param title 提示标题
*@param showCancel 是否显示取消
**/
wx.modal = function (content,title, showCancel = true){
  return wx.promiseApi('showModal', {
    title: title || '提示',
    content,
    showCancel
  })
}
/**
* rpx单位转px
*@param rpx 需要转换的单位数值
*@return [number] 转换后数值
**/
wx.rpx2px = function(rpx){
  return wx.windowWidth / 750 * rpx;
}
/**
* px单位转rpx
*@param px 需要转换的单位数值
*@return [number] 转换后数值
**/
wx.px2rpx = function(px){
  return 750 / wx.windowWidth * px;
}

/**
* 在范围内生成随机整数
*@param min 范围最小值
*@param max 范围最大值
*@return [number] 随机数
**/
wx.random = function(min, max, count){
  if (!count || count == 1) return Math.floor((max - min + 1) * Math.random()) + min
  var arr = [];
  while(count--){
    arr.push(this.random(min,max));
  }
  return arr;
}


wx.getRect = function (selector) {
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery().select(selector).boundingClientRect(resolve).exec()
  })
}
wx.getRectsLoop = function(selector){
  return new Promise((resolve, reject) => {
    var count = 0;
    function loop() {
      wx.createSelectorQuery().selectAll(selector).boundingClientRect((res) => {
        if (res.length > 0) {
          resolve(res);
        } else {
          if (count < 4) {
            count++;
            setTimeout(loop, 100)
          } else {
            reject();
          }
        }
      }).exec()
    }
    setTimeout(loop, 100)
  })
}

wx.promiseApi = function(name,obj = {}){
  return new Promise((resolve,reject)=>{
      obj.success = resolve;
      obj.fail = reject;
      this[name](obj);
      obj = null;
  });
}
wx.loading = function(title,time){
  wx.showNavigationBarLoading();
  wx.showToast({
    title: title || "Loading……",
    duration: time || 2e4,
    icon: "loading",
    mask:true
  });
}
wx.closeLoading = function(){
  wx.hideToast();
  wx.hideNavigationBarLoading();
}

/**
* 把字符串str里的汉字转换成unicode
*@param str 需要转换的字符串
*@return [string] 转换后的字符串
**/
wx.toUnicode = function (str) {
  return str.replace(/[\u4e00-\u9fa5]+/g, function (chinese, index) {
    var s = '';
    for (var i = 0; i < chinese.length; i++) {
      s += chinese.charCodeAt(i).toString(16);
    }
    s = "@" + s + "@"
    return s
  })
}
/**
* 把字符串str里的unicode转换成汉字（只能转经过toUnicode方法转换过的字符串）
*@param str 需要转换的字符串
*@return [string] 转换后的字符串
**/
wx.toChinese = function (str) {
  return str.replace(/@(.+?)@/g, function (a, unicode) {
    var s = "";
    for (var i = 0; i < unicode.length; i += 4) {
      s += String.fromCharCode(parseInt(unicode.slice(i, i + 4), 16).toString(10));
    }
    return s;
  })
}

wx.getDistance = function(time) {
  // time = '/Date(1506649390000)/'
  time = parseInt(time.slice(6));
  var disMinutes = (Date.now() - time) / 1000 / 60;
  if (disMinutes < 1) return '刚刚';
  if (disMinutes < 60) return parseInt(disMinutes) + '分钟前';
  if (disMinutes < 60 * 24) return parseInt(disMinutes / 60) + '小时前';
  if (disMinutes < 60 * 24 * 2) return '昨日';
  if (disMinutes < 60 * 24 * 3) return '前天';
  time = new Date(time);
  return `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日`
}

/**
* 广告上报
*@param adID 广告id
*@param dataType 上报类型 1点击 2 曝光
*@return [object] 上报后的promise对象
**/
wx.adReport = function (adID, dataType){
  if (!wx.userInfo.userID) return wx.loginPromise.then(this.adReport.bind(this, adID, dataType));
  // _type 1点击 2 曝光
 return this._request({
    url: 'AddStatistics',
    data: {
      adID,
      userID: wx.userInfo.userID,
      dataType
    }
  })
}

wx.formatDate = function(date) {
  if (typeof date === 'string') {
    date = new Date(parseInt(date.slice(6)));
  }
  const month = date.getMonth() + 1;
  const day = this.checkTime(date.getDate());
  const hour = this.checkTime(date.getHours());
  const minute = this.checkTime(date.getMinutes());
  return `${month}月${day}日 ${hour}:${minute}`
}

wx.checkTime = function(value) {
  return value < 10 ? "0" + value : value
}