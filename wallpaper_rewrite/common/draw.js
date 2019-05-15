/**
        ´´´´´´´´██´´´´´´´
        ´´´´´´´████´´´´´´
        ´´´´´████████´´´´
        ´´`´███▒▒▒▒███´´´´´
        ´´´███▒●▒▒●▒██´´´
        ´´´███▒▒▒▒▒▒██´´´´´
        ´´´███▒▒▒▒██´                  
        ´´██████▒▒███´´´´´               
        ´██████▒▒▒▒███´´                   
        ██████▒▒▒▒▒▒███´´´´                
        ´´▓▓▓▓▓▓▓▓▓▓▓▓▓▒´´                 
        ´´▒▒▒▒▓▓▓▓▓▓▓▓▓▒´´´´´              
        ´.▒▒▒´´▓▓▓▓▓▓▓▓▒´´´´´             
        ´.▒▒´´´´▓▓▓▓▓▓▓▒                 
        ..▒▒.´´´´▓▓▓▓▓▓▓▒               
        ´▒▒▒▒▒▒▒▒▒▒▒▒                      
        ´´´´´´´´´███████´´´´´              
        ´´´´´´´´████████´´´´´´´
        ´´´´´´´█████████´´´´´´
        ´´´´´´██████████´´´´             大部分人都在关注你飞的高不高，却没人在乎你飞的累不累，这就是现实！
        ´´´´´´██████████´´´                     我从不相信梦想，我，只，相，信，自，己！
        ´´´´´´´█████████´´
        ´´´´´´´█████████´´´
        ´´´´´´´´████████´´´´´
        ________▒▒▒▒▒
        _________▒▒▒▒
        _________▒▒▒▒
        ________▒▒_▒▒
        _______▒▒__▒▒
        _____ ▒▒___▒▒
        _____▒▒___▒▒
        ____▒▒____▒▒
        ___▒▒_____▒▒
        ███____ ▒▒
        ████____███
        █ _███_ _█_███
——————————————————————————女神保佑，代码无bug——————————————————————
**/


/**
 * Draw类
 * @param  {string} id canvasid
 * @param  {string} width 宽
 * @param  {string} height 稿
 * @return {object}    创建的类
 */
