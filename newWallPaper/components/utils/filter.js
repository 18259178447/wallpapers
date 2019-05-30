module.exports = {
  dones(data, name ="wallpaper") {
    if(name === "empty") return data;
    if(data && data.length > 0){
      return data.map(item => this[name](item))
    } 
    return []
  },
  wallpaper(item) {
    //http://filebzx01.313515.com
    //http://filebzx002.313515.com 
    //http://fx1.313515.com
    return wx.safe ? {
      Image: item.Image,
      ThumbImage: item.ThumbImage,
      id: item.PicInfoID
    }:{
        Image: item.thumb,
        ThumbImage: item.thumb,
        id: item.id      
    }
  },
  album(item){
    if(wx.safe){
      return {
        AlbumName: item.AlbumName,
        ThumbImage: item.ImgUrl,
        id: item.AlbumID
      }
    }
    if(item.appid) return {};
    return {
      AlbumName: item.advname,
      ThumbImage: item.thumb,
      id: /id=(\d+)\b/.test(item.link) && +RegExp.$1
    }
  }
}