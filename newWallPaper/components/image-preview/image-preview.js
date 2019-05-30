// components/image-preview/image-preview.js



Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgs:[],
    current:0,
    circular:true
  },
  detached(){
    this.page = null;
  },
  /**
   * 组件的方法列表
   */
  methods: {
    init(param){
      var { index=0,page } = param;
      var obj = {}, 
          current = index % 3,
          start = Math.max(0, index - 1),
          imgs = page.data.dataList,
          _imgs = null;
      if (current) obj.current = current;
      if (imgs.length <= 3) _imgs = imgs;
      else{
        _imgs = imgs.slice(start, index + 2);
        //如果点击了最后一张
        if (index + 1 === imgs.length) _imgs.push(imgs[0]);
        if(index === 0) {//如果点击了第一张
          obj.circular = false;
          // _imgs.push(imgs[2]);
        }else if (current === 0) {
          _imgs.push(_imgs.shift())
        } else if (current === 2) {
          _imgs.unshift(_imgs.pop());
        }
      }
      obj.imgs = _imgs.map(item => parse(item));
      this.triggerEvent("change", obj.imgs[current])
      this.setData(obj);
      this.currentIndex = current;
      this.dataIndex = index;
      this.page = page;
      return this; 
    },
    changeHandle(e){
      var currentIndex = e.detail.current,
        preCurrentIndex = this.currentIndex,
        dataIndex = this.dataIndex,
        page = this.page,
        len = page.data.dataList.length,
        obj = {},
        isLoadMore = false,
        direct = currentIndex - preCurrentIndex;
        this.triggerEvent("change",this.data.imgs[currentIndex])
      direct = direct === 1 || direct === -2 ? 1 : -1;
      dataIndex += direct;
      if (dataIndex === -1) dataIndex = len - 1;
      if (dataIndex === len) dataIndex = 0;
      this.currentIndex = currentIndex;
      this.dataIndex = dataIndex;
      wx.showLoading({ title: '加载中...', mask: true });
      if (dataIndex === 0 && page.hasNext) {
        obj.circular = false;
        setTimeout(()=>{
          this.setData(obj, wx.hideLoading)
        },320)
        return
      }
      if (direct === 1) {
        obj[`imgs[${(currentIndex + 1) % 3}]`] = parse(page.data.dataList[dataIndex + 1] || page.data.dataList[0]);
        if (page.hasNext && len - dataIndex < 3) isLoadMore = true
      } else {
        obj[`imgs[${(currentIndex + 2) % 3}]`] = parse(page.data.dataList[dataIndex - 1] || page.data.dataList[len - 1]);
      }
      if (!this.data.circular) {
        obj.circular = true;
        setTimeout(() => {
          this.setData(obj, wx.hideLoading)
        }, 320)
        return;
      }
      this.setData(obj, () => {
        isLoadMore ? page.__loadedMore().then(wx.hideLoading) : setTimeout(wx.hideLoading, 100)
      })
    }
  }
})


function parse(item) {
  return item;
  return {
    Image: item.Image,
    ThumbImage: item.ThumbImage,
    id: item.PicInfoID,
  }
}
