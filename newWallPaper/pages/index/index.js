var listMinxin = require('../../utils/list-mixin');
var filter = require('../../components/utils/filter.js');
var diff = require('../../utils/diff.js').default;
wx.Page({
  mixins: [listMinxin],
  data: {
    header: {
      title: '组件测试',
      type: 'fixed'
    },
    navArr: [{ "title": "精选", "id": 1 }, { "title": "最新", "id": 2 },{ "title": "主题套图", "id": 3 }, { "title": "天生一对", "id": 4 }, { "title": "最佳锁屏", "id": 5 }, { "title": "一天最热", "id": 6 }, { "title": "一周排行", "id": 7 }, { "title": "人气月榜", "id": 8 }],

    albums:[],
    origins:[]

  },
 
  onInit(){
    this.setData({
      navArr: wx.safe ? [{ "title": "精选", "id": 1 }, { "title": "最新", "id": 2 }, { "title": "主题套图", "id": 3 }, { "title": "天生一对", "id": 4 }, { "title": "最佳锁屏", "id": 5 }, { "title": "一天最热", "id": 6 }, { "title": "一周排行", "id": 7 }, { "title": "人气月榜", "id": 8 }] : 
        [{ "title": "精选", "id": "hottest" }, { "title": "最新", "id": "createtime" }, { "title": "一天热门", "id": "hottesttoday" }, { "title": "一周排名", "id": "ranking" }]
    })

    if(!wx.safe){
      wx._request({
        url: '',
        data: {
          "do": "Iad",
          m: "yj_erha"
        }
      }).then(res=>{
        this.setData({
          albums: filter.dones(res.data, 'album'),
        })
      })
    }else{
      wx._request({
        url: 'AlbumList',
        data: {
          pageindex: 0,
          pagesize: 5,
          sort: 2
        }
      }).then(res => {
        var origins = wx._getStorageSync('origins');
        var obj = {
          albums: filter.dones(res.Data.DataList, 'album'),
        }
        if (origins) obj.origins = origins;
        this.setData(obj);
      }).then(res => {
        wx._request({
          url: 'OriginalList',
          data: {
            pageindex: 0,
            pagesize: 5,
            sort: 2
          }
        }).then(res => {
          var origins = filter.dones(res.Data.DataList);
          var r = diff({ origins }, { origins: this.data.origins });
          if (!wx.isEmpty(r)) {
            this.setData({
              origins,
            })
            wx._setStorage({
              key: 'origins',
              data: origins,
            })
          }
        })
      })
    }

    this.navChanges(0)
  },
  initListComponent(index) {
    if(wx.safe){
      this.selectComponent('#image-list' + index).init({
        interfaceName: 'WallpaperList',
        data: {
          categoryID: this.data.navArr[index].id
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

  }
})
