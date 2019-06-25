module.exports = {
   data:{
     currentIndex:0
   },
   onPullDownRefresh(){
     this.listid = this.listid || this.selectComponent('#list-id');
     this.listid.flesh()
   },
  navChanges(e) {//多列表轮播
    var index = typeof e === 'number' ? e : e.detail.current;
    if ((this.listLoaded || (this.listLoaded = []))[index]) {
      return index !== this.data.currentIndex && this.setData({ currentIndex: index})
    };
    this.listLoaded[index] = true;
    this.setData({
      currentIndex: index
    }, () => {
      this.initListComponent(index)
    })
  },
  navChange(e){//多列表 单scroll-view
    var index = typeof e === 'number' ? e : e.detail.current;
    this.initListComponent(index)
  },
  initListComponent(index){
    this.selectComponent('#image-list' + index).init({
      interfaceName: 'WallpaperList',
      data: {
        categoryID: this.data.navArr[index].id
      }
    })
  }
}