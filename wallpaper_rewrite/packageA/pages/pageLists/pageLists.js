import filter from '../../../utils/filter'
function getPage(pageName) {
  var pageObj = null;
  switch (pageName) {
    case 'rankList':
      pageObj = {
        interfaceName: 'WallpaperList',
        data: {
          header: {
            mode: 'back-title-base-nav',
            'class': 'pb0',
            title:'排行榜'
          },
          footer: {
            btns: ['home', 'share']
          },
          template: 'base-wallpaper-list',
          listNav: [
            { title: '一天最热', id: 6},
            { title: '一周排行', id: 7},
            { title: '人气月榜', id: 8},
          ],
        },
        init(options, obj) {
          var currentIndex = +options.currentindex || 0;
          this.listIndex = currentIndex;
          obj.currentIndex = currentIndex;
          this.setData(obj, this.__loadedMore);
        },
        __supplementParam(obj) {
          obj.categoryID = this.data.listNav[this.listIndex].id;
        },
        _addShare(obj) {
          obj.path += '?currentindex=' + this.listIndex
        },
      }
      break;
    case 'authorColumn':
      pageObj = {
        data: {
          header: {
            mode: 'back-nav-list'
          },
          footer: {
            btns: ['home', 'sort', 'share'],
            extra: 'footer-sort-extra', //额外的模板   这里试排序选项显示
            sortText: ['按最新排序', '按热度排序', '按总榜排序'],//排序使用
            sortIndex: 0,//排序索引
            isSortItem: false,//是否显示排序内容
          },
          listNav: [
            { title: '作者', diffPos: true, template: 'authors-list', defaultText:'暂无相关作者' }, 
            { title: '作品', diffPos:true, template: 'original-wallpaper-list' }, 
            { title: '入驻', diffPos:true, template: 'authors-enter' }
          ],
        },
        init({ currentIndex = 1 }, obj) {
          currentIndex = +currentIndex;
          obj.currentIndex = currentIndex;
          this.listIndex = currentIndex;
          this.interfaceName = ['ContractAuthorList', 'OriginalList', 'JoinAuthorInfos'][currentIndex]
          this.setData(obj, this.__loadedMore);
        },
        onShow(){
          if (this.listIndex != 2){
            var isUnlockObj;
            if (this.listIndex === 0 && this.idx !== undefined){
              isUnlockObj = wx.Tool.checkIsUnlock(this.dataCache[this.idx], `dataList[${this.idx}].images`)
              this.idx = undefined;
            } else if (this.listIndex === 1){
              isUnlockObj = wx.Tool.checkIsUnlock(this.dataCache, 'dataList');
            }
            isUnlockObj && this.__reSetData(isUnlockObj);
          }
        },
        changeBefore(currentIndex, obj){
          if (currentIndex === 1){
            this.pageSize = 30;
            this.interfaceName = 'OriginalList';
            this.data.footer.hideSort && (obj['footer.hideSort'] = false)
          }else{
            this.pageSize = 6;
            this.interfaceName = currentIndex === 0 ? 'ContractAuthorList' : 'JoinAuthorInfos';
            !this.data.footer.hideSort && (obj['footer.hideSort'] = true)
          }
        },
        __supplementParam(obj) {
          obj.userID = wx.userInfo.userID;
          if (this.listIndex === 1) {
            obj.sort = this.data.footer.sortIndex + 1;
          }
        },
        __dealWithData(data, obj) {
          var listIndex = this.data.currentIndex;
          if (listIndex === 2){
            obj.dataList = this.dataList.concat(data);
            return this.__reSetData(obj);
          }
          data = data.DataList;
          if (listIndex === 0){
            this.thresholdData = 5;
            let dataCache = this.dataCache;
            data = data.map(item=>{
              dataCache.push(item.MiniOriginalWallpaperInfoArray);
               return {
                 author:{
                   AuthorName: item.AuthorObject.AuthorName,
                   AuthorAvatarUrl: item.AuthorObject.AuthorAvatarUrl,
                   AuthorID: item.AuthorObject.AuthorID,
                   AuthorDesc: item.AuthorObject.AuthorDesc,
                 },
                 images: filter.original(item.MiniOriginalWallpaperInfoArray)
               }
            })
            obj.dataList = this.dataList.concat(data)
            dataCache = null;
          }else if(listIndex === 1){
            this.thresholdData = 16;
            this.dataCache = this.dataCache.concat(data);
            obj.dataList = this.dataList.concat(filter.original(data))
          }
          if (obj.dataList.length < this.thresholdData) {
            obj.LoadingText = '';
            obj.dataList.length === 0 && (obj.defaultPage = true);
          }
          this.__reSetData(obj);
        },
        _addShare(obj) {
          obj.path += '?currentIndex=' + this.listIndex
        },
        oriPreview(e){
          var { index, idx } = e.target.dataset;
          if(index === undefined) return;
          wx.page = {
            hasNext: false,
            dataCache: this.dataCache[idx],
          }
          this.idx = idx;
          wx.navigateTo({
            url: '/pages/preview/preview?index=' + index + '&suffix=bz'
          })
        }
      }
      break;
    case 'collectList':
      pageObj = {
        data: {
          header: {
            mode: 'back-search-scroll-nav',
            placeholdClass: 'bothHeader',
            'class': 'pb0',
            title: '我的收藏'
          },
          defaultImage:'no-collect',
          listNav: [
            { CategoryName: '壁纸', inter: 'CollectionList', template:'base-wallpaper-list' },
            { CategoryName: '专辑', inter: 'AlbumCollectList', template: 'base-album-list' },
            { CategoryName: '动态视频', inter: 'CollectionList', template: 'dynamic-wallpaper-list' },
            { CategoryName: '表情', inter: 'networkpiccollectionlist', template: 'avatar-emote-list' },
            { CategoryName: '头像', inter: 'networkpiccollectionlist', template: 'avatar-emote-list' }, 
          ].map(item => {
            item.defaultText = `快去收藏${item.CategoryName}吧`
            return item
          })
        },
        init({ userid = wx.userInfo.userID, username = '游客', currentindex = 0}, obj) {
          userid = +userid;
          var currentIndex = +currentindex;
          this.listIndex = currentIndex;
          if (wx.userInfo.userID !== userid) obj.title = username + '的收藏';
          this.suffix = currentIndex < 3 ? 'bz' : (currentIndex === 3 ? 'bq' : 'tx');
          this.userID = userid;
          this.username = username;
          obj.currentIndex = currentIndex;
          this.setData(obj, () => {
            //获取导航位置
            wx.getRectsLoop('.nav-item').then(res => {
              var positionArr = [];
              res.forEach((item, index) => {
                positionArr.push(item.left + (item.width - wx.windowWidth >> 1))
              });
              this.positionArr = positionArr;
              currentIndex > 1 && this.setData({
                scrollLeft: positionArr[currentIndex]
              })
            }).then(this.__loadedMore);
          });
          obj = null;
        },
        changeBefore(currentIndex, obj) {
          this.suffix = currentIndex < 3 ? 'bz' : (currentIndex === 3 ? 'bq' : 'tx');
          if(currentIndex == 1){
            this.filterName = 'album'
          }else{
            this.filterName = 'base'
          }
        },
        __supplementParam(obj) {
          this.interfaceName = this.data.listNav[this.listIndex].inter;
          obj.userID = this.userID;
          if (this.listIndex > 2) {
            obj.type = this.listIndex === 3 ? 1 : 3
          }else if(this.listIndex != 1){
            obj.type = this.listIndex
          }
        },
        _addShare(obj) {
          obj.path += '?userid=' + this.userID + '&username=' + this.username + '&currentindex=' + this.data.currentIndex
        },
      }
      break;

    case 'downloadList':
      pageObj = {
        noCache: true,
        data: {
          header: {
            mode: 'back-title-base-nav',
            'class': 'pb0',
            title: '我的下载'
          },
          footer:{
            mode:'delete-ctrl',
            isDeleteCtrlHide:false,
            deleteCtrlfrontHidden:false
          },
          defaultImage: 'no-download',
          template:'can-delete-list',
          listNav: [
            { title: '壁纸', listClass: 'can-delete-wallpaper-list' },
            { title: '动态视频', listClass: 'can-delete-dynamic-wallpaper-list' },
            { title: '表情', listClass: 'can-delete-avatar-emote-list' },
            { title: '头像', listClass: 'can-delete-avatar-emote-list' },
          ].map(item => {
            item.defaultText = `快去下载${item.title}吧`
            return item
          }),
          others:{
            isDeleteSelected:false
          }
        },
        init(options, obj) {
          this.listIndex = 0;
          this.selectedStr ='';
          this.setData(obj,this.__loadedMore);
        },
        clickImage(e) {
          var index = e.target.dataset.index;
          if(index === undefined) return;
          if (this.data.others.isDeleteSelected) {//如果是打开了删除状态，则选择图片
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
        deleteSubmit(){
          if (!this.selectedStr) {
            return wx.msg('请先勾选', 1);
          }
          wx.modal('确认要删除？').then(res=>{
            if (res.confirm){
              var dataCache = this.dataCache;
              var dataList = this.dataList;
              this.selectedStr.slice(0, -1).split(';').sort((a, b) => { return b - a }).forEach((index) => {
                  dataList.splice(index, 1);
                  dataCache.splice(index, 1);
              });
              this.selectedStr = '';
              this.__reSetData({
                dataList,
                'footer.deleteCtrlfrontHidden':false,
                'others.isDeleteSelected':false,
                'footer.isDeleteCtrlHide': dataList.length === 0
              },()=>{
                wx.msg('删除成功');
                if (dataList.length < 16) this.__loadedMore();
                wx._setStorage({
                  key: 'downloadData-' + (this.listIndex === 1 ? 'sp' : (this.suffix || 'bz')),
                  data: dataCache,
                })
              })
            }
          })
        },
        toggle(e){
          this.setData({
            'footer.deleteCtrlfrontHidden': !this.data.footer.deleteCtrlfrontHidden,
            'others.isDeleteSelected': !this.data.footer.deleteCtrlfrontHidden,
          })
        },
        __getData(){
          var suffix = this.listIndex === 1 ? 'sp' : (this.suffix || 'bz'), dataCache, filterStr = '', oldLen, sliceStart = this.pageIndex * this.pageSize,hasNext = true;
          if (this.dataCache.length > 0) dataCache = this.dataCache;
          else{
            dataCache = (wx._getStorageSync('downloadData-' + suffix) || []);
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
                key: 'downloadData-' + suffix,
                data: dataCache,
              })
            }
            this.dataCache = dataCache;
          }
          hasNext = dataCache.length > sliceStart + this.pageSize;
          if (dataCache.length === 0) this.setData({'footer.isDeleteCtrlHide':true})
          dataCache = dataCache.slice(sliceStart, sliceStart + this.pageSize);
          return Promise.resolve({
             Data:{
               hasNext,
               DataList: dataCache
             }
          }).then(this.__success)
        },
        changeBefore(currentIndex, obj) {
          this.suffix = currentIndex < 2 ? 'bz' : (currentIndex === 2 ? 'bq' : 'tx');
        },
        __filterList(data){
            return data.map(item=>{
              return {
                ThumbImage: item.ThumbImage
              }
            })
        },
        __addShare(obj) {
          obj.path = 'pages/index/index'
        },
      }
      break;

    case 'albumList':
      pageObj = {
        interfaceName:'AlbumList',
        filterName:'album',
        noCache:true,
        data: {
          defaultText:'暂无专辑',
          header: {
            mode: 'back-search-scroll-nav',
            placeholdClass:'bothHeader',
            'class':'pb0'
          },
          footer:{
            btns:['home','share']
          },
          template: 'base-album-list',
          listNav: [],
        },
        init(options, obj) {
          var currentIndex = +options.currentindex || 0;
          this.listIndex = currentIndex;
          obj.currentIndex = currentIndex;
          wx._request({
            url: 'AlbumList',
            data: { pageSize: 0}
          }).then(res=>{
            res = res.Data.CateList.map(item=>{
              return {
                CategoryID: item.CategoryID,
                CategoryName: item.CategoryTitle
              }
            })
            obj.listNav = res;
            this.setData(obj,()=>{
              //获取导航位置
              wx.getRectsLoop('.nav-item').then(res => {
                var positionArr = [];
                res.forEach((item, index) => {
                  positionArr.push(item.left + (item.width - wx.windowWidth >> 1))
                });
                this.positionArr = positionArr;
                currentIndex > 1 && this.setData({
                  scrollLeft: positionArr[currentIndex]
                })
              }).then(this.__loadedMore);
            });
            obj = null;
          })
        },
        __supplementParam(obj) {
          obj.categoryId = this.data.listNav[this.listIndex].CategoryID;
          obj.needCateList = 2
        },
        _addShare(obj) {
          obj.path += '?currentindex=' + this.listIndex
        },
      }
      break;

    case 'avatarEmote':
      pageObj = {
        interfaceName: 'CategoryMoreList',
        data: {
          defaultText: '暂无相关数据',
          header: {
            mode: 'back-search-scroll-nav',//返回搜索=滚动  双导航
            placeholdClass: 'bothHeader',//双导航样式
            'class': 'pb0',
            hasNavView:true,//是否显示滚动导航的导航下拉
          },
          footer: {
            btns: ['home','sort', 'share'],
            extra:'footer-sort-extra', //额外的模板   这里试排序选项显示
            sortText: ['按最新排序', '按热度排序', '按总榜排序'],//排序使用
            sortIndex:0,//排序所以
            isSortItem:false,//是否显示排序内容
          },
          template: 'avatar-emote-list',
          listNav: [],
        },
        init({ cateid = 1, currentIndex = 0}, obj) {
          currentIndex = +currentIndex;
          cateid = +cateid;
          this.listIndex = currentIndex;
          this.cateID = cateid;
          this.suffix = cateid === 1 ? 'tx' : 'bq';
          obj.currentIndex = currentIndex;
          obj['header.placehold'] = cateid === 1 ? '搜索头像' : '搜索表情';
          obj['header.searchIndex'] = cateid === 1 ? 2 : 1;
          wx._request({
            url: 'CategoryNavigationList',
            data: { cateID: cateid }
          }).then(res => {
            res = res.Data.map(item => {
              return {
                CategoryID: item.ID,
                CategoryName: item.Title,
                CategoryIcon: item.Icon,
              }
            })
            obj.listNav = res;
            this.setData(obj, () => {
              //获取导航位置
              wx.getRectsLoop('.nav-item').then(res => {
                var positionArr = [];
                res.forEach((item, index) => {
                  positionArr.push(item.left + (item.width - wx.windowWidth >> 1))
                });
                this.positionArr = positionArr;
                currentIndex > 1 && this.setData({
                  scrollLeft: positionArr[currentIndex]
                })
              }).then(this.__loadedMore);
            });
            obj = null;
          })
        },
        __supplementParam(obj) {
          obj.cateID = this.cateID;
          obj.sort = this.data.footer.sortIndex + 1;
          obj.subCateID = this.data.listNav[this.listIndex].CategoryID
        },
        _addShare(obj) {
          obj.path = this.route + '?cateid=' + this.cateID + '&currentIndex=' + this.listIndex
        }
      }
      break;
    case 'categoryList':
      pageObj = {
        interfaceName: 'CategoryContent',
        // filterName: 'album',
        data: {
          header: {
            mode: 'back-search-scroll-nav',//返回搜索=滚动  双导航
            placeholdClass: 'bothHeader',//双导航样式
            'class': 'pb0',
            hasNavView: true,//是否显示滚动导航的导航下拉
          },
          footer: {
            btns: ['home', 'sort', 'share'],
            extra: 'footer-sort-extra', //额外的模板   这里试排序选项显示
            sortText: ['按最新排序', '按热度排序', '按总榜排序'],//排序使用
            sortIndex: 0,//排序所以
            isSortItem: false,//是否显示排序内容
          },
          template: 'base-wallpaper-list',
          listNav: [],
        },
        init({ categoryId = 3, currentIndex = 0 }, obj) {
          currentIndex = +currentIndex;
          obj.currentIndex = currentIndex;
          this.listIndex = currentIndex;
          this.categoryId = categoryId;
          wx._request({
            url: 'CategoryContent',
            data: { categoryId, pageSize: 0 }
          }).then(res => {
            res = res.Data.SubArray.map(item => {
              return {
                CategoryID: item.CategoryID,
                CategoryName: item.SubName,
                CategoryIcon: item.IconUrl,
              }
            })
            obj.listNav = res;
            this.setData(obj, () => {
              //获取导航位置
              wx.getRectsLoop('.nav-item').then(res => {
                var positionArr = [];
                res.forEach((item, index) => {
                  positionArr.push(item.left + (item.width - wx.windowWidth >> 1))
                });
                this.positionArr = positionArr;
                currentIndex > 1 && this.setData({
                  scrollLeft: positionArr[currentIndex]
                })
              }).then(this.__loadedMore);
            });
            obj = null;
          })
        },
        __supplementParam(obj) {
          obj.categoryId = this.categoryId;
          obj.sort = this.data.footer.sortIndex + 1;
          obj.label = this.data.listNav[this.listIndex].CategoryName
          obj.needCateList = 2;
        },
        _addShare(obj) {
          obj.path = this.route + '?categoryId=' + this.categoryId + '&currentIndex=' + this.listIndex
        }
      }
      break;
  }
  return pageObj || {};
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    listNav: [],
    header: {
      title: '',
      mode: 'empty'
    }
  },
  onLogin(options) {
    var {
      pagename,
      ...otherOptions
    } = options,
    pageObj = getPage(pagename),
      data = pageObj.data || {};
    data.header = Object.assign(this.data.header, {
      mode: 'back-title'
    }, data.header || {});
    delete pageObj.data;
    Object.assign(this, pageObj);
    this.init(otherOptions, data)
    pageObj = null;
    this.pagename = pagename;
  },
  init(options, obj) {
    this.listIndex = +options.currentIndex || 0;
  },
  __addShare(obj, e) {
    this.__emit('_addShare', obj, e);
    obj.path += (obj.path.indexOf('?') === -1 ? '?' : '&') + 'pagename=' + this.pagename;
  },
})