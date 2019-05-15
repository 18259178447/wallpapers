class Message {
  constructor() {
    this.old = this.new = wx._getStorageSync('messageCounts') || { PraiseCount: 0, CommentCount: 0, AttentionUserCount: 0, UserAttentionCount:0 }
  }
  update(){
    var userID = wx.userInfo.userID;
    if (!userID) wx.loginPromise.then(this.update.bind(this))
    return wx._request({ url: 'InformationCenter', data: { userID } }).then((res) => {
      return this.new = res.Data;
    })
  }
  checkRedPoint(key){
    if (key) return this.new[key] - this.old[key] > 0;
    for (key in this.new) {
      if (key === 'UserAttentionCount') continue;
      if (this.new[key] - this.old[key] > 0) return true;
    }
    return false;
  }
  set browsedName(name){
    if (this.old[name] === this.new[name]) return;
    this.needSave = true;
    this.old[name] = this.new[name];
  }
  save(){
    if (!this.needSave) return;
    wx._setStorage({
      key: 'messageCounts',
      data: this.old
    });
  }
}
export default function (name = "message") {
  return Message[name] || (Message[name] = new Message());
}
