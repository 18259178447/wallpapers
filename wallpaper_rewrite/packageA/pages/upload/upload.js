// packageA/pages/upload/upload.js

import WeCropper from '../../../utils/we-cropper.js';
var screenshotWidth = wx.rpx2px(468),
  screenshotHeight = wx.rpx2px(wx.supperClass.indexOf('iPhoneX') === -1 ? 832 : 1013.38);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header:{
      title:'预览',
      eventBack:true
    },
    resSrc: "",
    pageIndex: 0,
    mainCategorys: [],
    subCategory: [],
    categoryIndex: -1,
    subCategoryIndexs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cropperOpt = {
      id: 'cropper',
      src: options.src,
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数
      cut: {
        x: 0, // 裁剪框x轴起点
        y: 0, // 裁剪框y轴期起点
        width: screenshotWidth, // 裁剪框宽度
        height: screenshotHeight // 裁剪框高度
      }
    }
    wx.getRect(".cropper").then(res => {
      cropperOpt.width = res.width;
      cropperOpt.height = res.height;
      cropperOpt.cut.x = res.width - screenshotWidth >> 1;
      cropperOpt.cut.y = res.height - screenshotHeight >> 1;
      new WeCropper(cropperOpt).updateCanvas()
      cropperOpt = null;
    })
    var categorys = wx._getStorageSync('categorys');
    if (categorys){
      this.setData({
        mainCategorys: categorys.mainCategorys
      })
      this.categorys = categorys;
    }else{
      wx._request({
        url: 'Categorys',
      }).then(data => {
        var subCategorys = [], categorys;//子分类
        data = data.Data.DataList.map(item => {
          if (item.CategoryID === 133 || item.CategoryID === 102) {
            subCategorys.push(item.SubArray.map(subItem => {
              var { SubID, IconUrl, SubName, BigImgUrl } = subItem;
              return {
                SubID,
                IconUrl,
                SubName,
                appid: item.CategoryID === 133 ? 'wxf9154a17aa287e15' : 'wxb66c141ee02a4eb4',
                path: item.CategoryID === 133 ? (SubID ? `pages/index/index?StyleID=${SubID}&StyleName=${SubName}&CategoryID=133&StyleImg=${BigImgUrl}` : '') : 'pages/category/category?index=0&ID=' + SubID
              };
            }))
          } else {
            subCategorys.push(item.SubArray.map(subItem => {
              return {
                SubID: subItem.SubID,
                IconUrl: subItem.IconUrl,
                SubName: subItem.SubName,
              };
            }))
          }
          delete item.Count;
          delete item.SubArray;
          return item;
        });
        this.categorys = {
          mainCategorys: data,
          subCategorys
        };
        this.setData({
          mainCategorys: data
        })
      })
    }
  },
  uploadHandle() {
    var categoryIndex = this.data.categoryIndex,
      subCategoryIndexs = this.data.subCategoryIndexs;
    if (categoryIndex === -1) {
      wx.msg('请添加分类', 1);
      return this.changePage(2);
    }
    if (subCategoryIndexs.length === 0) {
      wx.msg('请添加标签', 1);
      return this.changePage(3);
    }
    if (this.isLoading) return;
    this.isLoading = true;
    var { mainCategorys, subCategorys} = this.categorys;
    subCategorys = subCategorys[categoryIndex]
    wx.loading("正在上传");
    wx._request({
      url: 'UserUplaod',
      filePath: this.data.resSrc,
      name: "UserUplaod",
      data: {
        categoryID: mainCategorys[categoryIndex].CategoryID,
        userID: wx.userInfo.userID,
        tagIDs: subCategoryIndexs.map(item => {
          console.log(subCategorys[item])
          return subCategorys[item].SubID
        }).join(',')
      }
    }).then(res => {

      if (wx.uploadList){
        wx.uploadList.dataList = [];
        wx.uploadList.pageIndex = 0;
        wx.uploadList.hasNext = !0;
        wx.uploadList.dataCache = [];
        wx.uploadList.__loadedMore();
        wx.uploadList = null;
      }
      wx.closeLoading();
      wx.msg("上传成功！");
      setTimeout(()=>{
        this.back();
        this.isLoading = false;
      },500)
      // packageB/pages/uploadList/uploadList
      
    }).catch(e => {
      wx.closeLoading();
      wx.msg("上传失败！", 1);
      this.isLoading = false;
    })
  },
  selectCategory(e) {
    
    var index = e.target.dataset.index;
    if(index === undefined) return;
    if (this.data.categoryIndex != index) {
      this.setData({
        categoryIndex: index,
        subCategoryIndexs: []
      })
    }
  },
  selectSubCategory(e) {
    var index = e.target.dataset.index;
    if (index === undefined) return;
    var subCategoryIndexs = this.data.subCategoryIndexs,
      exsitIndex = subCategoryIndexs.indexOf(+index);
    if (exsitIndex > -1) {
      subCategoryIndexs.splice(exsitIndex, 1);
    } else {
      if (subCategoryIndexs.length >= 5) return wx.msg("最多5个标签", 1);
      subCategoryIndexs.push(index);
    }
    this.setData({
      subCategoryIndexs
    })
  },
  changePage(e, isBack) {
    var pageIndex = typeof e === "number" ? e : +e.target.dataset.pageindex,
      obj = { pageIndex }
    switch (pageIndex) {
      case 1:
        obj['header.title'] = '上传壁纸'
        if (!isBack) {
          if (this.data.categoryIndex !== -1) {
            if (this.data.subCategoryIndexs.length === 0) return wx.msg('请选择标签', 1);
          } else {
            return this.wecropper.getCropperImage((avatar) => {
              if (avatar) {
                obj.resSrc = avatar;
                this.setData(obj);
              } else {
                wx.msg('裁剪失败', 1)
              }
            })
          }
        }
        break;
      case 2:
        obj['header.title'] = '选择分类';
        break;
      case 3:
        obj['header.title'] = '选择标签';
        let categoryIndex = this.data.categoryIndex;
        if (categoryIndex === -1) return wx.msg('请选择分类', 1)
        obj.subCategory = this.categorys.subCategorys[this.data.categoryIndex].map(item => {
          return item.SubName
        }).slice(1)
        break;
    }
    this.setData(obj);
  },
  cropperSure() {
    this.wecropper.getCropperImage((avatar) => {
      if (avatar) {
        this.setData({
          resSrc: avatar,
          isScreenshot: false
        })
      } else {
        wx.msg('裁剪失败', 1)
      }
    })
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  back() {
    var pageIndex = this.data.pageIndex;
    if (pageIndex < 2) {
      wx.navigateBack()
    } else {
      this.changePage(--pageIndex, 1);
    }
  }
})