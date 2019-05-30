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
    case 'download':
    return {
      data:{
        "header.title":"我的下载"
      },
      _onLoad(options,obj){
        this.setData(obj);
        wx.Tool.saveDownload((downloadData)=>{
          this.selectComponent('#image-list').init({
            downloadData: downloadData.slice(0),
            filterFn:"empty",
            __getData() {
              var data = this.downloadData;
              var start = this.pageIndex * (this.pageSize || 20);
              var end = (++this.pageIndex) * (this.pageSize || 20);
              data = data.slice(start,end);
              this.hasNext = data.length;
              var obj = {};
              if (!this.hasNext) {
                obj.LoadingText = ''
              }
              data = {
                DataList:data
              }
              this.__dealWithData(data, obj);
            }
          })
        });
      }
    }
    break;
    case 'collect':
    return {
      data:{
        "header.title":"我的收藏"
      },
      _onLoad(options,obj){
        this.isload = true;
        this.setData(obj);
        this.loadData();
      },
      onShow(){
        if (!this.isload) return;
        this.loadData();
      },
      loadData(){
        wx.Tool.saveCollect(() => { })
        this.selectComponent('#image-list').init({
          filterFn: "empty",
          __getData() {
            var data = wx.Tool.collectData;
            var start = this.pageIndex * (this.pageSize || 20);
            var end = (++this.pageIndex) * (this.pageSize || 20);
            data = data.slice(start, end);
            this.hasNext = data.length;
            var obj = {};
            if (!this.hasNext) {
              obj.LoadingText = ''
            }
            data = {
              DataList: data
            }
            this.__dealWithData(data, obj);
          }
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