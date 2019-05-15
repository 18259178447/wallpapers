'use strict';
import filter from '../utils/filter'
var loadingTipText = wx.loadingTipText = {
      loading:'正在加载中...',
      noData:'暂无壁纸',
      noMore:'到底啦!',
      error:'加载错误，请刷新重试'
    },
    listKeys =',dataList,LoadingText,Error,scrollTop,defaultPage,beforeIndex,afterIndex,paddingTop,';
function List() {
  wx.Base.call(this);
  /** 动态数据**/
  Object.assign(this.data, {
    currentIndex: 0,//当前列表索引
  });
  this.scrollPos = 0;//滚动位置
  this.pageSize = 30;
  this.everyCount = 48;
  this._sectionPoistion = [];
}

List.prototype = Object.create(wx.Base.prototype);
Object.assign(List.prototype, {
  onReachBottom_(e) {
    if (this.isLoading || !this.hasNext) return;
    if (this.LoadingText !== loadingTipText.loading) {
      this.__reSetData({
        LoadingText: loadingTipText.loading,
      })
    }
    this.__loadedMore();
  },
  onPageScroll_(e) {
    this.scrollPos = e.detail.scrollTop;
    this.scrollThrottle(e);
  },
  scrollThrottle: wx.throttle(function (e) {
    var { deltaY, scrollTop, scrollHeight } = e.detail, obj = {};
    var _isHideBackTop = scrollTop < 1800;
    if (this.observePos) {//用于判断是否超过观察位置
      var _isCrossPos = scrollTop >= this.observePos;
      if (_isCrossPos !== this.data.isCrossPos) {
        obj.isCrossPos = _isCrossPos;
      }
    }
    if (_isHideBackTop !== this.data.isHideBackTop) {//用于判断是否需要隐藏返回顶部按钮
      obj.isHideBackTop = _isHideBackTop;
      this.isHideBackTop = _isHideBackTop;
    }
    this.switchSection();
    if (!wx.isEmpty(obj)) {
      this.__reSetData(obj);
    }
  }, 200, { leading: false }),
  switchSection() {
    var sectionIndex = this.sectionIndex;
    var sectionPos = this.sectionPoistion[sectionIndex];
    var scrollPos = this.scrollPos;
    if (scrollPos > sectionPos) {
      let sectionPoistionLen = this.sectionPoistion.length;
      for (var i = sectionIndex + 1; i < sectionPoistionLen; i++) {
        if (this.sectionPoistion[i] > scrollPos) {
          break;
        } else {
          sectionIndex++;
        }
      }
    } else {
      sectionIndex--;
      for (var i = sectionIndex; i >= 0; i--) {
        if (this.sectionPoistion[i] < scrollPos) {
          break;
        } else {
          sectionIndex--;
        }
      }
      if (sectionIndex < 0) sectionIndex = 0;
    }

    if (this.sectionIndex !== sectionIndex) {
      this.sectionIndex = sectionIndex;
      this.__reSetData({
        paddingTop: sectionIndex > 1 ? this.sectionPoistion[sectionIndex - 1] - this.sectionPoistion[0] : 0,
        beforeIndex: Math.max((sectionIndex - 1) * this.every, 0),
        afterIndex: (sectionIndex + 2) * this.every
      })
    }
  },
  /*===========================================================================================*/
  preview(e) {
    var index = e.target.dataset.index;
    wx.page = this;
    wx.navigateTo({
      url: '/pages/preview/preview?index=' + index + '&suffix=' + (this.suffix || 'bz')
    })
  },
  backTop() {
    this.sectionIndex = 0;
    this.__reSetData({
      paddingTop: 0,
      beforeIndex: -1 * this.every,
      afterIndex: 2 * this.every,
      scrollTop: 0
    })
  },
  /**重试**/
  reTry() {
    var _this = this;
    wx.getNetworkType({
      success: function (res) {
        var obj = {};
        if (res.networkType !== 'none') {
          obj.Error = !1;
          obj.LoadingText = loadingTipText.loading;
          obj['netWork'] = !0;
          _this.__loadedMore();
        } else {
          obj['netWork'] = !1;
          wx.msg('请检查网络', 1);
        }
        _this.__reSetData(obj);
      }
    })
  },

  /**加载更多**/
  __loadedMore() {
    var p = this.__getData()
    // if (p) {
    //   p.then(this.__checkSection)
    // }
    return p || Promise.resolve('');
  },
  /**检查模块个数和模块的标志位置个数是否符合**/
  __checkSection() {
    var sectionCount = Math.ceil(this.pageSize * this.pageIndex / this.every);
    if (sectionCount > this.sectionPoistion.length) {
      var listIndex = this.listIndex;
      wx.getRectsLoop('.benchmark' + listIndex).then(res => {
        if (listIndex !== this.listIndex) return;//如果在获取过程中，切换了列表，则不更新标志位置,所以切换列表是还需要重新检查
        var len = this.sectionPoistion.length, last = -1000, top = 0, arr = [];
        if (len) last = this.sectionPoistion[len - 1];
        len = res.length - 1;
        while (len >= 0) {
          top = res[len].top + this.scrollPos;
          if (top - last < 500) {
            break;
          }
          arr.unshift(top);
          len--;
        }
        this.sectionPoistion.push(...arr);
        console.log(this.sectionPoistion)
      }).catch(e => { })
    }
  },
  __createRelatives(listIndex,name){
    if (this.data.listNav){
      var { everyCount,diffPos} = this.data.listNav[listIndex] || {};
    }
    var every = everyCount || this.everyCount;
    name = name || this.listName;
    
    var dynamics = {
      dataList: [],
      LoadingText: loadingTipText.loading,
      scrollTop: 0,
      paddingTop: 0,//列表按模块处理  当到达n模块时   占用n-2模块的位置，
      beforeIndex: 0,//显示范围
      afterIndex: every * 2,
      every,//每48个为一个模块
      listIndex//当前列表索引
    };
    var statics = {
      hasNext: !0,
      pageIndex: 0,
      isHideBackTop: !0,
      sectionPoistion: this._sectionPoistion,//每个模块的位置
      sectionIndex: 0,//当前在哪个模块
      dataCache:[]
    }
    if (this.data.listNav){
      if (diffPos) statics.sectionPoistion = [];
      this.setData({
        [`${name}[${listIndex}]`]: dynamics
      });
      this[name][listIndex] = statics;
      Object.assign(this, {
        dynamicRelative: this.data[name][listIndex],
        staticRelative: statics,
        dynamicKey: name + '[' + listIndex + '].'
      })
    }else{
      this.data[name] = dynamics;
      this[name] = statics;
      Object.assign(this,{
        staticRelative: statics,
        dynamicKey: name + '.'
      })
    }
  },
  __getRelative() {
    var relativeD = this.data[this.dataName];
    var relativeS = this[this.dataName];
    var isArr = Array.isArray(relativeD);
    var obj = {
      dynamicRelative: isArr ? relativeD[this.index] : relativeD,
      staticRelative: isArr ? relativeS[this.index] : relativeS,
      dynamicKey: isArr ? this.dataName + '[' + this.index + '].' : this.dataName + '.'
    }
    Object.assign(this, obj);
    return obj;
  },
  /**
  *重写setData,相同性质属性不同接口调用一致
  *比如需要改变LoadingText
  **/
  __reSetData(obj,callback) {
    for (var key in obj) {
      if (listKeys.indexOf(',' + key + ',') > -1 || key.indexOf('dataList') > -1) {
        obj[this.dynamicKey + key] = obj[key];
        delete obj[key];
      }
    }
    this.setData(obj, callback);
  },
  /**获取ajax参数**/
  __getParam() {
    var _data = {
      pageindex: this.pageIndex,
      pagesize: this.pageSize || 30
    };
    return this.__emit('__supplementParam', _data) || _data;
  },
  __getData() {
    if (this.isLoading) return;
    this.isLoading = !0;
    return wx._request({ data: this.__getParam(), url: this.interfaceName })
      .then((this.__success))
      .catch(this.__fail);
  },
  /**
  *获取数据成功后回调
  *@param res 获取的数据
  **/
  __success(res) {
    var __data = res.Data;
    var obj = {};
    this.isLoading = !1;
    this.hasNext = __data === null ? !0 : (__data.hasNext || __data.HasNext);
    this.pageIndex++;
    if (this.Error) {
      obj.Error = !1
    }
    if (!this.hasNext) {
      obj.LoadingText = loadingTipText.noMore
    }
    return this.__emit('__dealWithData', __data, obj);
  },
  /**获取数据调用失败回调**/
  __fail(e) {
    wx.stopPullDownRefresh();
    this.isLoading = !1;
    if (!e.errMsg) return console.log(e);
    var errMsg = e.errMsg;
    if (errMsg.indexOf('fail ssl') > -1 || errMsg === "request:fail abort") return;
    if (errMsg.indexOf('createRequestTask:fail:interrupted') > -1) return this.__loadedMore();
    var _this = this;
    wx.getNetworkType({
      success: function (res) {
        if (res.networkType === 'none') {
          _this.setData({
            'netWork': !1,
          });
        } else {
          _this.__reSetData({
            Error: !0,
            LoadingText: loadingTipText.error
          })
        }
      }
    })
  },
  __dealWithData(data, obj) {
    data = this.correctData ? (this.correctData(data, obj) || []) : (data.DataList || []);//有的数据不一定在DataList里 所以需要correctData

    if (!this.noCache) this.dataCache = this.dataCache.concat(data)//不是所有的数据都需要缓存的

    obj.dataList = this.dataList.concat(this.__filterList ? this.__filterList(data) : filter[this.filterName || 'base'](data));
    if (obj.dataList.length < (this.thresholdData || 16)) {
      obj.LoadingText = '';
      obj.dataList.length ===0 && (obj.defaultPage = true);
    }
    this.__reSetData(obj);
  },
  change: function (e) {
    var obj = {};
    var currentIndex = +e.detail.current;
    this.listIndex = currentIndex;
    wx.abort();
    this.__emit('changeBefore', currentIndex, obj);
    obj.currentIndex = currentIndex;
    obj.isHideBackTop = this.isHideBackTop;
    if (this.positionArr) {
      obj.scrollLeft = this.positionArr[currentIndex];
    }
    this.setData(obj);
    if (this.dataList.length === 0 && this.hasNext) {
      this.isLoading = false
      this.__loadedMore();
    }
  },
  navSwitch: function (e) {
    var index = e.target.dataset.index;
    if (index === undefined || index === this.data.currentIndex) return;
    var obj = {
      currentIndex: index,
    }
    if (this.data.header.hasNavView) {
      obj['header.isNavView'] = false;
    }
    this.setData(obj);
  },
  toggle(e,obj){
    var _toggle = e.target.dataset.toggle,res = this.data;;
    if (!_toggle) return;
    _toggle.split('.').forEach(item=>{
      res = res[item]
    });
    if (obj) obj[_toggle] = !res;
    else{
      this.setData({
        [_toggle]:!res
      })
    }
  },
  sortSelected(e){
    var index = e.target.dataset.index;
    if (index === undefined || index === this.data.footer.sortIndex) return;
    this.sectionPoistion = [];
    this.sectionIndex = 0;
    this.dataList = [];
    this.dataCache = []
    this.pageIndex = 0;
    this.hasNext = true;
    var obj = {
      ['footer.sortIndex']: index,
      ['footer.isSortItem']: false,
    }
    this.__emit('sortSelectedAfter', index)
    this.setData(obj,this.__loadedMore)
  },
  // __checkBuyAddData(data, listName, threshold = 0) {
  //   var reward = wx.toggle('rewardStr');
  //   var noBuy, obj = {};
  //   data.forEach((item, index) => {
  //     if (item.PriceType) {
  //       noBuy = !reward.has(item.PicInfoID)
  //       if (item.noBuy !== noBuy) {
  //         obj[`${listName}[${threshold + index}].noBuy`] = noBuy;

  //       }
  //     }
  //   })
  //   return obj;
  // },
});

function filterList(data){
  return data.map(item => {
    return item.ThumbImage || item.Image;
  })
}

wx.List = List;