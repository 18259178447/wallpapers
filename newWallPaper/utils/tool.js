class Tool {
  constructor() {
  }
  getCatetorys(){
    var categorys = wx._getStorageSync('categorysV2');
    if (categorys && (Date.now() - categorys.time <= 1000 * 60 * 60 * 24 * 3)){
      return Promise.resolve(categorys)
    }
    if(!wx.safe){
     return wx._request({
        url: '',
        data: {
          m: "yj_erha",
          "do": "Nav",
        }
      }).then(res=>{
        var categorys = {
          subCategorys: res.data.map(item => {
            return {
              title: item.name,
              id: item.id
            }
          })
        }
        categorys.time = Date.now();
        wx._setStorage({
          key: 'categorysV2',
          data: categorys,
        })
        return categorys
      })
    }

    return wx._request({
      url: 'Categorys',
    }).then(data => {
      var subCategorys = [];//子分类
      data = data.Data.DataList.filter(item => { return !(item.CategoryID === 103 || item.CategoryID === 102 || item.CategoryTitle === '头像' || item.CategoryTitle === '表情') }).map(item => {
        subCategorys.push(item.SubArray.map(subItem => {
          return {
            SubID: subItem.SubID,
            IconUrl: subItem.IconUrl,
            SubName: subItem.SubName,
            id: item.CategoryID
          };
        }))
        delete item.Count;
        delete item.SubArray;
        return item;
      });
      var index;
      if (data.some((item, _index) => {
        index = _index;
        return item.CategoryTitle === '美女车模';
      })) {
        data.unshift(data.splice(index, 1)[0])
        subCategorys.unshift(subCategorys.splice(index, 1)[0])
      }

      categorys = {
        mainCategorys: data,
        subCategorys,
      }
      categorys.time = Date.now();
      wx._setStorage({
        key: 'categorysV2',
        data: categorys,
      })
      return categorys;
    })
  }
  addrPromise(){
    var safe = wx._getStorageSync('safev2');
    
    if (safe !== '') {
      wx.safe = safe;
      return console.log('缓存',safe),Promise.resolve(wx.safe)
    }
    var provinces = "北京,天津,上海,重庆,河北,山西,辽宁,吉林,黑龙江,江苏,浙江,安徽,江西,山东,河南,湖北,湖南,广东,海南,四川,贵州,云南,陕西,甘肃,青海,台湾,内蒙古,广西,西藏,宁夏,新疆,香港,澳门";
   return wx.promiseApi('request', {
    //  url: 'https://wx.flunar.com/v1/ip',
     url: 'https://ip.qust.me/ip',
      // url: 'https://h.ip138.com/ip/getlocation/',
    }).then(res => {
      if (!res.data || res.data.code !== 0) return console.log('错误不安全'),0;
      var ip_address = res.data.data;
      console.log(ip_address)
      //安全ip
      if (ip_address.ip === "117.136.75.149") return console.log('自己ip'),true;
      
      //不安全ip
      if (ip_address.ip === "218.104.234.179") return console.log('工ip'),false;
      //安全省份
      return console.log('省份决定'),provinces.split(",").some(item=>{
        return ip_address.region.indexOf(item) > -1
      })
    }).then(res=>{
      wx.safe = res || false;
      if(res === 0) return false;
      wx._setStorage({
        key: 'safev2',
        data: res
      })
      return res;
    }).catch(e=>{
      console.log('错误',false);
      return wx.safe = false;
    })
  }
  downloadImage(imageItem){
    var url = imageItem.Image.replace(/https?/, 'https');
    return wx.promiseApi('downloadFile',{url}).then(res=>{
      return wx.promiseApi("saveImageToPhotosAlbum", {
        filePath: res.tempFilePath
      })
    }).then(res=>{
      (this.downloadData = this.downloadData || []).unshift(imageItem);
      return res;
    })
  }
  collectImage(imageItem){
    var { id } = imageItem;
    var index = this.checkImageIsCollect(id,true);
    if(index > -1){
      this.collectData.splice(index,1);
    }else{
      this.collectData.unshift(imageItem);
    }
    this.collectChange = true
    return Promise.resolve(index > -1 ? 0 : 1)
  }
  checkImageIsCollect(id,flag){
    var collectData = (this.collectData || (this.collectData = wx._getStorageSync("collectData") || []));
    var index = -1;
    collectData.some((item,_index) => {
      if (id === item.id) return index = _index, true
    })
    return flag ? index : index > -1;
  }
  saveData(){
    this.saveCollect();
    this.saveDownload();
  }
  saveCollect(fn){
    if (this.collectData && this.collectChange) {
      wx._setStorage({
        key: 'collectData',
        data: this.collectData,
      })
      this.collectChange = false;
      fn && fn(this.collectData)
    }else if(fn){
      fn(this.collectData || (this.collectData = wx._getStorageSync("collectData") || []))
    }
  }
  saveDownload(fn){
    if (this.downloadData && this.downloadData.length) {
      let oldDownloadData = wx._getStorageSync("downloadData") || [];
      let idsObj = {};
      let newDownloadData = [];
      this.downloadData.concat(oldDownloadData).forEach(item => {
        if (!idsObj[item.id]) {
          idsObj[item.id] = 1;
          newDownloadData.push(item)
        }
      })
      this.downloadData = [];
      wx._setStorage({
        key: 'downloadData',
        data: newDownloadData.slice(0, 400),
      })
      fn && fn(newDownloadData)
    }else if(fn){
      fn && fn(wx._getStorageSync("downloadData") || [])
    }
  }
}

wx.Tool = new Tool();