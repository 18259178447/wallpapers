class Tool {
  downloadData = {};
  constructor() {
  }
  getCatetorys(){
    var categorys = wx._getStorageSync('categorys');
    if (categorys && (Date.now() - categorys.time <= 1000 * 60 * 60 * 24 * 3)){
      return Promise.resolve(categorys)
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
}

wx.Tool = new Tool();