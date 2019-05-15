
Page({
  /**
   * 页面的初始数据
   */
  interfaceName: 'SearchList',
  data: {
    header: {
      mode: 'back-search-input',
      // 'class': 'pb0',
      // placeholdClass:'bothHeader',
      title: '壁纸',
      searchKey: '',
      isFocus: false,
      resetShow: false
    },
    footer: {
      mode:'footer-empty',
      btns: ['home', 'sort', 'share'],
      extra: 'footer-sort-extra', //额外的模板   这里试排序选项显示
      sortText: ['按最新排序', '按热度排序', '按总榜排序'],//排序使用
      sortIndex: 0,//排序所以
      isSortItem: false,//是否显示排序内容
    },
    defaultImage:'no-result',
    defaultText:'暂无搜索结果',
    isHideResult:true,
    keyWords: {
      recent: [],
      hot: []
    },
  },
  onLoad({keyword: searchKey = ''}) {
    this.recentKeyWords = wx._getStorageSync('recentKeyWords') || [];
    var obj = {};
    if (searchKey){
      this.firstPage = this.data.header.firstPage;
      this.setData(obj,()=>{
        this.searchHandle(searchKey);
      });
    }else{
      this.getKeyWord().then(res=>{
        obj[`keyWords`] = res;
        this.setData(obj);
      })
    }
  },
  onUnload(){
    this.recentKeyWords.length > 0 && wx._setStorage({
      key: 'recentKeyWords',
      data: this.recentKeyWords,
    })
  },
  searchHandle(e){
    if (this.isLoading) {
      return;
    }
    var value = typeof e === 'string' ? e : e.detail.value.trim();
    if (value === this.data.header.searchKey) return;
    if (value === '') {
      wx.msg('请输入关键词', 1);
      return this.setData({
        'header.searchKey': ''
      });
    }
    //如果历史搜索关键字么有此关键字，则添加
    var currentIndex = this.data.currentIndex;
    var recentKey = this.checkKeyWord(value);
    var obj = {
      isHideResult: !1,
      'header.searchKey': value,
      ['keyWords.recent']: recentKey,
      'header.resetShow': !0,
      'footer.mode':null
    }
    if (this.firstPage){
      obj['header.firstPage'] = false;
    }
    //关闭搜索关键字页，显示搜索结果页
    obj.defaultPage = false
    if (this.dataList.length !== 0) {
      this.dataList = [];
      this.pageIndex = 0;
      this.hasNext = !0;
      obj.paddingTop = 0;
      obj.beforeIndex = -this.every;
      obj.afterIndex = this.every * 2;
      this.sectionIndex = 0;
      this.dataCache = []
    }
    this.__reSetData(obj, this.__loadedMore);
  },
  inputHandle(e){
    var value = e.detail.value.trim();
    if (value === '') {
      this.data.header.resetShow && this.setData({
        'header.resetShow': !1
      })
    } else {
      !this.data.header.resetShow && this.setData({
        'header.resetShow': !0
      })
    }
  },
  resetHandle(){
    var obj = {
      'header.resetShow': !1,
      isHideResult: !0,
      'header.isFocus': !0,
      'header.searchKey': '',
      isHideBackTop: !0,
      'footer.mode': 'footer-empty'
    }
    if (this.firstPage){
      obj['header.firstPage'] = true
    }
    // paddingTop: 0,//列表按模块处理  当到达n模块时   占用n-2模块的位置，
    //   beforeIndex: -every,//显示范围
    //     afterIndex: every * 2,
    //       every,//每48个为一个模块
    // subNavIndex: 0,
    //   sectionPoistion:[],//每个模块的位置
    //     sectionIndex:0,//当前在哪个模块
    if (this.dataList.length !== 0) {
      obj.dataList = [];
      obj.paddingTop = 0;
      obj.beforeIndex = -this.every;
      obj.afterIndex = this.every * 2;
      this.pageIndex = 0;
      this.hasNext = !0;
      this.sectionIndex = 0;
      this.dataCache = [];
    }
    this.__reSetData(obj);
    // if (this.data.keyWords[this.data.currentIndex].hot.length === 0) {
    //   this.__getKeyWord({}, this.data.currentIndex)
    // }
  },
  clearRecentKey(){
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确认要清空最近搜索？',
      confirmText: '清空',
      success: (res) => {
        if (res.confirm) {
          _this.setData({
            ['keyWords.recent']: []
          })
          _this.recentKeyWords = []
        }
      }
    })
  },
  keySearch(e) {
    var value = e.target.dataset.value;
    if(value === undefined) return;
    this.searchHandle(value);
  },
  __supplementParam(obj) {
    obj.word = this.data.header.searchKey;
    obj.sort = this.data.footer.sortIndex + 1;
  },
  __addShare(obj) {
    obj.path = this.route + '?keyword=' + this.data.header.searchKey
  },
  back() {
    if (this.data.isHideResult) {
      wx.navigateBack({
        delta: 1,
      });
    } else {
      this.resetHandle()
    }
  },
  checkKeyWord(value){
    var recentKeywords = this.recentKeyWords
    var index = recentKeywords.indexOf(value);
    if(index === -1) {
      recentKeywords.unshift(value);
      if (recentKeywords.length > 10) {
        recentKeywords.pop();
      }
    } else {
      recentKeywords.unshift(recentKeywords.splice(index, 1)[0]);
    }
    return recentKeywords
  },
  getKeyWord(_type = this.data.currentIndex) {
    var recentKeywords = this.recentKeyWords || [];
    return wx._request({ url: 'SearchWord' })
      .then((res) => {
        return {
          recent: recentKeywords,
          hot: res.Data || []
        }
      })
      .catch(() => {
        return {
          recent: recentKeywords,
          hot: []
        }
      })
  }
})
