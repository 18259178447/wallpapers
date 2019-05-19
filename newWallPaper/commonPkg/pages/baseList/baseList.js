// commonPkg/pages/baseList/baseList.js

function getPage(name){
  switch(name){
    case 'origin':
    return {
      data:{
        "header.title":"限时免费"
      },
      _onLoad(options,obj){
        if (!wx.safe) return this.backHome();
        this.setData(obj);
        this.selectComponent('#image-list').init({
          interfaceName: 'OriginalList'
        })
      }
    }

    break;
  }
}

wx.Page({

  /**
   * 页面的初始数据
   */
  data: {
    header:{
      title:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onInit: function (options) {
    this.pagename = options.pagename || 'origin'
    var pageObj = getPage(this.pagename);
    var obj = {};
    if (pageObj.data){
      obj = pageObj.data;
      delete pageObj.data;
    }
    for(var key in pageObj){
      let value = pageObj[key];
      this[key] = typeof value === "function" ? value.bind(this) : value;
    }
    this.__emit('_onLoad', options,obj)
  },
  __addShare(obj, e) {
    this.__emit('_addShare', obj, e);
    obj.path += (obj.path.indexOf('?') === -1 ? '?' : '&') + 'pagename=' + this.pagename;
  },
})