// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
const _ = db.command
const MAX_LIMIT = 100;
var date;

// 云函数入口函数
exports.main = async(event, context) => {
  date = format("YY-MM-DD");
  var error = await getadErrorData();
  var load = await getadLoadData();
  var click = await getadClickData();
  var data = {
    date,
    error,
    load,
    click
  }
  await db.collection('stat').add({
    data
  })
  return data
}
async function getadClickData(){
  var adclickCount = await db.collection('adclicks').count();
  try{
    await db.collection('adclicks').where({
      _openid: _.neq("openid")
    }).remove()
  }catch(e){
    console.log("点击数据失败",e)
  }
  return adclickCount
}

async function getadErrorData() {
  var collection = db.collection('aderrors').orderBy('_openid', 'asc');
  var result = await getAll(collection);
  console.log("aderrors总共" + result.length + "数量")
  var count25 = 0;
  var count20 = 0;
  var count10 = 0;
  var allCount = 0;
  for (i = 1; i < result.length; i++) {
    let item = result[i];
    if (item.exposure >= 25) {
      count25++;
    } else if (item.exposure >= 20) {
      count20++;
    } else if (item.exposure >= 10) {
      count10++;
    }
    allCount++;
  }
  try {
    await db.collection('aderrors').where({
      _openid: _.neq("openid")
    }).remove()
  } catch (e) {
    console.log("errors删除失败",e)
  }
  return {
    allCount,
    count25,
    count20,
    count10,
  }
}
async function getadLoadData() {
  var collection = db.collection('adloads').orderBy('_openid', 'asc');
  var result = await getAll(collection)
  console.log("adloads总共" + result.length + "数量")
  var currentOpenid = result[0];
  var exposure = 1;
  var count25 = 0;
  var count20 = 0;
  var count10 = 0;
  var allCount = 0;
  for (i = 1; i < result.length; i++) {
    let item = result[i];
    if (item._openid === currentOpenid) {
      exposure++;
      continue;
    };
    if (exposure >= 25) {
      count25++;
    } else if (exposure >= 20) {
      count20++;
    } else if (exposure >= 10) {
      count10++;
    }
    allCount++;
    exposure = 1;
    currentOpenid = item._openid;
  }

  try {
    await db.collection('adloads').where({
      _openid: _.neq("openid")
    }).remove()
  } catch (e) {
    console.log("删除失败")
  }
  return {
    len: result.length,
    allCount,
    count25,
    count20,
    count10
  }
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
    } catch (e) {}
  }
  return result;
}



async function createCollection() {
  var d = new Date();
  var day = d.getDate();
  d.setDate(day + 1);
  var name = `formid__${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  console.log(d.getDate())
  try {
    let result = await db.createCollection(name);
    await db.collection('tables').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name,
        createTime: db.serverDate()
      }
    })
    return result;
  } catch (e) {
    return e.toString();
  }
}


function checkTime(val, len) {
  return len === 2 && val < 10 ? '0' + val : val
}
function format(fmt = "YY-MM-DD hh:mm:ss") {
  var date = new Date();
  // date.setDate(date.getDate() + 1);
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