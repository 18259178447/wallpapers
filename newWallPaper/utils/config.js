// 配置文件
var qudaoIndex = 0;
var qudao = [
  {
    name: "高清壁纸Pro",
    adid: "adunit-84f6d48d83a20427",
    appid: "awx2d3f209d87668933",
    dev: "dev-ltqye",
    prod: "prod-n4ws2",
    use: "dev"
  },
]

module.exports = Object.assign({
  appid: "awx2d3f209d87668933",//prod-n4ws2
  env: "dev",
  base: "https://minibizhi.313515.com/",//基本域名
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

qudao = null;