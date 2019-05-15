
Page({
  /**
   * 页面的初始数据
   */
  interfaceName: 'SearchList',
  data: {
    header: {
      mode: 'back-search-input',
      'class': 'pb0',
      placeholdClass:'bothHeader',
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
    keyWords: [
      {
        recent: [],
        hot: []
      },
      {
        recent: [],
        hot: []
      },
      {
        recent: [],
        hot: []
      }
    ],
  },
  onLoad({ currentIndex = 0, keyword: searchKey = ''}) {
    this.suffix = ['bz', 'bq', 'tx'][currentIndex];
    this.recentKeyWordsObj = wx._getStorageSync('recentKeyWordObj') || {};
    currentIndex = +currentIndex;
    var obj = {};
    if (currentIndex !== 0){
      obj['header.title'] = ['表情', '头像'][currentIndex];
      obj.currentIndex = currentIndex
    }

    obj.suffix = this.suffix;
    if (searchKey){
      this.firstPage = this.data.header.firstPage;
      this.setData(obj,()=>{
        this.searchHandle(searchKey);
      });
    }else{
      this.getKeyWord().then(res=>{
        obj[`keyWords[${currentIndex}]`] = res;
        this.setData(obj);
      })
    }
    wx.adPromise.then(res => {
      var adData = res['10004'];
      if (adData && adData.length > 0){
        this.setData({
          adData
        })
      }
    })
  },
  onUnload(){
    !wx.isEmpty(this.recentKeyWordsObj) && wx._setStorage({
      key: 'recentKeyWordObj',
      data: this.recentKeyWordsObj,
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
      ['keyWords[' + currentIndex + '].recent']: recentKey,
      'header.resetShow': !0,
      'footer.mode':null
    }
    if (this.firstPage){
      obj['header.firstPage'] = false;
    }
    
    // var recentKey = this.data.keyWords[currentIndex].recent;
    // var index = recentKey.indexOf(value);
    // if (index === -1) {
    //   recentKey.unshift(value);
    //   if (recentKey.length > 10) {
    //     recentKey.pop();
    //   }
    //   wx._setStorage({
    //     key: "recentKeyWord-" + this.suffix,
    //     data: recentKey
    //   });
    // } else {
    //   recentKey.unshift(recentKey.splice(index, 1)[0]);
    // }
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
    wx.reportAnalytics('search', {
      keyword: value,
      searchtype: currentIndex,
    });
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
    if (this.firstPage) {
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
    var currentIndex = this.data.currentIndex
    wx.showModal({
      title: '提示',
      content: '确认要清空最近搜索？',
      confirmText: '清空',
      success: (res) => {
        if (res.confirm) {
          _this.setData({
            ['keyWords[' + currentIndex + '].recent']: []
          })
          _this.recentKeyWordsObj[_this.suffix] = []
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
    if (this.data.currentIndex === 0) {
      this.interfaceName = 'SearchList';
    } else {
      this.interfaceName = 'EmojiSearchList';
      obj['type'] = this.data.currentIndex;
    }
  },
  correctData(data, obj){
    return data.DataList || data.EmojiList
  },
  __addShare(obj) {
    obj.path = this.route + '?keyword=' + this.data.header.searchKey + '&currentIndex=' + this.data.currentIndex
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
  change: function (e) {
    var obj = {};
    var currentIndex = e.detail.current;
    obj.currentIndex = currentIndex;
    obj.suffix = this.suffix = ['bz', 'bq', 'tx'][currentIndex];
    if (this.data.keyWords[currentIndex].hot.length === 0) {
      this.getKeyWord(currentIndex).then(res=>{
        obj[`keyWords[${currentIndex}]`] = res;
        this.setData(obj);
      })
    } else {
      this.setData(obj);
    }
  },
  navSwitch(e){
    var index = e.target.dataset.index;
    if(index === undefined) return;
    this.setData({
      currentIndex: index,
    })
  },
  checkKeyWord(value){
    var recentKeywords = this.recentKeyWordsObj[this.suffix];
    if (!recentKeywords){
      recentKeywords = this.recentKeyWordsObj[this.suffix] = []
    }
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
    var recentKeywords = this.recentKeyWordsObj[this.suffix] || [];
    var param = { url: _type === 0 ? 'SearchWord' : 'EmojiSearchWord' }
    if (_type !== 0) {
      param.data = {
        'type': _type
      }
    }
    return wx._request(param)
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
