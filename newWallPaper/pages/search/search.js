// pages/search/search.js
wx.Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchKey:'',
    focus:false,
    showResult:false,
    showReset:false,
    hotKeys: '漫威,钢铁侠,性感,文字,插画,风景,简约,星空,nba,皮卡丘,海贼王,火影忍者'.split(','),
    historyKeys: [],
  },
  onInit({word}){
    var historyKeys = wx._getStorageSync('historyKeys') || [];
    if (historyKeys){
      this.setData({ historyKeys });
    }
    this.resultList = this.selectComponent('#image-list');
    if (word){
      this.confirmHandle(word);
    }
  },
  confirmHandle(e){
    if (this.isLoading) return;
    var value = typeof e === 'string' ? e : e.detail.value.trim();
    if (value === '') {
      wx.msg('请输入关键词', 'none');
      return this.setData({
        'searchKey': ''
      });
    }
    if (value === this.data.searchKey && this.data.showResult) return;
    this.isLoading = true;
    this.setData({
      showResult: true,
      searchKey: value,
      showReset: true
    }, () => {
      this.isLoading = false
      this.searchInit()
    })
  },
  selectLabel(e) {
    if (e.target.dataset.word === undefined) return
    this.confirmHandle(e.target.dataset.word)
  },
  searchInit() {//搜索初始化并 加载数据
    var word = this.data.searchKey;
    if(wx.safe){
      this.resultList.init({
        interfaceName: 'SearchList',
        data: {
          word
        }
      })
    }else{
      this.resultList.init({
        interfaceName: '',
        data: {
          m: "yj_erha",
          "do": "Wallpaper",
          type:1,
          keyword: word
        }
      })  
    }

    //更新搜索记录
    var index = this.data.historyKeys.indexOf(word);
    this.data.historyKeys.unshift(index > -1 ? this.data.historyKeys.splice(index, 1)[0] : word);
    this.setData({
      historyKeys: this.data.historyKeys.length > 10 ? this.data.historyKeys.slice(0, 10) : this.data.historyKeys
    });
    this.updateHistoryKey = true;
  },
  inputHandle(e) {//输入文字
    var value = e.detail.value.trim();
    if (this.data.showReset === !value) {
      this.setData({
        'showReset': !!value
      })
    }
  },
  resetHandle() {//重置搜索
    var obj = {
      showReset: !1,
      focus: !0,
      searchKey: '',
      showResult: false
    }
    this.setData(obj, () => {
      this.resultList.reset();
    })
  },
  onUnload() {
    if (this.updateHistoryKey) {
      wx._setStorage({
        key: 'historyKeys',
        data: this.data.historyKeys,
      })
    }
  },
  back() {//返回
    if (this.data.showResult) return this.resetHandle();
    if (getCurrentPages().length === 1) {
      return wx.switchTab({
        url: '/pages/index/index',
      })
    }
    wx.navigateBack()
  },
  __addShare(obj) {
    obj.path = `${this.route}?word=${this.data.searchKey}`;
  }
})