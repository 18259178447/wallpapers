// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    let res = await db.collection("init").doc("abc").update({
      data: {
        ver: _.inc(1)
      }
    })
    if (res.stats.updated === 0) throw 0
    else{
      return res;
    }
  }catch(e){
    if (e.toString().indexOf("-502005") > -1){
      await db.createCollection("init");
    }
    if (e === 0 || e.toString().indexOf("-502005") > -1){
      return await db.collection("init").doc("abc").set({
        data:{
          ver:1
        }
      })
    }
  }
 
}