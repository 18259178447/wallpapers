const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database()
const MAX_LIMIT = 100;

// 云函数入口函数
exports.main = async (event, context) => {
  var _send = 0,
    collection = db.collection("formid");
  var now = Date.now();
  var result = await getAll(collection.orderBy('_openid', 'asc').orderBy('expire', 'asc'));
  var date = format();
  var map = {};

  result = result.filter(item=>{
    let b = map[item._openid] === undefined;
    if (item.date === date) b = false;
    if(b) map[item._openid] = true;
    return b;
  })
  console.log("总共" + result.length + "数量")
  for (i = 0; i < result.length; i++) {
    let item = result[i];
    try {
      let isNoExpire = item.expire - new Date() > 0;
      if (isNoExpire) {
        if (!item.send) {
          await collection.doc(item._id).update({
            data: {
              send: 1
            }
          })
        }
        currentOpenid = item._openid;
        _send++;
      } else {
        await collection.doc(item._id).remove();
      }
    } catch (e) {
      console.log('单个失败原因', e)
    }
    if(Date.now() - now > 18888){
      console.log("已经完成" + _send)
      return false
    }
  }
  console.log(`可发送${_send}个`)
  return _send;
}


async function getAll(collection) {
  const countResult = await collection.count()
  const total = countResult.total;
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  var result = [];
  for (let i = 0; i < batchTimes; i++) {
    try {
      let _result = await collection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
      result = result.concat(_result.data);
    } catch (e) { }
  }
  return result;
}

function checkTime(val, len) {
  return len === 2 && val < 10 ? '0' + val : val
}
function format(fmt = "YY-MM-DD") {
  var date = new Date();
  return fmt.replace(/([YMDhms])\1*/g, (a, b) => {
    switch (b) {
      case "Y": return date.getFullYear();
      case "M": return checkTime(date.getMonth() + 1, a.length);
      case "D": return checkTime(date.getDate(), a.length);
      case "h": return checkTime(date.getHours(), a.length);
      case "m": return checkTime(date.getMinutes(), a.length);
      case "s": return checkTime(date.getSeconds(), a.length);
    }
  })
}