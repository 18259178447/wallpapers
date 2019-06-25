module.exports = {
  base: "http://api.crazytoto.cn/",
  interfaces: {//接口
    "login":"Core/Login",
    "GetHomePage":"core/GetHomePage",
    "GetActList":"core/GetActList",
    "GetLandDetail":"core/GetLandDetail",
    "GetUserPhone":"core/GetUserPhone",
    "CreateLandOrder": "core/CreateLandOrder",//购买土地
    "GetLandOrderList": "core/GetLandOrderList",//获取我的土地订单
  }
}