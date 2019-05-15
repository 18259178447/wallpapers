module.exports = {
  dones(data, name ="wallpaper") {
    if(data && data.length > 0){
      return data.map(item => this[name](item))
    } 
    return []
  },
  wallpaper(item) {
    return {
      Image: item.Image,
      ThumbImage: item.ThumbImage,
      id: item.PicInfoID
    }
  },
  album(item){
    return {
      AlbumName: item.AlbumName,
      ThumbImage: item.ImgUrl,
      id: item.AlbumID
    }
  }
}