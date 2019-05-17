require('/utils/init.js');

require("/utils/tarot/config"), require("/utils/tarot/tool");
App({
  onLaunch: function (options) {
    this.thisSpread = options.query.spread && options.query.spread.length > 2 ? options.query.spread : this.thisSpread;
  },


  guaData: {
    gXiang: []
  },

  globalData: {
    userInfo: null,
    host: "https://qc-ssl.itwlw.com/index.php",
    payhost: "https://www-ssl.yx248.com/index.php",
    env: "wxapp_pro",
    ver: "4.12.103",
    appid: "wx032792bb35c58712",
    free_jump: "",
    pro_jump: "",
    shareTicket: "",
    scene: "",
    payappid: "",
    onshowdata: "",
    source: 14,
    channel: 1,
    app_status: 2,
    ajax_status: 0,
    adbannerstatus: 0,
    adbannerid: ""
  },



  thisSpread: "",
  selectType: 1,
  selectCat: 1,
  tlpData: [{
    img: "https://img.d1xz.net/d/2018/08/5b73dff136e8f.jpg",
    cn: "愚者",
    en: "THE FOOL"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff1d3453.jpg",
    cn: "魔术师",
    en: "LE BATELEUR"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff25c4b4.jpg",
    cn: "女祭司",
    en: "LA PAPESSE"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff2e080a.jpg",
    cn: "皇后",
    en: "L'HERMITE"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff36ba78.jpg",
    cn: "皇帝",
    en: "L'EMPEREUR"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff3f13a0.jpg",
    cn: "教皇",
    en: "LE PAPE"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff473f55.jpg",
    cn: "恋人",
    en: "L'AMOVREVX"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff5077b4.jpg",
    cn: "战车",
    en: "LE CHARIOT"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff588fff.jpg",
    cn: "力量",
    en: "LA FORCE"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff619243.jpg",
    cn: "隐者",
    en: "L'HERMITE"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff6aef6b.jpg",
    cn: "命运之轮",
    en: "LA ROUE DE FORTUNE"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff7409ce.jpg",
    cn: "正义",
    en: "LA JUSTICE"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff7d4dcb.jpg",
    cn: "吊人",
    en: "LE PENDU"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff85530d.jpg",
    cn: "死神",
    en: "LE MORT"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff8dd80d.jpg",
    cn: "节制",
    en: "LA TEMPERANCE"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff95eb74.jpg",
    cn: "恶魔",
    en: "LA DIABLE"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dff9d2e8d.jpg",
    cn: "塔",
    en: "LA MAISON.DIEV"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dffa58e22.jpg",
    cn: "星星",
    en: "L'ETOILE"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dffadf509.jpg",
    cn: "月亮",
    en: "LA LUNE"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dffb65646.jpg",
    cn: "太阳",
    en: "LE SOLEIL"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dffc02101.jpg",
    cn: "审判",
    en: "LE JUDGEMNET"
  }, {
    img: "https://img.d1xz.net/d/2018/08/5b73dffc91967.jpg",
    cn: "世界",
    en: "LE MONDE"
  }],
  tpiTip: [["行动和想法的暗示，提供行动上的建议。", "水，情绪和感情，你面对感情的态度。", "风，言语和沟通，语言上应采用的策略。", "土，物质和金钱，怎样处理物质方面的问题。"], ["过去，问题的起因", "现在，目前问题的现况", "未来，今后事情的变化", "解决的方法", "周围的影响，说明与这个事情有关的人或事的状况", "愿望，求问者心中希望事情发展的趋向", "结局，事情最后回变成什么局面"], ["你的心，现在你的心境", "对方的心，对方对你的感觉", "现况，目前你们之间处于何种情况", "问题的原因，和阻碍", "问题的结果"], ["代表过去的状况", "代表现在的情况", "代表问题未来的结果"], ["过去，代表事情发生的原因与情况", "现在，事情目前的状态，还可能暗示你解决问题的方法，解释时两张牌结合起来看", "现在，事情目前的状态，还可能暗示你解决问题的方法，解释时两张牌结合起来看", "未来，事情以后的发展，我们问的问题能否解决都会在这张牌上看出来"]],
})