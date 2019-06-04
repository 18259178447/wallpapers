var qudaoIndex = wx.qudaoIndex || 0;
var minis = [
  {
    appid: 'wx7d5c5308d07a1559',
    title: '占卜师傅',
    image: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM5n58WWufM7nEL9NKvpte43TIMCBoZHNNAoNvEhCviclCg/0",
    desc: "一款有趣的测试,心里测试、趣味情感测试、智商测试、爱情测试、性格测试！",
    viewTime: 3
  }
]


var adDatas = [
  {
    name:"高清壁纸Pro",
    banner: 'adunit-84f6d48d83a20427',
    mini: [0]
  },
  {
    name:"超清",
    banner: 'adunit-84f6d48d83a20427',
    mini: [0]
  }
]

var adData = adDatas[qudaoIndex];

adData.mini = (adData.mini || []).map(item => {
  return minis[item]
})

adDatas = minis = null;
// console.log(adData)
module.exports = adData;