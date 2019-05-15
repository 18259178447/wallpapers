// components/component-tag-name.js
Component({
  externalClasses: ['_class'],
  /**
   * 组件的属性列表
   */
  properties: {
    btnData: Object
  },
  /**
   * 组件的初始数据
   */
  data: {
  },
  // 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息（使用 SelectorQuery ）
  ready(){
    if (this.data.btnData.JumpType !== 5){
      wx.adReport(this.data.btnData.AdId, 2)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tapHandle(e){
      var { AdId, JumpType, JumpUrl } = this.data.btnData
      if (JumpType === 3 || JumpType === 1){
        JumpType === 1 && JumpType.indexOf('/packageB/pages/web/web') === -1 && (JumpUrl = '/packageB/pages/web/web?url=' + encodeURIComponent(JumpUrl))
        wx.navigateTo({
          url: JumpUrl,
        });
      }
      if (this.isLoading) return;
      this.isLoading = true;
      wx.adReport(this.data.btnData.AdId, 1);
      setTimeout(()=>{
        this.isLoading = false;
      },500)
    }
  }
})