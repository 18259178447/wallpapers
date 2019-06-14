var filter = require('./filter.js')
var loadingTipText = {
  loading: '正在加载中...',
  noData: '暂无数据',
  noMore: '到底啦!',
  error: '加载错误，请刷新重试'
};
wx.loadingTipText = loadingTipText;
module.exports = Behavior({
  properties: {
    placeholdHeader: {//
      type: [Boolean, String]
    },
    placeholdFooter: {//
      type: [Boolean, String]
    },
  },
  data: {
    dataList: [],
    listStatus: 'resolve', //pending/reslove/reject 
    scrollTop: 0,
    isHideBackTop:true,
    LoadingText: loadingTipText.loading,
  },
  methods: {
    init(obj = {}) {
      var dataObj = {};
      if(!wx.isEmpty(obj)){
        this.params = obj.data || {};
        delete obj.data;
        Object.assign(this, obj);
      }
      if (this.pageIndex !== 0) {
        this.hasNext = true;
        this.pageIndex = 0;
      }
      this.reset(dataObj);
      if (!wx.isEmpty(dataObj)){
        this.setData(dataObj)
      }
      this.__loadedMore();
    },
    reset(obj){
      if (this.data.dataList.length === 0 && this.data.listStatus === 'pending') return;
      var resetObj = {
        dataList: [],
        scrollTop: 0,
        LoadingText: loadingTipText.loading,
        listStatus: 'pending',
        isHideBackTop: true
      }
      this.hasNext = true;
      this.pageIndex = 0;
      if (obj) return Object.assign(obj, resetObj);
      this.setData(resetObj)
    },
    __loadedMore() {
      return this.__getData() || Promise.resolve('');
    },
    onReachBottom_() {
      if (this.isLoading || !this.hasNext) return;
      if (this.LoadingText !== loadingTipText.loading) {
        this.setData({
          LoadingText: loadingTipText.loading,
        })
      }
      this.__loadedMore();
    },
    onPageScroll_(e) {
      this.scrollPos = e.detail.scrollTop;
      if (this.scroll) {
        this.triggerEvent('scroll', { scrollTop: e.detail.scrollTop });
      }
      this.scrollThrottle(e);
    },
    scrollThrottle: wx.throttle(function (e) {
      var { scrollTop, scrollHeight, deltaY} = e.detail, obj = {};
      var _isHideBackTop = !(scrollTop > 800 && deltaY > 0 && scrollTop + wx.windowHeight < scrollHeight);
      // var _isHideBackTop = scrollTop < 1200;
      if (_isHideBackTop !== this.data.isHideBackTop) {//用于判断是否需要隐藏返回顶部按钮
        obj.isHideBackTop = _isHideBackTop;
      }
      if (!wx.isEmpty(obj)) {
        this.setData(obj);
      }
    }, 200),
    __getData() {
      if (this.isLoading) return;
      this.isLoading = !0;
      
      return wx._request({
        data: Object.assign( wx.safe ? {
          pageindex: this.pageIndex,
          pagesize: this.pageSize || 16
        } : {page:this.pageIndex + 1}, this.params),
        url: this.interfaceName
      }).then((res) => {
        var obj = {};
        this.isLoading = !1;
          if (wx.safe) {
            var __data = res.Data;
            this.hasNext = __data === null ? !0 : (__data.hasNext || __data.HasNext);
          }else{
            __data = {
              DataList: res.data || []
            };
            if(!this.every){
              this.every = __data.DataList.length;
            }
            this.hasNext = __data.DataList.length >= this.every
          }
          this.pageIndex++;
          if (!this.hasNext) {
            obj.LoadingText = ''
          }
          this.__dealWithData(__data, obj);
        })
        .catch((e) => {
          this.isLoading = !1;
          if (!e.errMsg) return console.log(e);
          var errMsg = e.errMsg;
          if (errMsg.indexOf('fail ssl') > -1 || errMsg === "request:fail abort") return;
          if (errMsg.indexOf('createRequestTask:fail:interrupted') > -1) return this.__loadedMore();

        });
    },
    __dealWithData(data, obj) {
      data = this.correctData ? this.correctData(data, obj) : (data.DataList || []);
      
      var len = this.data.dataList.length + data.length;
      Object.assign(obj, getDataConcatObj(this.data.dataList, filter.dones(data, this.filterFn || 'wallpaper')));
      
      if (len === 0) (obj.listStatus = 'reject')
      else{
        len < 6 && (obj.LoadingText = '');
        this.data.listStatus !== 'resolve' && (obj.listStatus = 'resolve')
      }
      this.setData(obj)
    },
    backTop(){
      this.setData({
        scrollTop: this.data.scrollTop + 0.01
      })
    }
  }
})


function getDataConcatObj(sourceArr,targetArr,key = 'dataList'){
   if(!targetArr || !targetArr.length) return {};
  var sourceLen = sourceArr.length;
  var obj = {};
  targetArr.forEach((item,index)=>{
    obj[`${key}[${sourceLen + index}]`] = item;
  })
  return obj;
}