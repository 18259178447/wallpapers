Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _wepy = require("./../../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

var _back = require("./../../mixins/back.js");

var _back2 = _interopRequireDefault(_back);

var _wallpaperApi = require("./../../api/wallpaper-api.js");

var _wallpaperApi2 = _interopRequireDefault(_wallpaperApi);

var _date = require("./../../utils/date.js");

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _asyncToGenerator(fn) {
    return function() {
        var gen = fn.apply(this, arguments);
        return new Promise(function(resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);
                    var value = info.value;
                } catch (error) {
                    reject(error);
                    return;
                }
                if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(function(value) {
                        step("next", value);
                    }, function(err) {
                        step("throw", err);
                    });
                }
            }
            return step("next");
        });
    };
}

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var device = wx.getSystemInfoSync();

var windowWidth = device.windowWidth;

var windowHeight = device.windowHeight;

var Example = function(_wepy$page) {
    _inherits(Example, _wepy$page);
    function Example() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Example);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Example.__proto__ || Object.getPrototypeOf(Example)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {
            disableScroll: true
        }, _this.data = {
            width: windowWidth,
            height: windowHeight,
            hidden: false,
            statusHeight: 22,
            index: 0,
            wallpapers: [],
            page: 1,
            size: 10,
            totalPages: 1,
            loading: false
        }, _this.components = {}, _this.mixins = [ _back2.default ], _this.methods = {
            change: function change(e) {
                this.index = e.detail.current;
                if (parseInt(this.index) === this.wallpapers.length - 1) {
                    this.loadData();
                }
            },
            saveImage: function saveImage() {
                var _this2 = this;
                wx.getSetting({
                    success: function success(res) {
                        if (!res.authSetting["scope.writePhotosAlbum"]) {
                            wx.authorize({
                                scope: "scope.writePhotosAlbum",
                                success: function success(res) {
                                    wx.showLoading({
                                        title: "生成图片中"
                                    });
                                    _this2.downloadTmpImage();
                                },
                                fail: function fail(res) {
                                    _wepy2.default.showModal({
                                        content: "下载需要保存到相册的权限",
                                        // 提示的内容,
                                        showCancel: true,
                                        // 是否显示取消按钮,
                                        cancelText: "取消",
                                        // 取消按钮的文字，默认为取消，最多 4 个字符,
                                        cancelColor: "#000000",
                                        // 取消按钮的文字颜色,
                                        confirmText: "去设置",
                                        // 确定按钮的文字，默认为取消，最多 4 个字符,
                                        confirmColor: "#ffe725",
                                        // 确定按钮的文字颜色,
                                        success: function success(res) {
                                            if (res.confirm) {
                                                _wepy2.default.openSetting();
                                            }
                                        }
                                    });
                                }
                            });
                        } else {
                            wx.showLoading({
                                title: "生成图片中"
                            });
                            _this2.downloadTmpImage();
                        }
                    }
                });
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {
            year: function year() {
                return new Date().getFullYear();
            },
            month: function month() {
                return _date2.default.month[new Date().getMonth()];
            },
            day: function day() {
                var day = new Date().getDate();
                return day < 10 ? "0" + day : day;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Example, [ {
        key: "loadData",
        value: function loadData() {
            var _this3 = this;
            if (!this.loading && this.page < this.totalPages) {
                _wallpaperApi2.default.fetchDaySigns(this.page, this.size).then(function(res) {
                    var _wallpapers;
                    (_wallpapers = _this3.wallpapers).push.apply(_wallpapers, _toConsumableArray(res.imgs));
                    _this3.totalPages = res.totalPages;
                    _this3.page++;
                    _this3.$apply();
                }, function(err) {
                    console.log(err);
                });
            }
        }
    }, {
        key: "downloadTmpImage",
        value: function downloadTmpImage() {
            var _this4 = this;
            wx.downloadFile({
                url: this.wallpapers[this.index].url,
                success: function success(imageTemp) {
                    wx.getImageInfo({
                        src: imageTemp.tempFilePath,
                        success: function success(res) {
                            var imageWidth = res.width;
                            var imageHeight = res.height;
                            // console.log(imageHeight, imageWidth);
                                                        var drawImageHeight = imageWidth * _this4.height / _this4.width;
                            if (imageHeight < drawImageHeight) {
                                var drawImageWidth = imageHeight * _this4.width / _this4.height;
                                _this4.compositeImage(imageTemp.tempFilePath, drawImageWidth, imageHeight);
                            } else {
                                _this4.compositeImage(imageTemp.tempFilePath, imageWidth, drawImageHeight);
                            }
                        }
                    });
                }
            });
        }
    }, {
        key: "compositeImage",
        value: function() {
            var _ref2 = _asyncToGenerator(/* */ regeneratorRuntime.mark(function _callee(path, imageWidth, imageHeight) {
                var ctx, res, that;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            console.log(path);
                            ctx = wx.createCanvasContext("todayImage");
                            ctx.clearRect(0, 0, this.height, this.width);
                            // 画图片作为背景
                                                        ctx.drawImage(path, 0, 0, imageWidth, imageHeight, 0, 0, windowWidth, windowHeight);
                            console.log(imageWidth, imageHeight, this.height, this.width);
                            _context.next = 7;
                            return this.getViewInfo("date-day" + this.index);

                          case 7:
                            res = _context.sent;
                            this.drawText({
                                x: res.left,
                                // y: res.top + 6 * device.pixelRatio / 2,
                                y: res.top,
                                color: "#ffffff",
                                size: 48,
                                align: "left",
                                baseline: "top",
                                text: this.wallpapers[this.index].day,
                                bold: true
                            }, ctx);
                            _context.next = 11;
                            return this.getViewInfo("date-other" + this.index);

                          case 11:
                            res = _context.sent;
                            this.drawText({
                                // x: res.left - 6 * device.pixelRatio / 2,
                                x: this.$parent.globalData.ios ? res.left + 10 : res.left * 1.2,
                                y: res.top,
                                color: "#ffffff",
                                size: 20,
                                align: "left",
                                baseline: "top",
                                text: this.wallpapers[this.index].month + "." + this.wallpapers[this.index].year,
                                bold: true
                            }, ctx);
                            _context.next = 15;
                            return this.getViewInfo("content" + this.index);

                          case 15:
                            res = _context.sent;
                            this.textWrap({
                                x: res.left,
                                y: res.top,
                                color: "#f2f2f2",
                                size: 15,
                                align: "left",
                                baseline: "top",
                                text: this.wallpapers[this.index].content,
                                bold: false,
                                height: 22,
                                width: windowWidth - res.left * 2,
                                line: 50
                            }, ctx);
                            _context.next = 19;
                            return this.getViewInfo("author" + this.index);

                          case 19:
                            res = _context.sent;
                            this.drawText({
                                x: res.left,
                                y: res.top,
                                color: "#f2f2f2",
                                size: 14,
                                align: "left",
                                baseline: "top",
                                text: "" + this.wallpapers[this.index].author,
                                bold: false
                            }, ctx);
                            that = this;
                            ctx.draw(false, function() {
                                wx.canvasToTempFilePath({
                                    canvasId: "todayImage",
                                    x: 0,
                                    y: 0,
                                    width: windowWidth,
                                    height: windowHeight,
                                    destWidth: imageWidth > windowWidth ? imageWidth : windowWidth,
                                    destHeight: imageWidth > windowWidth ? imageHeight : windowHeight,
                                    fileType: "jpg",
                                    quality: 1,
                                    success: function success(res) {
                                        wx.hideLoading();
                                        // wepy.previewImage({
                                        //   urls: [res.tempFilePath],
                                        // });
                                                                                _wepy2.default.saveImageToPhotosAlbum({
                                            filePath: res.tempFilePath,
                                            // 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径,
                                            success: function success(res) {
                                                that.hidden = true;
                                                that.$apply();
                                            }
                                        });
                                    },
                                    err: function err(res) {
                                        console.log(res);
                                    }
                                });
                            });

                          case 23:
                          case "end":
                            return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
            function compositeImage(_x, _x2, _x3) {
                return _ref2.apply(this, arguments);
            }
            return compositeImage;
        }()
    }, {
        key: "getViewInfo",
        value: function getViewInfo(id) {
            return new Promise(function(resolve, reject) {
                var query = wx.createSelectorQuery();
                query.select("#" + id).boundingClientRect();
                query.exec(function(res) {
                    console.log(res);
                    resolve(res[0]);
                });
            });
        }
    }, {
        key: "drawText",
        /**
     * 渲染文字
     *
     * @param {Object} obj
     */
        value: function drawText(obj, ctx) {
            ctx.save();
            ctx.setFillStyle(obj.color);
            ctx.setTextAlign(obj.align);
            ctx.setTextBaseline(obj.baseline);
            if (obj.bold) {
                ctx.font = "normal bold " + obj.size + "px DINCond";
            } else {
                ctx.font = "normal normal " + obj.size + "px sans-serif";
            }
            ctx.setFontSize(obj.size);
            // console.log(obj.y);
                        ctx.fillText(obj.text, obj.x, obj.y);
            ctx.restore();
        }
    }, {
        key: "textWrap",
        value: function textWrap(obj, ctx) {
            var iswrapStr = obj.text.indexOf("\n");
            if (iswrapStr === -1) {
                this.longTextWrap(obj, ctx);
            } else {
                var contents = obj.text.split("\n");
                for (var i = 0; i < contents.length; i++) {
                    var txt = {
                        x: obj.x,
                        y: obj.y + i * obj.height,
                        color: obj.color,
                        size: obj.size,
                        align: obj.align,
                        baseline: obj.baseline,
                        text: contents[i],
                        bold: obj.bold
                    };
                    this.drawText(txt, ctx);
                }
            }
        }
    }, {
        key: "longTextWrap",
        value: function longTextWrap(obj, ctx) {
            var td = Math.ceil(obj.width / obj.size);
            var tr = Math.ceil(obj.text.length / td);
            for (var i = 0; i < tr; i++) {
                var txt = {
                    x: obj.x,
                    y: obj.y + i * obj.height,
                    color: obj.color,
                    size: obj.size,
                    align: obj.align,
                    baseline: obj.baseline,
                    text: obj.text.substring(i * td, (i + 1) * td),
                    bold: obj.bold
                };
                if (i < obj.line) {
                    if (i === obj.line - 1) {
                        txt.text = txt.text.substring(0, txt.text.length - 3) + "......";
                    }
                    this.drawText(txt, ctx);
                }
            }
        }
    }, {
        key: "onLoad",
        value: function onLoad(options, data) {
            this.wallpapers = data.preload.sign;
            this.statusHeight = this.$parent.globalData.navHeight;
            if (this.wallpapers.length === this.size) {
                this.totalPages = 2;
            }
        }
    }, {
        key: "onReady",
        value: function onReady() {}
    } ]);
    return Example;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Example, "pages/sign/sign"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZ24uanMiXSwibmFtZXMiOlsiZGV2aWNlIiwid3giLCJnZXRTeXN0ZW1JbmZvU3luYyIsIndpbmRvd1dpZHRoIiwid2luZG93SGVpZ2h0IiwiRXhhbXBsZSIsImNvbmZpZyIsImRpc2FibGVTY3JvbGwiLCJkYXRhIiwid2lkdGgiLCJoZWlnaHQiLCJoaWRkZW4iLCJzdGF0dXNIZWlnaHQiLCJpbmRleCIsIndhbGxwYXBlcnMiLCJwYWdlIiwic2l6ZSIsInRvdGFsUGFnZXMiLCJsb2FkaW5nIiwiY29tcG9uZW50cyIsIm1peGlucyIsIkJhY2tNaXhpbiIsIm1ldGhvZHMiLCJjaGFuZ2UiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsInBhcnNlSW50IiwibGVuZ3RoIiwibG9hZERhdGEiLCJzYXZlSW1hZ2UiLCJnZXRTZXR0aW5nIiwic3VjY2VzcyIsInJlcyIsImF1dGhTZXR0aW5nIiwiYXV0aG9yaXplIiwic2NvcGUiLCJzaG93TG9hZGluZyIsInRpdGxlIiwiZG93bmxvYWRUbXBJbWFnZSIsImZhaWwiLCJ3ZXB5Iiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJjYW5jZWxUZXh0IiwiY2FuY2VsQ29sb3IiLCJjb25maXJtVGV4dCIsImNvbmZpcm1Db2xvciIsImNvbmZpcm0iLCJvcGVuU2V0dGluZyIsImV2ZW50cyIsIndhdGNoIiwiY29tcHV0ZWQiLCJ5ZWFyIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJkYXRlVXRpbCIsImdldE1vbnRoIiwiZGF5IiwiZ2V0RGF0ZSIsImFwaSIsImZldGNoRGF5U2lnbnMiLCJ0aGVuIiwicHVzaCIsImltZ3MiLCIkYXBwbHkiLCJjb25zb2xlIiwibG9nIiwiZXJyIiwiZG93bmxvYWRGaWxlIiwidXJsIiwiaW1hZ2VUZW1wIiwiZ2V0SW1hZ2VJbmZvIiwic3JjIiwidGVtcEZpbGVQYXRoIiwiaW1hZ2VXaWR0aCIsImltYWdlSGVpZ2h0IiwiZHJhd0ltYWdlSGVpZ2h0IiwiZHJhd0ltYWdlV2lkdGgiLCJjb21wb3NpdGVJbWFnZSIsInBhdGgiLCJjdHgiLCJjcmVhdGVDYW52YXNDb250ZXh0IiwiY2xlYXJSZWN0IiwiZHJhd0ltYWdlIiwiZ2V0Vmlld0luZm8iLCJkcmF3VGV4dCIsIngiLCJsZWZ0IiwieSIsInRvcCIsImNvbG9yIiwiYWxpZ24iLCJiYXNlbGluZSIsInRleHQiLCJib2xkIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJpb3MiLCJ0ZXh0V3JhcCIsImxpbmUiLCJhdXRob3IiLCJ0aGF0IiwiZHJhdyIsImNhbnZhc1RvVGVtcEZpbGVQYXRoIiwiY2FudmFzSWQiLCJkZXN0V2lkdGgiLCJkZXN0SGVpZ2h0IiwiZmlsZVR5cGUiLCJxdWFsaXR5IiwiaGlkZUxvYWRpbmciLCJzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtIiwiZmlsZVBhdGgiLCJpZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicXVlcnkiLCJjcmVhdGVTZWxlY3RvclF1ZXJ5Iiwic2VsZWN0IiwiYm91bmRpbmdDbGllbnRSZWN0IiwiZXhlYyIsIm9iaiIsInNhdmUiLCJzZXRGaWxsU3R5bGUiLCJzZXRUZXh0QWxpZ24iLCJzZXRUZXh0QmFzZWxpbmUiLCJmb250Iiwic2V0Rm9udFNpemUiLCJmaWxsVGV4dCIsInJlc3RvcmUiLCJpc3dyYXBTdHIiLCJpbmRleE9mIiwibG9uZ1RleHRXcmFwIiwiY29udGVudHMiLCJzcGxpdCIsImkiLCJ0eHQiLCJ0ZCIsIk1hdGgiLCJjZWlsIiwidHIiLCJzdWJzdHJpbmciLCJvcHRpb25zIiwicHJlbG9hZCIsInNpZ24iLCJuYXZIZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTUEsU0FBU0MsR0FBR0MsaUJBQUgsRUFBZjtBQUNBLElBQU1DLGNBQWNILE9BQU9HLFdBQTNCO0FBQ0EsSUFBTUMsZUFBZUosT0FBT0ksWUFBNUI7O0lBQ3FCQyxPOzs7Ozs7Ozs7Ozs7Ozt3TEFD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SSxLQUFLdEksVUFBTCxDQUFnQmMsTUFBaEIsS0FBMkIsS0FBS1osSUFBcEMsRUFBMEM7QUFDeEMsYUFBS0MsVUFBTCxHQUFrQixDQUFsQjtBQUNEO0FBQ0Y7Ozs4QkFDUyxDQUNUOzs7O0VBeFJrQ3dCLGVBQUsxQixJOztrQkFBckJWLE8iLCJmaWxlIjoic2lnbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgQmFja01peGluIGZyb20gJy4uLy4uL21peGlucy9iYWNrJztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL3dhbGxwYXBlci1hcGknO1xuaW1wb3J0IGRhdGVVdGlsIGZyb20gJy4uLy4uL3V0aWxzL2RhdGUnO1xuY29uc3QgZGV2aWNlID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbmNvbnN0IHdpbmRvd1dpZHRoID0gZGV2aWNlLndpbmRvd1dpZHRoO1xuY29uc3Qgd2luZG93SGVpZ2h0ID0gZGV2aWNlLndpbmRvd0hlaWdodDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4YW1wbGUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgZGlzYWJsZVNjcm9sbDogdHJ1ZVxuICB9O1xuICBkYXRhID0ge1xuICAgIHdpZHRoOiB3aW5kb3dXaWR0aCxcbiAgICBoZWlnaHQ6IHdpbmRvd0hlaWdodCxcbiAgICBoaWRkZW46IGZhbHNlLFxuICAgIHN0YXR1c0hlaWdodDogMjIsXG4gICAgaW5kZXg6IDAsXG4gICAgd2FsbHBhcGVyczogW10sXG4gICAgcGFnZTogMSxcbiAgICBzaXplOiAxMCxcbiAgICB0b3RhbFBhZ2VzOiAxLFxuICAgIGxvYWRpbmc6IGZhbHNlXG4gIH07XG4gIGNvbXBvbmVudHMgPSB7fTtcblxuICBtaXhpbnMgPSBbQmFja01peGluXTtcbiAgbWV0aG9kcyA9IHtcbiAgICBjaGFuZ2UoZSkge1xuICAgICAgdGhpcy5pbmRleCA9IGUuZGV0YWlsLmN1cnJlbnQ7XG4gICAgICBpZiAocGFyc2VJbnQodGhpcy5pbmRleCkgPT09IHRoaXMud2FsbHBhcGVycy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNhdmVJbWFnZSgpIHtcbiAgICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgaWYgKCFyZXMuYXV0aFNldHRpbmdbJ3Njb3BlLndyaXRlUGhvdG9zQWxidW0nXSkge1xuICAgICAgICAgICAgd3guYXV0aG9yaXplKHtcbiAgICAgICAgICAgICAgc2NvcGU6ICdzY29wZS53cml0ZVBob3Rvc0FsYnVtJyxcbiAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAn55Sf5oiQ5Zu+54mH5LitJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZG93bmxvYWRUbXBJbWFnZSgpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBmYWlsOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgICAgY29udGVudDogJ+S4i+i9vemcgOimgeS/neWtmOWIsOebuOWGjOeahOadg+mZkCcsIC8vIOaPkOekuueahOWGheWuuSxcbiAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IHRydWUsIC8vIOaYr+WQpuaYvuekuuWPlua2iOaMiemSrixcbiAgICAgICAgICAgICAgICAgIGNhbmNlbFRleHQ6ICflj5bmtognLCAvLyDlj5bmtojmjInpkq7nmoTmloflrZfvvIzpu5jorqTkuLrlj5bmtojvvIzmnIDlpJogNCDkuKrlrZfnrKYsXG4gICAgICAgICAgICAgICAgICBjYW5jZWxDb2xvcjogJyMwMDAwMDAnLCAvLyDlj5bmtojmjInpkq7nmoTmloflrZfpopzoibIsXG4gICAgICAgICAgICAgICAgICBjb25maXJtVGV4dDogJ+WOu+iuvue9ricsIC8vIOehruWumuaMiemSrueahOaWh+Wtl++8jOm7mOiupOS4uuWPlua2iO+8jOacgOWkmiA0IOS4quWtl+espixcbiAgICAgICAgICAgICAgICAgIGNvbmZpcm1Db2xvcjogJyNmZmU3MjUnLCAvLyDnoa7lrprmjInpkq7nmoTmloflrZfpopzoibIsXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgICAgICAgICB3ZXB5Lm9wZW5TZXR0aW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfnlJ/miJDlm77niYfkuK0nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZG93bmxvYWRUbXBJbWFnZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBsb2FkRGF0YSgpIHtcbiAgICBpZiAoIXRoaXMubG9hZGluZyAmJiB0aGlzLnBhZ2UgPCB0aGlzLnRvdGFsUGFnZXMpIHtcbiAgICAgIGFwaS5mZXRjaERheVNpZ25zKHRoaXMucGFnZSwgdGhpcy5zaXplKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMud2FsbHBhcGVycy5wdXNoKC4uLnJlcy5pbWdzKTtcbiAgICAgICAgdGhpcy50b3RhbFBhZ2VzID0gcmVzLnRvdGFsUGFnZXM7XG4gICAgICAgIHRoaXMucGFnZSsrO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBkb3dubG9hZFRtcEltYWdlKCkge1xuICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICB1cmw6IHRoaXMud2FsbHBhcGVyc1t0aGlzLmluZGV4XS51cmwsXG4gICAgICBzdWNjZXNzOiAoaW1hZ2VUZW1wKSA9PiB7XG4gICAgICAgIHd4LmdldEltYWdlSW5mbyh7XG4gICAgICAgICAgc3JjOiBpbWFnZVRlbXAudGVtcEZpbGVQYXRoLFxuICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgIGxldCBpbWFnZVdpZHRoID0gcmVzLndpZHRoO1xuICAgICAgICAgICAgbGV0IGltYWdlSGVpZ2h0ID0gcmVzLmhlaWdodDtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGltYWdlSGVpZ2h0LCBpbWFnZVdpZHRoKTtcbiAgICAgICAgICAgIGxldCBkcmF3SW1hZ2VIZWlnaHQgPSAoaW1hZ2VXaWR0aCAqIHRoaXMuaGVpZ2h0KSAvIHRoaXMud2lkdGg7XG4gICAgICAgICAgICBpZiAoaW1hZ2VIZWlnaHQgPCBkcmF3SW1hZ2VIZWlnaHQpIHtcbiAgICAgICAgICAgICAgbGV0IGRyYXdJbWFnZVdpZHRoID0gKGltYWdlSGVpZ2h0ICogdGhpcy53aWR0aCkgLyB0aGlzLmhlaWdodDtcbiAgICAgICAgICAgICAgdGhpcy5jb21wb3NpdGVJbWFnZShpbWFnZVRlbXAudGVtcEZpbGVQYXRoLCBkcmF3SW1hZ2VXaWR0aCwgaW1hZ2VIZWlnaHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5jb21wb3NpdGVJbWFnZShpbWFnZVRlbXAudGVtcEZpbGVQYXRoLCBpbWFnZVdpZHRoLCBkcmF3SW1hZ2VIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgYXN5bmMgY29tcG9zaXRlSW1hZ2UocGF0aCwgaW1hZ2VXaWR0aCwgaW1hZ2VIZWlnaHQpIHtcbiAgICBjb25zb2xlLmxvZyhwYXRoKTtcbiAgICBjb25zdCBjdHggPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KCd0b2RheUltYWdlJyk7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmhlaWdodCwgdGhpcy53aWR0aCk7XG4gICAgLy8g55S75Zu+54mH5L2c5Li66IOM5pmvXG4gICAgY3R4LmRyYXdJbWFnZShwYXRoLCAwLCAwLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgMCwgMCwgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XG4gICAgY29uc29sZS5sb2coaW1hZ2VXaWR0aCwgaW1hZ2VIZWlnaHQsIHRoaXMuaGVpZ2h0LCB0aGlzLndpZHRoKTtcbiAgICBsZXQgcmVzID0gYXdhaXQgdGhpcy5nZXRWaWV3SW5mbyhgZGF0ZS1kYXkke3RoaXMuaW5kZXh9YCk7XG4gICAgdGhpcy5kcmF3VGV4dCh7XG4gICAgICB4OiByZXMubGVmdCxcbiAgICAgIC8vIHk6IHJlcy50b3AgKyA2ICogZGV2aWNlLnBpeGVsUmF0aW8gLyAyLFxuICAgICAgeTogcmVzLnRvcCxcbiAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICBzaXplOiA0OCxcbiAgICAgIGFsaWduOiAnbGVmdCcsXG4gICAgICBiYXNlbGluZTogJ3RvcCcsXG4gICAgICB0ZXh0OiB0aGlzLndhbGxwYXBlcnNbdGhpcy5pbmRleF0uZGF5LFxuICAgICAgYm9sZDogdHJ1ZVxuICAgIH0sIGN0eCk7XG4gICAgcmVzID0gYXdhaXQgdGhpcy5nZXRWaWV3SW5mbyhgZGF0ZS1vdGhlciR7dGhpcy5pbmRleH1gKTtcbiAgICB0aGlzLmRyYXdUZXh0KHtcbiAgICAgIC8vIHg6IHJlcy5sZWZ0IC0gNiAqIGRldmljZS5waXhlbFJhdGlvIC8gMixcbiAgICAgIHg6IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmlvcyA/IChyZXMubGVmdCArIDEwKSA6IHJlcy5sZWZ0ICogMS4yLFxuICAgICAgeTogcmVzLnRvcCxcbiAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICBzaXplOiAyMCxcbiAgICAgIGFsaWduOiAnbGVmdCcsXG4gICAgICBiYXNlbGluZTogJ3RvcCcsXG4gICAgICB0ZXh0OiBgJHt0aGlzLndhbGxwYXBlcnNbdGhpcy5pbmRleF0ubW9udGh9LiR7dGhpcy53YWxscGFwZXJzW3RoaXMuaW5kZXhdLnllYXJ9YCxcbiAgICAgIGJvbGQ6IHRydWVcbiAgICB9LCBjdHgpO1xuICAgIHJlcyA9IGF3YWl0IHRoaXMuZ2V0Vmlld0luZm8oYGNvbnRlbnQke3RoaXMuaW5kZXh9YCk7XG4gICAgdGhpcy50ZXh0V3JhcCh7XG4gICAgICB4OiByZXMubGVmdCxcbiAgICAgIHk6IHJlcy50b3AsXG4gICAgICBjb2xvcjogJyNmMmYyZjInLFxuICAgICAgc2l6ZTogMTUsXG4gICAgICBhbGlnbjogJ2xlZnQnLFxuICAgICAgYmFzZWxpbmU6ICd0b3AnLFxuICAgICAgdGV4dDogdGhpcy53YWxscGFwZXJzW3RoaXMuaW5kZXhdLmNvbnRlbnQsXG4gICAgICBib2xkOiBmYWxzZSxcbiAgICAgIGhlaWdodDogMjIsXG4gICAgICB3aWR0aDogd2luZG93V2lkdGggLSByZXMubGVmdCAqIDIsXG4gICAgICBsaW5lOiA1MFxuICAgIH0sIGN0eCk7XG4gICAgcmVzID0gYXdhaXQgdGhpcy5nZXRWaWV3SW5mbyhgYXV0aG9yJHt0aGlzLmluZGV4fWApO1xuICAgIHRoaXMuZHJhd1RleHQoe1xuICAgICAgeDogcmVzLmxlZnQsXG4gICAgICB5OiByZXMudG9wLFxuICAgICAgY29sb3I6ICcjZjJmMmYyJyxcbiAgICAgIHNpemU6IDE0LFxuICAgICAgYWxpZ246ICdsZWZ0JyxcbiAgICAgIGJhc2VsaW5lOiAndG9wJyxcbiAgICAgIHRleHQ6IGAke3RoaXMud2FsbHBhcGVyc1t0aGlzLmluZGV4XS5hdXRob3J9YCxcbiAgICAgIGJvbGQ6IGZhbHNlXG4gICAgfSwgY3R4KTtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgY3R4LmRyYXcoZmFsc2UsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHd4LmNhbnZhc1RvVGVtcEZpbGVQYXRoKHtcbiAgICAgICAgY2FudmFzSWQ6ICd0b2RheUltYWdlJyxcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogMCxcbiAgICAgICAgd2lkdGg6IHdpbmRvd1dpZHRoLFxuICAgICAgICBoZWlnaHQ6IHdpbmRvd0hlaWdodCxcbiAgICAgICAgZGVzdFdpZHRoOiBpbWFnZVdpZHRoID4gd2luZG93V2lkdGggPyBpbWFnZVdpZHRoIDogd2luZG93V2lkdGgsXG4gICAgICAgIGRlc3RIZWlnaHQ6IGltYWdlV2lkdGggPiB3aW5kb3dXaWR0aCA/IGltYWdlSGVpZ2h0IDogd2luZG93SGVpZ2h0LFxuICAgICAgICBmaWxlVHlwZTogJ2pwZycsXG4gICAgICAgIHF1YWxpdHk6IDEuMCxcbiAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIC8vIHdlcHkucHJldmlld0ltYWdlKHtcbiAgICAgICAgICAvLyAgIHVybHM6IFtyZXMudGVtcEZpbGVQYXRoXSxcbiAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICB3ZXB5LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xuICAgICAgICAgICAgZmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGgsIC8vIOWbvueJh+aWh+S7tui3r+W+hO+8jOWPr+S7peaYr+S4tOaXtuaWh+S7tui3r+W+hOS5n+WPr+S7peaYr+awuOS5heaWh+S7tui3r+W+hO+8jOS4jeaUr+aMgee9kee7nOWbvueJh+i3r+W+hCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgIHRoYXQuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyKHJlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICBnZXRWaWV3SW5mbyhpZCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBjb25zdCBxdWVyeSA9IHd4LmNyZWF0ZVNlbGVjdG9yUXVlcnkoKTtcbiAgICAgIHF1ZXJ5LnNlbGVjdChgIyR7aWR9YCkuYm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBxdWVyeS5leGVjKHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIHJlc29sdmUocmVzWzBdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICAvKipcbiAgICog5riy5p+T5paH5a2XXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAgICovXG4gIGRyYXdUZXh0KG9iaiwgY3R4KSB7XG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguc2V0RmlsbFN0eWxlKG9iai5jb2xvcik7XG4gICAgY3R4LnNldFRleHRBbGlnbihvYmouYWxpZ24pO1xuICAgIGN0eC5zZXRUZXh0QmFzZWxpbmUob2JqLmJhc2VsaW5lKTtcbiAgICBpZiAob2JqLmJvbGQpIHtcbiAgICAgIGN0eC5mb250ID0gYG5vcm1hbCBib2xkICR7b2JqLnNpemV9cHggRElOQ29uZGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5mb250ID0gYG5vcm1hbCBub3JtYWwgJHtvYmouc2l6ZX1weCBzYW5zLXNlcmlmYDtcbiAgICB9XG4gICAgY3R4LnNldEZvbnRTaXplKG9iai5zaXplKTtcbiAgICAvLyBjb25zb2xlLmxvZyhvYmoueSk7XG4gICAgY3R4LmZpbGxUZXh0KG9iai50ZXh0LCBvYmoueCwgb2JqLnkpO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH07XG4gIHRleHRXcmFwKG9iaiwgY3R4KSB7XG4gICAgbGV0IGlzd3JhcFN0ciA9IG9iai50ZXh0LmluZGV4T2YoJ1xcbicpO1xuICAgIGlmIChpc3dyYXBTdHIgPT09IC0xKSB7XG4gICAgICB0aGlzLmxvbmdUZXh0V3JhcChvYmosIGN0eCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjb250ZW50cyA9IG9iai50ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHR4dCA9IHtcbiAgICAgICAgICB4OiBvYmoueCxcbiAgICAgICAgICB5OiBvYmoueSArIChpICogb2JqLmhlaWdodCksXG4gICAgICAgICAgY29sb3I6IG9iai5jb2xvcixcbiAgICAgICAgICBzaXplOiBvYmouc2l6ZSxcbiAgICAgICAgICBhbGlnbjogb2JqLmFsaWduLFxuICAgICAgICAgIGJhc2VsaW5lOiBvYmouYmFzZWxpbmUsXG4gICAgICAgICAgdGV4dDogY29udGVudHNbaV0sXG4gICAgICAgICAgYm9sZDogb2JqLmJvbGRcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kcmF3VGV4dCh0eHQsIGN0eCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBsb25nVGV4dFdyYXAob2JqLCBjdHgpIHtcbiAgICB2YXIgdGQgPSBNYXRoLmNlaWwob2JqLndpZHRoIC8gKG9iai5zaXplKSk7XG4gICAgdmFyIHRyID0gTWF0aC5jZWlsKG9iai50ZXh0Lmxlbmd0aCAvIHRkKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyOyBpKyspIHtcbiAgICAgIHZhciB0eHQgPSB7XG4gICAgICAgIHg6IG9iai54LFxuICAgICAgICB5OiBvYmoueSArIChpICogb2JqLmhlaWdodCksXG4gICAgICAgIGNvbG9yOiBvYmouY29sb3IsXG4gICAgICAgIHNpemU6IG9iai5zaXplLFxuICAgICAgICBhbGlnbjogb2JqLmFsaWduLFxuICAgICAgICBiYXNlbGluZTogb2JqLmJhc2VsaW5lLFxuICAgICAgICB0ZXh0OiBvYmoudGV4dC5zdWJzdHJpbmcoaSAqIHRkLCAoaSArIDEpICogdGQpLFxuICAgICAgICBib2xkOiBvYmouYm9sZFxuICAgICAgfTtcbiAgICAgIGlmIChpIDwgb2JqLmxpbmUpIHtcbiAgICAgICAgaWYgKGkgPT09IG9iai5saW5lIC0gMSkge1xuICAgICAgICAgIHR4dC50ZXh0ID0gdHh0LnRleHQuc3Vic3RyaW5nKDAsIHR4dC50ZXh0Lmxlbmd0aCAtIDMpICsgJy4uLi4uLic7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kcmF3VGV4dCh0eHQsIGN0eCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGV2ZW50cyA9IHt9O1xuICB3YXRjaCA9IHt9O1xuICBjb21wdXRlZCA9IHtcbiAgICB5ZWFyKCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgICB9LFxuICAgIG1vbnRoKCkge1xuICAgICAgcmV0dXJuIGRhdGVVdGlsLm1vbnRoW25ldyBEYXRlKCkuZ2V0TW9udGgoKV07XG4gICAgfSxcbiAgICBkYXkoKSB7XG4gICAgICBsZXQgZGF5ID0gbmV3IERhdGUoKS5nZXREYXRlKCk7XG4gICAgICByZXR1cm4gZGF5IDwgMTAgPyBgMCR7ZGF5fWAgOiBkYXk7XG4gICAgfVxuICB9O1xuICBvbkxvYWQob3B0aW9ucywgZGF0YSkge1xuICAgIHRoaXMud2FsbHBhcGVycyA9IGRhdGEucHJlbG9hZC5zaWduO1xuICAgIHRoaXMuc3RhdHVzSGVpZ2h0ID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEubmF2SGVpZ2h0O1xuICAgIGlmICh0aGlzLndhbGxwYXBlcnMubGVuZ3RoID09PSB0aGlzLnNpemUpIHtcbiAgICAgIHRoaXMudG90YWxQYWdlcyA9IDI7XG4gICAgfVxuICB9O1xuICBvblJlYWR5KCkge1xuICB9O1xufVxuIl19