/**
 API
 1.addText 画文本（单行文本，单行省略，多行省略）
 @param  {object} param  参数是一个对象，对象属性说明如下
 @return {object}    创建的类
  {
    "type": "text",//类型 add方法必填
    "text": "",//文本内容 文本类型必填
    "size": 10,//字体大小 默认10
    "family": "sans-serif",//字体族名  默认sans-serif
    "weight": "normal",//字体粗细。仅支持 normal, bold 默认normal
    "style": "",//字体样式。仅支持 italic, oblique, normal 默认normal
    "color": "#000",//字体颜色 默认#000
    "x":0, //位置x 默认0
    "y": 0,//位置y 默认0
    "maxWidth": 0,//绘制的最大宽度 单行文本可用
    "hAlign": "left",//水平对齐方式可选值 'left'、'center'、'right'  默认left
    "vAlign": "top",//垂直对齐方式可选值 'top'、'bottom'、'middle'、'normal' 默认top
    "width": 0,//文本宽度 有设置且大于0时开启多行文本
    "lineHeight": 1.2,//行高  多行文本时可用 默认为字体大小1.2倍 当lineHeight<字体大小时行高等于lineHeight*字体大小
    "lineClamp":1//行数  多行文本时可用  限制最高行数,默认一行，默认情况下如果有设置width 也就是单行省略
  }

  2.addImage 画图片 (普通图片 圆角图片)
  @param  {object} param  参数是一个对象，对象属性说明如下
  @return {object}    创建的类
  {
    "type": "image",//类型 add方法必填
    "src":'',//图片路径 可以使临时路径 相对路径 网络资源
    "defealtSrc":"",//src错误时的默认图
    "radiu": 0,//图片圆角 可以设置不同的半径 radiu:"20 30 20 30" 或者 "20 30"
    //以下表示在canvas中的宽高
    "dx":0,
    "dy":0,
    "dw":"auto",//宽度  默认图片宽度
    "dh":"auto",//高  默认图片高度
    //以下表示在原图中截取一个矩形,而不是完整的图片（默认完整图片）并且不管设置rpx还是px  以上4个单位都是px
    "sy":0,
    "sx":0,
    "sw":"auto",
    "sh":"auto",
    "mode":"aspectFill" //可选值 'scaleToFill'、'aspectFill'默认scaleToFill  参考微信图片组件说明 widthFix可通过高度auto实现
  }

  3.addLabel 画标签 
  @param  {object} param  参数是一个对象，对象属性说明如下
  @return {object}    创建的类
  {
    "type": "label",//类型 add方法必填
    "label": "",//标签文字 可以是数组 表示多个标签，相应的一下颜色属性也可以是数组
    "size": 10,//标签字体大小 默认10
    "family": "sans-serif",//字体族名  默认sans-serif
    "weight": "normal",//字体粗细。仅支持 normal, bold 默认normal
    "style": "",//字体样式。仅支持 italic, oblique, normal 默认normal
    "color": "#000",//字体颜色 默认#000 可以是数组
    "x": 0, //位置x 默认0
    "y": 0,//位置y 默认0
    "hAlign": "left",//水平对齐方式可选值 'left'、'center'、'right'  默认left
    "vAlign": "top",//垂直对齐方式可选值 'top'、'bottom'、'middle'、'normal' 默认top
    "between":10,//标签之间的距离 默认10
    "padding":20,//边框和字体之间的编剧 默认20 '20 30'
    "borderColor":'#fff',//边框颜色 默认等于字体颜色 根据标签的数量 可以是数组
    "bgColor":"transparent",//默认为透明 即没有背景颜色 根据标签的数量 可以是数组
    "radiu":0 //半径  "10 20" "10 20 30"
  }

  4.addCustom 自定义方法
  @param  {function} callback  回调函数  函数参数带有ctx，如果有网络图片 第二个参数是网络图片资源
  @param  {array | string} url  自定义方法里需要用到的网络图片，预加载的图片资源会出现在回调函数的第二个参数里
  @return {object}    创建的类

  5.draw 画，但是不导出图片
  @param  {boolean} 本次绘制是否接着上一次绘制
  @return {object}    promise对象
  
  6.drawToImage 画 导出图片
  @param  {boolean} 本次绘制是否接着上一次绘制
  @param  {object} 导出图片的相关属性，说明看https://developers.weixin.qq.com/miniprogram/dev/api/canvas/temp-file.html
  {
    x: 100,
    y: 200,
    width: 50,
    height: 50,
    destWidth: 100,
    destHeight: 100,
  }
  @return {object}    promise对象

  7.rpx2px  rpx转px
  @param  {number} rpx
  @return {number} px

  8.randomHexColor随机颜色
  @return {string} 返回随机颜色
 */


// for (let ch of '🐹🐂🐯🐰🐲🐍🐴🐑🐒🐔') {
//   console.log(ch)
// }


wx._getImageInfo = function (src) {
  if (typeof src === "object") src = src.src;
  if (!src) return Promise.resolve(null);
  if (src.indexOf('//tmp') === -1) src = src.replace(/https?/, 'https');
  return new Promise((resolve, reject) => {
    this.getImageInfo({
      src,
      success: resolve,
      fail: reject
    })
  })
}

