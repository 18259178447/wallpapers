// components/my-ad/my-ad.js
var config = require("../config.js");
var adManage = require("../adManage.js")
var zhanbuIndex = 0;
var zhanbu = [
  {
    img: "http://uploads-admin.cdn.woquhudong.cn/quce/1546944637ByVF5.png",
    url: "id=6836&title=你是隐性渣男渣女吗？src=14"
  },
  {
    img:"http://uploads-admin.cdn.woquhudong.cn/quce/1539683937pOooE.png",
    url:"id=6540&title=真实年龄报告&src=14"
  },
  {
    img:"http://uploads-admin.cdn.woquhudong.cn/quce/1557905142Tvjsv.png",
    url:"id=7019&title=你的左右脑年龄鉴定&src=14"
  },
  {
    img:"http://uploads-admin.cdn.woquhudong.cn/quce/155730835696Daz.png",
    url:"id=7012&title=我的恋爱分析图&src=14"
  },
  {
    img:"http://uploads-admin.cdn.woquhudong.cn/quce/1538994320JEtq0.png",
    url:"id=6911&title=你生气时会有多恐怖？src=14"
  },
]
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    adid: "",
    mini:null
  },
  attached(){
    if (adManage.error){
      this.changeOther()
    }else{
      this.setData({
        adid: config.adData.banner
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    errorHandle(e){
      adManage.errorHandle()
      adManage.error = true;
      this.changeOther();
    },
    changeOther(){
      if (wx.safe) {
        this.setData({
          mini: zhanbu[zhanbuIndex % zhanbu.length] || null,
          adid:""
        })
      } else {
        this.setData({
          adid: ""
        })
      }
      zhanbuIndex++;
    },
    loadHandle(e){
      adManage.loadHandle()
    },
    adClick(e) {
      adManage.clickHandle(1);
    },
    toMini(){
      wx.navigateToMiniProgram({
        appId: 'wx7d5c5308d07a1559',
        path:"pkgquiz/quiz/quiz?"+this.data.mini.url
      })
    }
  }
})
