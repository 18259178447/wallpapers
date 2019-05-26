var listMinxin = require('../../utils/list-mixin');
var filter = require('../../components/utils/filter.js');
var diff = require('../../utils/diff.js').default;
// wx2d3f209d87668933   wx5bfe2eea969f4cec
wx.Page({
  mixins: [listMinxin],
  data: {
    header: {
      title: '组件测试',
      type: 'fixed'
    },
    navArr: [],
    // albums:[],
    // origins:[]

  },
 
  onInit(){
    this.setData({
      navArr: wx.safe ? [{ "title": "精选", "id": 1 }, { "title": "最新", "id": 2 }, { "title": "限时免费", "interfaceName": "OriginalList" }, { "title": "主题套图", "id": 3 }, { "title": "天生一对", "id": 4 }, { "title": "最佳锁屏", "id": 5 }, { "title": "一天最热", "id": 6 }, { "title": "一周排行", "id": 7 }, { "title": "人气月榜", "id": 8 }] : 
        [{ "title": "精选", "id": "hottest" }, { "title": "最新", "id": "createtime" }, { "title": "一天热门", "id": "hottesttoday" }, { "title": "一周排名", "id": "ranking" }]
    })
    this.navChanges(0)
  },
  initListComponent(index) {
    if(wx.safe){
      var { id, interfaceName } = this.data.navArr[index];
      if (interfaceName){
       return this.selectComponent('#image-list' + index).init({
          interfaceName
        })       
      }
      this.selectComponent('#image-list' + index).init({
        interfaceName: 'WallpaperList',
        data: {
          categoryID: id
        }
      })
    }else{
      this.selectComponent('#image-list' + index).init({
        interfaceName: '',
        data: {
          "do": "Wallpaper",
          m: "yj_erha",
          type:1,
          attribute: this.data.navArr[index].id 
        }
      })
    }

  },
  previewHandle(e){
    var index = e.target.dataset.index;
    if (index === undefined) return;
    wx.previewObj = {
      page: {
        data:{
          dataList: this.data.origins
        },
        hasNext:false
      },
      index
    }
    wx.navigateTo({
      url: '/pages/preview/preview',
    })
  }
})
