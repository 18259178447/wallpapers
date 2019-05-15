// pages/new/new.js
Page({
  noCache: true,
  /**
   * 页面的初始数据
   */
  data: {
    header: { title: '收藏' },
    isDeleteSelected: false,
    footer: {
      mode: 'delete-ctrl',
      isDeleteCtrlHide: false,
      deleteCtrlfrontHidden: false
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.selectedStr = '';
    this.__loadedMore()
  },
  onShow(){
    if(this.dataList.length > 0){
      this.selectedStr = '';
      this.pageIndex = 0;
      this.hasNext = true;
      this.dataCache = [];
      this.dataList = [];
      this.__loadedMore()
    }
  },
  clickImage(e) {
    var index = e.target.dataset.index;
    if (index === undefined) return;
    if (this.data.isDeleteSelected) {//如果是打开了删除状态，则选择图片
      var selectedStr = this.selectedStr;
      var _deleteSelected = this.dataList[index].deleteSelected;//是否已经选择了
      if (_deleteSelected) {
        selectedStr = selectedStr.replace(index + ';', '');
      } else {
        selectedStr += index + ';';
      }
      this.selectedStr = selectedStr;
      var obj = {};
      obj['dataList[' + index + '].deleteSelected'] = !_deleteSelected;
      this.__reSetData(obj)
    } else {
      this.preview(e);
    }
  },
  __getData() {
    var dataCache, filterStr = '', oldLen, sliceStart = this.pageIndex * this.pageSize, hasNext = true;
    if (this.dataCache.length > 0) dataCache = this.dataCache;
    else {
      dataCache = (wx._getStorageSync('collectData') || []);
      oldLen = dataCache.length;
      dataCache = dataCache.filter(item => {
        var id = item.PicInfoID || item.ID,
          b = filterStr.indexOf(id) === -1;
        if (b) filterStr += id + ';';
        return b;
      })
      filterStr = '';
      if (oldLen !== dataCache.length) {
        wx._setStorage({
          key: 'collectData',
          data: dataCache,
        })
      }
      this.dataCache = dataCache;

    }
    hasNext = dataCache.length > sliceStart + this.pageSize;
    if (dataCache.length === 0) this.setData({ 'footer.isDeleteCtrlHide': true })
    dataCache = dataCache.slice(sliceStart, sliceStart + this.pageSize);

    return Promise.resolve({
      Data: {
        hasNext,
        DataList: dataCache
      }
    }).then(this.__success)
  },
  toggle(e) {

    this.setData({
      'footer.deleteCtrlfrontHidden': !this.data.footer.deleteCtrlfrontHidden,
      'isDeleteSelected': !this.data.footer.deleteCtrlfrontHidden,
    })
  },
  deleteSubmit() {
    if (!this.selectedStr) {
      return wx.msg('请先勾选', 1);
    }

    wx.modal('确认要删除？').then(res => {
      if (res.confirm) {
        var dataCache = this.dataCache;
        var dataList = this.dataList;
        this.selectedStr.slice(0, -1).split(';').sort((a, b) => { return b - a }).forEach((index) => {
          dataList.splice(index, 1);
          dataCache.splice(index, 1);
        });
        this.selectedStr = '';
        this.__reSetData({
          dataList,
          'footer.deleteCtrlfrontHidden': false,
          'isDeleteSelected': false,
          'footer.isDeleteCtrlHide': dataList.length === 0
        }, () => {
          wx.msg('删除成功');
          if (dataList.length < 16) this.__loadedMore();
          wx._setStorage({
            key: 'collectData',
            data: dataCache,
          })
        })
      }
    })
  },
  __filterList(data) {
    return data.map(item => {
      return {
        ThumbImage: item.ThumbImage
      }
    })
  },
})