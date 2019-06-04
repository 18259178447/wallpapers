// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database()
const MAX_LIMIT = 100;
const tpl = {
  "1":"PZd13nHsd-0RVB0PuPqkmid5UPHzT9KOC8B-gmU0QpQ",//最新壁纸专辑提醒
  "2":"If2stVSWyoqXra80rCeFy2FmR0tAA1JRiwZ4AH4eSxs"//签到成功提示
}
// 云函数入口函数
exports.main = async (event, context) => {
  //检查参数
  if (event.type) {
    event.templateId = tpl[event.type];
    delete event.type;
  }
  if (!event.templateId) return "需要一个type或者templateId";
  event.page = event.page || "pages/index/index";
  if(!event.data){
    return "需要传入data"
  }


  //获取tables集合里有关formid的集合名称
  var table;
  try{
    table = await db.collection('tables').orderBy('createTime', 'asc').limit(1).get();
    if (!table.data.length) return "总集合为0";
    table = table.data[0];
  }catch(e){
    return "获取总集合失败"
  }
  var total;
  console.log("当前使用:", table.name)
  try{
    total = await db.collection(table.name).count();
    total = total.total;
  }catch(e){
    return "获取name为" + table.name + "错误"
  }
  if (!total) return table.name + "还没有收集到formid";  
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100);
  for (let i = 0; i < batchTimes; i++) {
    let result
    try{
      result = await db.collection(table.name).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
      result = result.data;
    }catch(e){
      return `第${i * MAX_LIMIT}起失败了`
    }
    for(let j = 0; j < result.length; j++){
      let item = result[j];
      let isExpire = item.expire - new Date() > 0;
      if (true){
        try{
          let sendResult = await cloud.openapi.templateMessage.send(Object.assign(event,{
            touser: item._id,
            formId: item.formid
          }))
        }catch(e){
          console.log(e)
        }

      }
    }
  }
  try{
    await db.collection('tables').doc(table._id).remove()
  }catch(e){
    return "删除name:" + table.name + "失败"
  }
  
  return true
}

// {
//   touser: item._id,
//     templateId,
//     formId: item.formid,
//       page: 'commonPkg/pages/albumDetail/albumDetail?id=40004',
//         data: {
//     keyword1: {
//       value: '六一儿童节快乐',
//               },
//     keyword2: {
//       value: '祝你：天真烂漫、童心不改，红光满面、童颜大悦，活蹦乱跳、返老还童，童心荡漾、童趣无限！',
//               },
//   }
// }