// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database()
const MAX_LIMIT = 100;
const tpl = {
  "1": "PZd13nHsd-0RVB0PuPqkmid5UPHzT9KOC8B-gmU0QpQ", //最新壁纸专辑提醒
  "2": "If2stVSWyoqXra80rCeFy2FmR0tAA1JRiwZ4AH4eSxs" //签到成功提示
}
// 云函数入口函数
exports.main = async(event, context) => {
  if (event.type) {
    event.templateId = tpl[event.type];
    delete event.type;
  }
  if (!event.templateId) return "需要一个type或者templateId";
  event.page = event.page || "pages/index/index";
  if (!event.data) {
    return "需要传入data"
  }
  var collection = db.collection("formid");
  var now = Date.now();
  var result = await getAll(collection.where({
    send: 1
  }));
  var _send = 0,_fail = 0;
  if (!result.length) return {
    send:0,
    hasNext:false
  };
  console.log(`需要发送${result.length}个`)
  for (i = 0; i < result.length; i++) {
    let item = result[i];
    try {
      await collection.doc(item._id).remove();
      let sendResult = await cloud.openapi.templateMessage.send(Object.assign(event, {
        touser: item._openid,
        formId: item.formid
      }))
      _send++;
    } catch (e) {
      _fail++;
    }
    if (Date.now() - now > 18888) {
      console.log("已经完成" + _send)
      return {
        send: _send,
        hasNext: true
      }
    }
  }

  console.log(`发送成功${_send}个，失败${_fail}个`)
  return {
    send: _send,
    hasNext: false
  };
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


function delay(){
  return new Promise((res)=>{
     setTimeout(res,500)
  })
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