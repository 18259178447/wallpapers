//管理formId
var debug = true;
export class FormIdManage {
  constructor() {
    this.formIds = [];
    this.needNum = 0;//需要 但是还没有发送到服务器的formid
  }
  add(formId) {//添加formid
    debug && console.log('收集到formid：' + formId);
    if (!formId || (!debug && formId === 'the formId is a mock one') || formId ==='requestFormId:fail') return;
    this.formIds.unshift(formId);
  }
  send(num = 0, openID = wx.userInfo.openID, userID = wx.userInfo.userID){//发送formid  num为发送数量  
    this.needNum += num;
    if (!openID) return console.warn('请提供openid');
    if (!userID) return console.warn('请提供userid');
    console.log(this.formIds);
    console.log(this.needNum);
    var sendFormIds = this.formIds.splice(0, this.needNum);
    if(sendFormIds.length){
      // new Promise((resolve,reject)=>{//模拟请求
      //   debug && console.log('发送formids:' + sendFormIds.join(','))
      //     setTimeout(()=>{
            
      //       resolve()
      //     },1000)
      // }).then(res => {
      //   this.needNum -= sendFormIds.length;
      //   sendFormIds = null;
      // }).catch(e=>{
      //   this.formIds = sendFormIds.concat(this.formIds)
      //   sendFormIds = null;
      // })
      // 发送formid
      console.log(sendFormIds);
     return wx._request({
        url:'https://shopapi.gao7.com/PushCode/add',
        data:{
          UserCode: userID,
          FormID: sendFormIds.join(','),
          OpenID: openID,
          ChannelID:4,
          EncryptKey: 'E36D03EA6B98B0C89C1E3C5F4A4F44CB33E26588'
        }
      }).then(res=>{
        console.log('结果' + JSON.stringify(res));
        this.needNum -= sendFormIds.length;
        sendFormIds = null;
      }).catch(e=>{
        console.log(res);
        this.formIds = sendFormIds.concat(this.formIds)
        sendFormIds = null;
      })
    }
  }
}

export default new FormIdManage();
