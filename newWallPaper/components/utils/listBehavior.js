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
    listStatus: 'pending', //pending/reslove/reject 
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
      var scrollTop = e.detail.scrollTop, obj = {};
      // var _isHideBackTop = !(scrollTop > 800 && deltaY > 0 && scrollTop + wx.windowHeight < scrollHeight);
      var _isHideBackTop = scrollTop < 1200;
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
        data: Object.assign({
          pageindex: this.pageIndex,
          pagesize: this.pageSize || 20
        }, this.params),
        url: this.interfaceName
      }).then((res) => {
          var __data = res.Data;
          var obj = {};
          this.isLoading = !1;
          this.hasNext = __data === null ? !0 : (__data.hasNext || __data.HasNext);
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
          // wx.promiseApi('getNetworkType').then(res=>{
          //   if (res.networkType === 'none') {
          //     this.setData({
          //       'netWork': !1,
          //     });
          //   }
          // })

        });
    },
    __dealWithData(data, obj) {
      obj.dataList = this.data.dataList.concat(data.DataList || []);
      obj.dataList = filter.dones(obj.dataList);
      if (obj.dataList.length === 0) (obj.listStatus = 'reject')
      else{
        obj.dataList.length < 6 && (obj.LoadingText = '');
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
