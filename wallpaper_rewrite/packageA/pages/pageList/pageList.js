import community from '../../../utils/community'

function getPage(pageName) {
  var pageObj = null;
  switch (pageName) {
    case 'uploadList':
      pageObj = {
        interfaceName: 'UserUploadList',
        noCache:true,
        data: {
          header: {
            title: '上传壁纸'
          },
          footer:{
            mode:'delete-ctrl',
            deleteFrontMode:'upload-delete-front',
            isDeleteCtrlHide: false,
            deleteCtrlfrontHidden: false
          },
          template: 'can-delete-upload-list',
          defaultText: '您还上传壁纸，快去上传吧～',
          defaultImage:'no-upload',
          others: {
            isDeleteSelected: false
          }
        },
        toggle(e) {
          this.setData({
            'footer.deleteCtrlfrontHidden': !this.data.footer.deleteCtrlfrontHidden,
            'others.isDeleteSelected': !this.data.footer.deleteCtrlfrontHidden,
          })
        },
        openExplain(){
          wx.msg('暂无声明!',1)
        },
        uploadHandle(){
          if (!this.checkLogin('uploadHandle')) return;
          if(this.isLoading) return;
          this.isLoading = true;
          wx.promiseApi('chooseImage',{
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          }).then(res=>{
            wx.uploadList = this;
            wx.navigateTo({
              url: '../upload/upload?src=' + res.tempFilePaths[0]
            })
            this.isLoading = false;
          })
        },
        clickImage(e) {
          var index = e.target.dataset.index;
          if (index === undefined) return;
          if (this.data.others.isDeleteSelected) {//如果是打开了删除状态，则选择图片
            var selectedStr = this.selectedStr || '';
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
            let img = this.dataList[index].Image
            wx.previewImage({
              urls: [img],
              current: img
            })
          }
        },
        deleteSubmit() {
          if (!this.selectedStr) {
            return wx.msg('请先勾选', 1);
          }
          wx.modal('确认要删除？').then(res => {
            if (res.confirm) {
              if (this.isLoading) return;
              this.isLoading = true;
              wx.showLoading({ title: '正在删除...', mask: !0 });
              var dataList = this.dataList,
                selectedArr = this.selectedStr.slice(0, -1).split(';'),
                uploadIDs = selectedArr.map(item => {
                  return dataList[item].UploadID
                }).join(',');
              wx._request({
                url: "CancelUplaod",
                data: {
                  uploadIDs,
                  userID: wx.userInfo.userID
                }
              }).then(item=>{
                selectedArr.sort((a, b) => { return b - a }).forEach((index) => {
                  dataList.splice(index, 1);
                });
                this.__reSetData({
                  dataList,
                  'footer.deleteCtrlfrontHidden': false,
                  'others.isDeleteSelected': false,
                }, () => {
                  wx.msg('删除成功');
                  this.isLoading = false;
                  if (dataList.length < 16) this.__loadedMore();
                  this.selectedStr = '';
                  selectedArr = dataList = null;
                })
                }).catch(e => { 
                  wx.msg('删除失败', 1);
                  this.isLoading = false;
                })
            }
          })
        },
        __filterList(data) {
          var texts = ['正在审核', '审核通过','拒绝通过'];
          var classes = ['pending', 'success','fail'];
            return data.map(item=>{
              return {
                ThumbImage: item.ThumbImage,
                Image: item.Image,
                UploadID: item.UploadID,
                StatusText: texts[item.Status], 
                StatusClass: classes[item.Status], 
              }
            })
        },
        __supplementParam(obj) {
          obj.userID = wx.userInfo.userID;
        },
        _addShare(obj) {
          obj.path = "/pages/index/index"
        },
      }
      break;
    case 'pairList':
      pageObj = {
        interfaceName: 'WallpaperList',
        data: {
          template: 'pair-wallpaper-list',
          footer: {
            btns: ['home', 'share'],
          },
        },
        init({id =3}, obj) {
          obj['header.title'] = id == 3 ? '主题套图' : '天生一对';
          this.id = id;
          this.setData(obj, this.__loadedMore);
        },
        __supplementParam(obj) {
          obj.categoryID = this.id;
        },
        __dealWithData(data, obj) {
          var Titles = data.DrawingList || [];
          data = data.DataList || [];
          this.dataCache = this.dataCache.concat(data)
          obj.dataList = this.dataList.concat(data.map((item,index)=>{
            if(index % 2 === 1) index-=1 
             return {
               ThumbImage: item.ThumbImage,
               Title: Titles[index/2] || 0
             }
          }));
          if (obj.dataList.length < (this.thresholdData || 16)) {
            obj.LoadingText = '';
            obj.dataList.length === 0 && (obj.defaultPage = true);
          }
          this.__reSetData(obj);
        },
        downloadPair(e){
          var index = e.target.dataset.index,
            imgs = this.dataCache.slice(index - 1, index + 1);
          wx.showLoading({
            title: '下载中,1/2',
            mask: !0
          });
          wx.Tool.downloadFile(imgs[1],'bz',false).then(res => {
            wx.showLoading({
              title: '下载中,2/2',
              mask: !0
            });
            return wx.Tool.downloadFile(imgs[0], 'bz', false)
          }).then(res => {
            wx.msg('下载成功')
          })
        },
        onUnload(){
          wx.Tool.saveDownloadData();
        },
        _addShare(obj) {
          obj.path += '?id=' + this.id
        },
      }
    break;
    case 'rewardList':
      pageObj = {
        interfaceName: 'myoriginallist',
        data: {
          header: {
            title: '原创专栏'
          },
          template: 'original-wallpaper-list',
          defaultText: '您还未解锁壁纸，快去解锁吧～'
        },
        __filterList(data) {
          return data.map(item => {
            return {
              ThumbImage: item.ThumbImage,
              PriceType: item.PriceType
            }
          })
        },
        _addShare(obj) {
          obj.path = "/pages/index/index"
        },
      }
      break;
    case 'dynamicWallpaper': 
      pageObj = {
        interfaceName: 'DynamicPicList',
        data: {
          header: {
            mode:'back-search-btn'
          },
          footer: {
            btns: ['home', 'guide', 'share'],
          },
          template: 'dynamic-wallpaper-list',
          defaultText:'暂无动态视频'
        }
      }
      break;
    case 'limitFreeArea':
      pageObj = {
        interfaceName: 'RecommendModular',
        data: {
          header: {
            title: '限免专区'
          },
          footer: {
            btns: ['home', 'share'],
          },
          template: 'base-wallpaper-list',
        },
        __filterList(data) {
          var reward = wx.Toggle('rewardStr');
          return data.map(item => {
            var isLock = item.PriceType && !reward.has(item.PicInfoID);
            isLock && (item.isLock = isLock);
            return item.ThumbImage || item.Image
          })
        },
        __supplementParam(obj) {
          obj.modularID = 11;
        },
      }
    break;
    case 'chatBg':
      pageObj = {
        interfaceName: 'background',
        data: {
          header: {
            title: '聊天背景'
          },
          footer: {
            btns: ['home', 'share'],
          },
          template: 'chat-bg-list'
        }
      }
      break; 
      // commentMy, attentionMy
    case 'praiseMy':
      pageObj = {
        interfaceName: 'UserPraise',
        thresholdData: 5,
        data: {
          header: {
            title: '赞我的'
          },
          template: 'praise-comment-my-list',
          defaultText: '还没有赞哦～'
        },
        __filterList(data) {
          //PraiseType
          //1话题发布点赞  2广场发布点赞  3话题或广场评论点赞   4 专辑评论点赞
          return data.map(item => {
            let {
              AvatarUrl,
              CreateDate,
              NickName,
              OperationUserID,
              Content,
              TopicPartPicResultInfoList,
              IsDelete,
              PartID,
              PraiseType
            } = item, url = '';
            if (IsDelete) url = '/packageA/pages/topicReplyDetail/topicReplyDetail?isdelete=1';
            else {
              url = PraiseType === 4 ? '/pages/albumDetail/albumDetail?albumID=' : '/packageA/pages/topicReplyDetail/topicReplyDetail?partID='
            }
            return {
              user: {
                AvatarUrl,
                NickName,
                UserID: OperationUserID,
                CreateDate: wx.getDistance(CreateDate),
              },
              Thumb: TopicPartPicResultInfoList[0] ? TopicPartPicResultInfoList[0].Thumb : '',
              Content,
              url: url + PartID + '&releaseType=' + PraiseType
            };
          })
        },
        _addShare(obj) {
          obj.path = "/pages/index/index"
        },
      }
      break;
    case 'commentMy':
      pageObj = {
        interfaceName: 'CommentOnMyList',
        thresholdData: 5,
        data: {
          header: {
            title: '评论我的'
          },
          template: 'praise-comment-my-list',
          defaultText: '还没有人评论哦～',
          others: 'praise-my-list'
        },
        __filterList(data) {
          //PraiseType
          //1话题发布点赞  2广场发布点赞  3话题或广场评论点赞   4 专辑评论点赞
          return data.map(item => {
            let {
              AvatarUrl,
              CreateDate,
              NickName,
              OperationUserID,
              Content: CommentContent,
              PartTitle: Content,
              TopicPartPicResultInfoList,
              IsDelete,
              PartID,
              CommentType
            } = item, url = '';
            if (IsDelete) url = '/packageA/pages/topicReplyDetail/topicReplyDetail?isdelete=1';
            else {
              url = CommentType === 4 ? '/pages/albumDetail/albumDetail?albumID=' : '/packageA/pages/topicReplyDetail/topicReplyDetail?partID='
            }
            return {
              user: {
                AvatarUrl,
                NickName,
                UserID: OperationUserID,
                CreateDate: wx.getDistance(CreateDate),
              },
              Thumb: TopicPartPicResultInfoList[0] ? TopicPartPicResultInfoList[0].Thumb : '',
              Content,
              CommentContent,
              url: url + PartID + '&releaseType=' + CommentType
            };
          })
        },
        _addShare(obj) {
          obj.path = "/pages/index/index"
        },
      }
      break;
    case 'attentionMy':
      pageObj = {
        interfaceName: 'AttentionOnMeList',
        thresholdData: 8,
        data: {
          header: {
            title: '关注我的'
          },
          template: 'attention-my-list',
          defaultText: '还没有粉丝关注你哦～',
          defaultImage: 'no-fan'
        },
        __filterList(data) {
          return data.map(item => {
            item.CreateDate = wx.getDistance(item.CreateDate);
            delete item.IsAttention
            return item;
          })
        },
        _addShare(obj) {
          obj.path = "/pages/index/index"
        },

      }
      break;
    case 'fan':
      pageObj = {
        interfaceName: 'AttentionOnMeList',
        thresholdData: 8,
        data: {
          header: {
            title: '粉丝'
          },
          template: 'fan-attention-list',
          defaultText: '还没有粉丝关注你哦～',
          defaultImage: 'no-fan'
        },
        init(options, obj) {
          if (options.userid && options.userid != wx.userInfo.userID) {
            obj.others = !0;
          } 
          this.userID = options.userid || wx.userInfo.userID;
          this.setData(obj);
          this.__loadedMore();
        },
        __filterList(data) {
          return data.map(item => {
            item.CreateDate = wx.getDistance(item.CreateDate);
            return item;
          })
        },
        __supplementParam(obj) {
          obj.userID = this.userID;
        },
        _addShare(obj) {
          obj.path += '?userid=' + this.userID
        },
        attention(e) {
          var index = e.target.dataset.index,
            {
              UserID,
              IsAttention
            } = this.dataList[index];
          community.attention(UserID, IsAttention).then(res => {
            this.__reSetData({
              [`dataList[${index}].IsAttention`]: !IsAttention
            })
          })
        }
      }
      break;
    case 'myAttention':
      pageObj = {
        interfaceName: 'AttentionOnMeList',
        thresholdData: 8,
        data: {
          header: {
            title: '已关注'
          },
          template: 'fan-attention-list',
          defaultText: '快去关注一些朋友吧～',
          defaultImage: 'no-attention'
        },
        init(options, obj) {
          if (options.userid && options.userid != wx.userInfo.userID) {
            obj.others = true;
          }
          this.userID = options.userid || wx.userInfo.userID;
          this.setData(obj);
          this.__loadedMore();
        },
        __filterList(data) {
          return data.map(item => {
            item.CreateDate = wx.getDistance(item.CreateDate);
            return item;
          })
        },
        __supplementParam(obj) {
          obj.userID = this.userID;
          obj.userAttention = 1;
        },
        _addShare(obj) {
          obj.path += '?userid=' + this.userID
        },
        attention(e) {
          if (this.userID != wx.userInfo.userID) return;
          var index = e.target.dataset.index,
            {
              UserID,
              IsAttention
            } = this.dataList[index];
          community.attention(UserID, IsAttention).then(res => {
            this.__reSetData({
              [`dataList[${index}].IsAttention`]: !IsAttention
            })
          })
        }
      }
      break;
    case 'labels':
      pageObj = {
        interfaceName: 'SearchList',
        data: {
          template: 'base-wallpaper-list'
        },
        init(options, obj) {
          obj['header.title'] = this.title = options.title;
          this.setData(obj);
          this.__loadedMore();
        },
        __supplementParam(obj) {
          obj.userID = wx.userInfo.userID;
          obj.word = this.title;
        },
        _addShare(obj) {
          obj.path = obj.path + "?title=" + this.title
        },
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
    this.setData(obj, this.__loadedMore);
  },
  __supplementParam(obj) {
    obj.userID = wx.userInfo.userID;
  },
  __addShare(obj, e) {
    this.__emit('_addShare', obj, e);
    obj.path += (obj.path.indexOf('?') === -1 ? '?' : '&') + 'pagename=' + this.pagename;
  },
})