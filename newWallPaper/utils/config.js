// 配置文件
var qudaoIndex = 0;
var qudao = [
  {
    name: "高清壁纸Pro",
    adid: "adunit-84f6d48d83a20427",
    appid: "wx2d3f209d87668933",
    dev: "dev-ltqye",
    prod: "prod-n4ws2",
    use: "dev"
  },
  {// qianmeng_xcx01@163.com  qmxcx001
    name: "超清壁纸精选",
    adid: "adunit-923e33e5e984b835",
    appid: "wxd3fab7dc660d0a6f",
    dev: "dev-5f7py",
    prod: "prod-kizl9",
    use: "dev"
  },
]

module.exports = Object.assign({
  base: qudaoIndex === 0 ? "https://minibizhi.313515.com/" : "https://www.dreamcometrue.top/",//基本域名
  interfaces: {//接口
    WallpaperList: 'List/WallpaperList',
    OriginalList: 'List/OriginalList',
    AlbumList: 'List/AlbumList',
    AlbumContent: 'List/AlbumContent',
    SearchList: 'List/SearchList',
    Categorys: 'List/Categorys',
    CategoryContent: 'List/CategoryContent',
  }
}, qudao[qudaoIndex]);

wx.qudaoIndex = qudaoIndex;
qudao = null;