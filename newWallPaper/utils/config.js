// 配置文件
var qudao = {
  "wx2d3f209d87668933":{
    base:"https://minibizhi.313515.com/",
    name: "高清壁纸Pro",
    adid: "adunit-84f6d48d83a20427",
    appid: "wx2d3f209d87668933",
    dev: "dev-ltqye",
    prod: "prod-n4ws2",
    use: "dev"
  },
  "wxd3fab7dc660d0a6f":{// qianmeng_xcx01@163.com  qmxcx001
    base:"https://www.dreamcometrue.top/",
    name: "超清壁纸精选",
    adid: "adunit-923e33e5e984b835",
    appid: "wxd3fab7dc660d0a6f",
    dev: "dev-5f7py",
    prod: "prod-kizl9",
    use: "dev"
  }
}

module.exports = Object.assign({
  interfaces: {//接口
    WallpaperList: 'List/WallpaperList',
    OriginalList: 'List/OriginalList',
    AlbumList: 'List/AlbumList',
    AlbumContent: 'List/AlbumContent',
    SearchList: 'List/SearchList',
    Categorys: 'List/Categorys',
    CategoryContent: 'List/CategoryContent',
  }
}, qudao[__wxConfig.accountInfo.appId]);

qudao = null;