class Draw {
  constructor(id, unit) {
    this.ctx = wx.createCanvasContext(id);
    this.datas = [];
    this.preLoads = [];
    if (unit === "rpx") {
      this.unit = unit;
      this.windowWidth = wx.windowWidth || wx._getSystemInfoSync().windowWidth
    }
  }
  addText(param) {
    param.type = "text";
    this.datas.push(param);
    param = null;
    return this;
  }
  addImage(param) {
    var p = wx._getImageInfo(param.src);
    if (param.defealtSrc) {
      let defealtSrc = param.defealtSrc;
      p = p.catch(e => {
        return wx._getImageInfo(defealtSrc)
      })
    }
    param.type = "image";
    param.index = this.preLoads.length;
    this.preLoads.push(p);
    this.datas.push(param);
    param = null;
    return this;
  }
  addLabel(param) {
    param.type = "label";
    this.datas.push(param);
    param = null;
    return this;
  }
  addCustom(callback, src) {
    var param = {};
    param.type = "custom";
    param.fn = callback;
    param.index = this.preLoads.length;
    if (src) {
      if (typeof src === "string") {
        this.preLoads.push(wx._getImageInfo(src));
        param.len = 1;
      } else {
        src.forEach(item => {
          this.preLoads.push(wx._getImageInfo(item));
        })
        param.len = src.length;
        src = null;
      }
    }
    this.datas.push(param);
    return this;
  }
  draw(reserve = false) {
    if (this.preLoads.length > 0) {
      return Promise.all(this.preLoads).then(this.startDraw.bind(this, reserve))
    }
    return this.startDraw(reserve);
  }
  drawToImage(reserve = false, param = {}) {
    return this.draw(reserve).then(() => {
      
      return new Promise((resolve, reject) => {
        wx.canvasToTempFilePath({
          canvasId: this.ctx.canvasId,
          success: res => {
            param = null;
            resolve(res.tempFilePath);
          },
          fail: reject,
          ...param
        })
      })
    })
  }
  startDraw(reserve, imgs) {
    var datas = this.datas;
    this.datas = [];
    this.preLoads = [];
    datas.forEach(item => {
      switch (item.type) {
        case 'text':
          this.drawText(item);
          break;
        case "image":
          let { width, height, path } = imgs[item.index];
          item.src = path;
          item.width = width;
          item.height = height;
          this.drawImage(item);
          break;
        case "label":
          this.drawLabel(item);
          break;
        case "custom":
          if (item.len) {
            item.fn(this.ctx, imgs.slice(item.index, item.index + item.len))
          } else {
            item.fn(this.ctx)
          }
      }
    });
    return new Promise((resolve, reject) => {
      this.ctx.draw(reserve, resolve);
    })
  }
  drawLabel(param) {
    var {
      label = "",
      size = 10,
      family = "sans-serif",
      weight = "normal",
      style = "normal",
      color = "#000",
      x = 0,
      y = 0,
      hAlign = "left",
      vAlign = "top",
      between = 10,
      padding = 10,
      borderColor = color,
      bgColor = 'transparent',
      radiu = 0,
      randomColor = this.randomHexColor
    } = param,
      ctx = this.ctx,
      totalHeight,
      totalWidth = 0,
      pl, pr, pt, pb;
    param = null;
    if (typeof label === 'string') label = [label];
    if (color === 'r') {
      color = label.map(() => {
        return randomColor();
      })
      if (borderColor === "r") {
        borderColor = color;
      }
    }
    if (borderColor === 'r') {
      borderColor = label.map(() => {
        return randomColor();
      })
    }
    if (bgColor === 'r') {
      bgColor = label.map(() => {
        return randomColor();
      })
    }
    if (typeof color === 'string') color = [color];
    if (typeof borderColor === 'string') borderColor = [borderColor];
    if (typeof bgColor === 'string') bgColor = [bgColor];
    if (vAlign === "center") vAlign = "middle";
    if (this.unit === "rpx") {
      size = Math.round(this.rpx2px(size));
      x = this.rpx2px(x);
      y = this.rpx2px(y);
      between = this.rpx2px(between);
    }
    padding = this.__parseFour(padding);
    if (typeof padding === 'number') {
      pl = pr = pt = pb = padding;
    } else {
      [pt, pr, pb, pl] = padding;
      padding = null;
    }
    totalHeight = size + pt + pb;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = [style, weight, size + "px", family].join(' ');
    label = label.filter(item=>{
        if(item) return true;
        return false
    })
    label = label.map(item => {
      let left = totalWidth,
        w = pl + ctx.measureText(item).width + pr;
      totalWidth += w + between;
      return {
        left,
        w,
        h: totalHeight,
        text: item
      }
    })
    totalWidth -= between;

    switch (hAlign) {
      case "center":
        x -= totalWidth / 2;
        break;
      case "right":
        x -= totalWidth;
        break;
    }
    switch (vAlign) {
      case "middle":
        y -= totalHeight / 2;
        break;
      case "bottom":
        y -= totalHeight;
    }
    radiu = this.__parseFour(radiu);
    label.forEach((item, index) => {
      let bg = bgColor[index] || bgColor[0];
      if (bg === 'transparent') {
        ctx.setStrokeStyle(borderColor[index] || borderColor[0])
      } else {
        ctx.setFillStyle(bg)
      }
      if (radiu == 0) {
        ctx.rect(x + item.left, y, item.w, item.h)
      } else {
        this.__drawRadiuRect(x + item.left, y, item.w, item.h, radiu)
      }
      
      if (bg === 'transparent') {
        ctx.stroke()
      } else {
        ctx.fill()
      }
      ctx.setFillStyle(color[index] || color[0]);
      ctx.fillText(item.text, x + item.left + pl, y + pt + size / 2);
    })

    label = randomColor = color = bgColor = bgColor = null;
  }
  drawImage(param) {
    var {
      src,
      radiu = 0,
      width,
      height,
      dx = 0,
      dy = 0,
      dw = "auto",
      dh = "auto",
      sy = 0,
      sx = 0,
      sw = "auto",
      sh = "auto",
      mode = "aspectFill",
      hAlign = 'left',
      vAlign = 'top'
    } = param,
      ctx = this.ctx;
    param = null;
    if (sw === "auto" && sh === "auto") {
      sw = width; sh = height;
    } else if (sw === "auto") {
      sw = width / height * sh;
    } else if (sh === 'auto') {
      sh = height / width * sw;
    }
    if (this.unit === "rpx") {
      dx = this.rpx2px(dx);
      dy = this.rpx2px(dy);
      dw = this.rpx2px(dw);
      dh = this.rpx2px(dh);
    }
    
    if (dw === "auto" && dh === "auto") {
      dw = sw; dh = sh;
    } else if (dw === "auto") {
      dw = sw / sh * dh;
    } else if (dh === 'auto') {
      dh = sh / sw * dw;
    } else if (mode !== 'scaleToFill') {
      let dr = dw / dh,
        sr = sw / sh,
        temp;
      if (sr > dr) {//原图像更宽   高度不变  宽度及sx改变
        temp = dw / dh * sh;
        sx += (sw - temp) / 2;
        sw = temp;
      } else {//原图像更高   宽度不变  高度及sy改变
        temp = dh / dw * sw;
        sy += (sh - temp) / 2;
        sh = temp;
      }
    }
    if (vAlign === "center") vAlign = "middle";
    switch (hAlign) {
      case "center":
        dx -= dw / 2
        break;
      case "right":
        dx -= dw
        break;
    }
    switch (vAlign) {
      case "middle":
        dy -= dh / 2
        break;
      case "bottom":
        dy -= dh
    }
    if (radiu == 0) {
      // console.log(src, sx, sy, sw, sh, dx, dy, dw, dh)
      return ctx.drawImage(src, dx, dy, dw, dh);
    }
    ctx.save()
    this.__drawRadiuRect(dx, dy, dw, dh, this.__parseFour(radiu))
    ctx.clip();
    
    ctx.drawImage(src, dx, dy, dw, dh);
    ctx.restore()
  }
  __drawRadiuRect(x, y, w, h, r) {
    var rtl, rtr, rbl, rbr, shortestHalf = Math.min(w, h) / 2, isCircle = false, ctx = this.ctx;
    if (Array.isArray(r)) {
      ([rtl, rtr, rbr, rbl] = r);
      r = null;
    } else {
      if (r >= shortestHalf) {
        isCircle = true;
        r = shortestHalf;
      } else {
        rtl = rtr = rbl = rbr = r;
      }
    }
    if (isCircle) {
      ctx.arc(x + r, y + r, r, 0, 2 * Math.PI);
    } else {
      ctx.beginPath()
      ctx.moveTo(x, y + rtl);
      ctx.arc(x + rtl, y + rtl, rtl, Math.PI, 1.5 * Math.PI);//左上角圆角
      ctx.lineTo(x + w - rtr, y);
      ctx.arc(x + w - rtr, y + rtr, rtr, 1.5 * Math.PI, 0)//右上角圆角
      ctx.lineTo(x + w, y + h - rbr);
      ctx.arc(x + w - rbr, y + h - rbr, rbr, 0, 0.5 * Math.PI)//右下角圆角
      ctx.lineTo(x + rbl, y + h);
      ctx.arc(x + rbl, y + h - rbl, rbl, 0.5 * Math.PI, Math.PI)//左下角圆角
      ctx.closePath();
    }
  }
  __parseFour(value) {
    if (typeof value === "string" && !Number(value)) {
      value = value.split(' ').map(item => {
        if (this.unit === "rpx") item = this.rpx2px(item)
        else {
          item = Number(item);
        }
        return item;
      });
      value[2] = value[2] || value[0];
      value[3] = value[3] || value[1];
    } else {
      if (this.unit === "rpx") value = this.rpx2px(value);
      else {
        value = Number(value);
      }
    }
    return value;
  }
  drawText(param) {
    var {
      text = "",
      size = 10,
      family = "sans-serif",
      weight = "normal",
      style = "normal",
      color = "#000",
      x = 0,
      y = 0,
      maxWidth,
      hAlign = "left",
      vAlign = "top",
      width = 0,
      lineHeight = 1.2 * size,
      lineClamp = 0
    } = param,
      ctx = this.ctx;
    param = null;
    text = text.replace(/\n+/g,'');
    if (lineHeight < size) {
      lineHeight = lineHeight * size;
    }
    if (this.unit === "rpx") {
      size = Math.round(this.rpx2px(size));
      x = this.rpx2px(x);
      y = this.rpx2px(y);
      maxWidth = this.rpx2px(maxWidth);
      width = this.rpx2px(width);
      lineHeight = this.rpx2px(lineHeight);
    }
    if (vAlign === "center") vAlign = "middle";
    ctx.font = [style, weight, size + "px", family].join(' ');
    ctx.fillStyle = color;
    if (!width) {
      ctx.textAlign = hAlign;
      ctx.textBaseline = vAlign;
      ctx.fillText(text, x, y, maxWidth);
      return;
    }
    width = Math.max(width, size * 2);
    var rows = [], temp = "", isExceed = false, height = 0;
    
    for (var ch of text) {//必须使用for of循环
      if (ctx.measureText(temp + ch).width > width) {
        rows.push(temp);
        temp = ch;
        if (lineClamp > 0 && rows.length >= lineClamp) {
          temp = '';
          isExceed = true;
          break;
        }
      } else {
        temp += ch;
      }
    }
    if (temp.length > 0) {
      rows.push(temp);
    }
    if (isExceed) {//超出
      let lastRow = rows[rows.length - 1];
      for (ch of lastRow) {
        if (ctx.measureText(temp + ch + '...').width > width) {
          break;
        } else {
          temp += ch;
        }
      }
      rows[rows.length - 1] = temp + '...';
    }
    height = lineHeight * rows.length;
    if (lineClamp > 0 && rows.length === 1) width = ctx.measureText(rows[0]).width
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    switch (hAlign) {
      case "center":
        x -= width / 2;
        break;
      case "right":
        x -= width;
        break;
    }
    switch (vAlign) {
      case "top":
        y += lineHeight / 2;
        break;
      case "middle":
        y = y - height / 2 + lineHeight / 2;
        break;
      case "bottom":
        y = y - height + lineHeight / 2;
    }
    rows.forEach((item, index) => {
      ctx.fillText(item, x, y + index * lineHeight);
    })
    rows = null;
  }
  rpx2px(rpx) {
    if (!rpx || rpx === 'auto') return rpx;
    return this.windowWidth / 750 * rpx;
  }
  randomHexColor() { //随机生成十六进制颜色
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
  }
}

// wx.Draw = Draw;
export default Draw