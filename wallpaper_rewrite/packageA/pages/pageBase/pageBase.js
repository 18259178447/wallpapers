import message from '../../../utils/message'
function getPage(pageName) {
  var pageObj = null;
  switch (pageName) {
    case 'message':
      pageObj = {
        data: {
          header: {
            title: '消息中心'
          },
          template: 'message',
          extra: [
            {
              icon: 'icon-thumb-up-me.svg',
              title: '赞我的',
              key: "PraiseCount"
            },
            {
              icon: 'icon-comment-me.svg',
              title: '评论我的',
              key: "CommentCount"
            },
            {
              icon: 'icon-attention-me.svg',
              title: '关注我的',
              key: "AttentionUserCount"
            }
          ]
        },
        init(options,obj){
          var messageObj = message();
          obj.extra.forEach(item=>{
            item.redPoint = messageObj.checkRedPoint(item.key)
          })
          messageObj = null;
          this.setData(obj);
        },
        navClick(e){
          var index = e.currentTarget.dataset.index,
            { redPoint, key } = this.data.extra[index];
          wx.navigateTo({
            url: '../pageList/pageList?pagename=' + 'praiseMy,commentMy,attentionMy'.split(',')[index]
          })
          if (redPoint) {
            this.setData({
              [`extra[${index}].redPoint`]: false
            });
            message().browsedName = key;
          }
        },
        onUnload(){
          message().save();
        },
        _addShare(obj) {
          obj.path = "/pages/index/index"
        },
      }
      break;
    case 'videoGuide':
      pageObj = {
        data: {
          header: {
            title: '动态视频设置教程'
          },
          template: 'video-guide',
        },
        _addShare(obj) {
          obj.path = "/pages/index/index"
        },
      }
      break;
    case 'setting':
      pageObj = {
        data: {
          header: {
            title: '设置'
          },
          template: 'setting',
          extra:{
            isNotify: wx.isNotify
          }
        },
        _addShare(obj) {
          obj.path = "/pages/index/index"
        },
        switch1Change(e) {
          var val = e.detail.value;
          var status;
          wx._setStorageSync('isNotify', val);
          wx.isNotify = val;
          if (!val) {
            status = '关';
            wx._request({
              url: 'ClosePush',
              data: {
                userID: wx.userInfo.userID
              }
            }).then(res => {
              wx.msg('关闭成功');
            })
          } else {
            wx.msg('开启成功');
            status = '开';
          }
          wx.reportAnalytics('push', {
            status: status,
          });
        },
        toggleCopy() {
          wx.isInsider = true
          wx.modal('已开启分享复制地址,分享后会自动复制地址到剪贴板')
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
  mode: 'Base',
  data: {
    header: {
      title: '',
      mode: 'empty'
    }
  },
  onLoad(options) {
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
    this.setData(obj);
  },
  __addShare(obj, e) {
    this.__emit('_addShare', obj, e);
    obj.path += (obj.path.indexOf('?') === -1 ? '?' : '&') + 'pagename=' + this.pagename;
  },
})