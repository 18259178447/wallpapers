var {minis} = require("./miniData.js")
var qudao = {
  "wx2d3f209d87668933": {
    name: "高清壁纸Pro",
    ver:8,
    adData:{
      banner: 'adunit-84f6d48d83a20427',
      ald: "",
      minis: []
    }
  },
  "wxd3fab7dc660d0a6f": {// qianmeng_xcx01@163.com  qmxcx001
    name: "超清壁纸精选",
    ver:4,
    adData:{
      ald: "",
      banner: 'adunit-923e33e5e984b835',
      minis: []
    }
  },
  "1109376964": {// qianmeng_xcx01@163.com  qmxcx001
    name: "高清壁纸精选",
    ver:3,
    adData:{
      ald: "",
      banner: '',
      minis: []
    }
  },
}
qudao = qudao[__wxConfig.accountInfo.appId];
qudao.adData.minis = (qudao.adData.minis || []).map(item => {
  return minis[item]
})
module.exports = Object.assign({
  adid: "",
  count: 3,//曝光次数
  min: 6,//切换随机事件范围
  max: 16,
  firstMin: 5,//第一次切换随机范围
  firstMax: 8,
}, qudao);

qudao = null;