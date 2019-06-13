require("./init.js");
var config = require("./config.js"); 

module.exports = {
  exposure:0,
  click:0,
  error:false,
  isad:true,//是否是需要曝光广告
  errorHandle(){
    if (!this.error && this.exposure) {
      wx.$("aderrors").add({
        data: {
          exposure: this.exposure,
          date: new Date().format("YY-MM-DD")
        }
      })
    }
  },
  loadHandle(){
    this.exposure++;
    if(this.exposure > 20 && !this.click){//如果曝光大于15并且没有点击 不曝光了
      this.isad = false;
    }
    // if(this.exposure > 25 && this.click < 2){
    //   this.isad = false;
    // }
    wx.$("adloads").add({
      data: {
        date: new Date().format("YY-MM-DD")
      }
    })
  },
  clickHandle(method){
    this.click++;
    this.isad = true;
    wx.$("adclicks").add({
      data: {
        date: new Date().format("YY-MM-DD"),
        method
      }
    })
  }
}