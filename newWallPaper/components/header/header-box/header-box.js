// components/header/header-box/header-box.js
var sysInfo = wx._getSystemInfoSync ? wx._getSystemInfoSync() : wx.getSystemInfoSync(),
    statusBarHeight = sysInfo.statusBarHeight,
    adapterClass = '';
//工具里根据当前选择的模拟器改变品牌和平台
if (sysInfo.brand === 'devtools') {
  sysInfo.brand = sysInfo.model.split(' ')[0];
  sysInfo.platform = sysInfo.system.split(' ')[0].toLowerCase();
}
// 自定义导航  安卓  状态栏没有使用 非tabBar页面（tabBar页面无法判断）  由于状态栏没有使用  设置sysInfo.statusBarHeight = 0
if (sysInfo.platform === 'android' && sysInfo.screenHeight - sysInfo.windowHeight === sysInfo.statusBarHeight) {
  statusBarHeight = 0;
  /*
    ....这里可做些上报  手机哪些机型状态栏没有使用到,以便更好的处理自定义导航
  */
} else {
  //这些机型下做处理(已经确定没有使用到状态栏的机型)
  if ("CHM-TL00H,HM NOTE 1LTE".indexOf(sysInfo.model) > -1) {
    statusBarHeight = 0;
  }
}

adapterClass = sysInfo.model.replace(/\s+|<.+>|\(.+\)/g, '') + ' ' + sysInfo.brand + ' ' + sysInfo.platform;
sysInfo = null;

Component({
  externalClasses: ['_class','body-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    capsule:String,//是否排除掉右上角胶囊
    placehold:{//
      type: [Boolean, String]
    },
    fixed:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    adapterClass,
    statusBarHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
