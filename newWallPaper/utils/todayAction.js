// 用于记录今天的动作次数
class TodayAction{
  static today = (() => {
    var date = new Date();
    return date.getMonth() + 1 + ',' + date.getDate();
  })()
  constructor(action){
    var actionInfo = wx._getStorageSync('action-' + action);
    if (!actionInfo || actionInfo.date !== TodayAction.today){
      actionInfo = {
        date: TodayAction.today,
        keys:{},//action下子动作标识
        count:0//今天名为action的动作次数
      }
    }
    this.action = action;
    this.actionInfo = actionInfo;
    this.breakPoint = [];//断点，表示再数组里的第几次动作停止，直到调用next后才可以继续增加动作次数
  }
  setBreakPoint(breakPoint){
    if (!Array.isArray(breakPoint)) return console.warn("设置断点参数必须是数组")
    this.breakPoint = breakPoint;
  }
  done(key){
    var { keys,count } = this.actionInfo;
    count++;//这次是第几次动作
    //如果有key并且动作已经做过了，动作成功，但不记录此动作次数
    if (key && keys[key]) return true;
    if (this.breakPoint.indexOf(count) > -1){
      //如果在断点里面， 有授权next，授权去了，继续往下走，否则动作失败
      if(this.canNext){
        this.canNext = false;
      }else{
        return false;
      }
    }
    if(key) keys[key] = true;//如果有key,保存key
    this.actionInfo.count = count;
    this.update = true;
    return true;
  }
  count(key){
    if (key) return +this.actionInfo.keys[key] || 0;
    return this.actionInfo.count;
  }
  next(){
    this.canNext = true;
  }
  save(){
    if(!this.update) return;
    this.update = false;
    wx._setStorage({
      key: 'action-' + this.action,
      data: this.actionInfo,
    })
  }
}

var allActions = {}
wx.todayAction = function(action){
  if (allActions[action]) return allActions[action];
  return allActions[action] = new TodayAction(action)
}
wx.saveAllActions = function(){
  for(var key in allActions){
    allActions[key].save()
  }
}