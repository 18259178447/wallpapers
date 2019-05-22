class Tool {
  downloadData = {};
  constructor() {
  }
  getCatetorys(){
    var categorys = wx._getStorageSync('categorys');
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
          key: 'categorys',
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
        key: 'categorys',
        data: categorys,
      })
      return categorys;
    })
  }
  
  addrPromise(){
    var safe = wx.getStorageSync('safe')
    if (safe !== '') {
      wx.safe = safe;
      return console.log('缓存',safe),Promise.resolve(wx.safe)
    }
    var provinces = "北京,天津,上海,重庆,河北,山西,辽宁,吉林,黑龙江,江苏,浙江,安徽,江西,山东,河南,湖北,湖南,广东,海南,四川,贵州,云南,陕西,甘肃,青海,台湾,内蒙古,广西,西藏,宁夏,新疆,香港,澳门";
   return wx.promiseApi('request', {
      url: 'https://h.ip138.com/ip/getlocation/',
    }).then(res => {

      if (!res.data || !res.data.status) return console.log('错误不安全'),false;
      var ip_address = res.data.data;
      //安全ip
      if (ip_address.ip === "117.136.75.216" || 
        ip_address.ip === "111.143.61.172") return console.log('自己ip'),true;
      
      //不安全ip
      if (ip_address.ip === "218.104.234.179") return console.log('工ip'),false;
      //安全省份
      return console.log('省份决定'),provinces.split(",").some(item=>{
        return ip_address.location.indexOf(item) > -1
      })
    }).then(res=>{
      wx.safe = res;
      console.log(res);
      wx.setStorage({
        key: 'safe',
        data: res
      })
      return res;
    }).catch(e=>{
      console.log('错误',false);
      return wx.safe = false;
    })
  }
  downloadImage(url){
    url = url.replace(/https?/, 'https');
    return wx.promiseApi('downloadFile',{url}).then(res=>{
      return wx.promiseApi("saveImageToPhotosAlbum", {
        filePath: res.tempFilePath
      })
    })
  }
}

wx.Tool = new Tool();