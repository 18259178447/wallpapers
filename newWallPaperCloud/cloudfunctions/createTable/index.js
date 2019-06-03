// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  return createCollection()
}

async function createCollection(){
  var d = new Date();
  var day = d.getDate();
  d.setDate(day + 1);
  var name = `formid__${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  try{
    let result = await db.createCollection(name);
    await db.collection('tables').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name,
        createTime: db.serverDate()
      }
    })
    return result;
  }catch(e){
    return e.toString();
  }
}