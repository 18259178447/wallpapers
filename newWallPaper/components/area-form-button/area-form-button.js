// components/form-button/form-button.js
Component({
  externalClasses: ['_class'],
  /**
   * 组件的属性列表
   */
  properties: {
    height:String,
    flag:Boolean
  },
  data:{
    isCollect:true
  },
  /**
   * 组件的初始数据
   */
  ready() {
    this.check();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    formSubmit(e) {
      if(this.data.flag){
        this.triggerEvent("click")
      }
      if(!wx.safe){
        return console.log("nosafe")
      }
      if (
        e.detail.formId
        && e.detail.formId.indexOf("requestFormId:fail") === -1 
        && e.detail.formId.indexOf("the formId is a mock one") === -1
        // && wx.userInfo && wx.userInfo.openid
        ){
        // wx.$('formid__' + new Date().format("Y-M-D"))
        // .doc(wx.userInfo.openid)
        wx.$('formid')
        .add({ 
          data: {
            // openid: wx.userInfo.openid,
            formid: e.detail.formId,
            date:new Date().format("YY-MM-DD"),
            expire: wx.db.serverDate({
              offset: 6.6 * 24 * 60 * 60 * 1000
            })
          }
        })
        .then(res=>{
          wx.todayAction("collect-formid").done();
          this.check();
          }).catch(e => console.log(e))
      }
    },
    click(){
      if (this.data.flag) {
        this.triggerEvent("click")
      }
    },
    check(){
      if (wx.todayAction("collect-formid").count() > 1){
        this.setData({
          isCollect: false
        });
      }
    }
  }
})