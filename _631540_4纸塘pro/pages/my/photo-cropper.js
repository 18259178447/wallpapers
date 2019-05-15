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

var _weCropper = require("./../../npm/we-cropper/dist/we-cropper.js");

var _weCropper2 = _interopRequireDefault(_weCropper);

var _api = require("./../../api/api.js");

var _api2 = _interopRequireDefault(_api);

var _config = require("./../../api/config.js");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
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

var width = device.windowWidth;

var height = device.windowHeight - 50;

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
        _this), _this.config = {}, _this.data = {
            _drawEvent: null,
            id: "cropper",
            user: null,
            loading: false,
            options: {
                width: width,
                height: height,
                scale: 2.5,
                zoom: 8,
                boundStyle: {
                    color: "#ffffff",
                    lineWidth: 3,
                    mask: "rgba(0, 0, 0, 0.6)"
                },
                cut: {
                    x: (width - 300) / 2,
                    y: (height - 300) / 2,
                    width: 300,
                    height: 300
                }
            }
        }, _this.components = {}, _this.methods = {
            ts: function ts(e) {
                this._drawEvent.touchStart(e);
            },
            tm: function tm(e) {
                this._drawEvent.touchMove(e);
            },
            te: function te(e) {
                this._drawEvent.touchEnd(e);
            },
            canvasError: function canvasError(e) {
                console.error(e.detail.errMsg);
            },
            cancel: function cancel() {
                _wepy2.default.navigateBack({
                    delta: 1
                });
            },
            submit: function submit() {
                var _this2 = this;
                if (this.loading) return;
                _wepy2.default.showLoading({
                    title: "设置头像中...",
                    mask: true
                });
                this.loading = true;
                this.getCropperImage(function(src) {
                    if (src) {
                        // 上传
                        _wepy2.default.uploadFile({
                            url: _config.API_HOST + "/api/personal/center/upload/avatar",
                            // 开发者服务器 url
                            header: {
                                token: _wepy2.default.getStorageSync("token")
                            },
                            filePath: src,
                            // 要上传文件资源的路径
                            name: "file",
                            // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
                            success: function success(res) {
                                var result = JSON.parse(res.data);
                                if (result.code === 200 && _this2.loading) {
                                    _api2.default.updateInfo(result.data.url, _this2.user.name).then(function() {
                                        _wepy2.default.hideLoading();
                                        _this2.$parent.updateUserInfo(false);
                                        _wepy2.default.navigateBack({
                                            delta: 1
                                        });
                                    }, function(err) {
                                        _this2.loading = false;
                                        _wepy2.default.hideLoading();
                                        console.log(err);
                                    });
                                } else {
                                    _this2.loading = false;
                                    _wepy2.default.hideLoading();
                                    _wepy2.default.showToast({
                                        title: result.msg,
                                        // 提示的内容,
                                        icon: "none",
                                        // 图标,
                                        duration: 2e3
                                    });
                                }
                                _this2.$apply();
                            }
                        });
                    } else {
                        console.log("获取图片地址失败，请稍后重试");
                    }
                });
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Example, [ {
        key: "pushOrigin",
        value: function pushOrigin(src) {
            this._drawEvent.pushOrign(src);
        }
    }, {
        key: "updateCanvas",
        value: function updateCanvas() {
            this._drawEvent.updateCanvas();
        }
    }, {
        key: "getCropperImage",
        value: function getCropperImage(fn, ev) {
            this._drawEvent.getCropperImage(fn);
        }
    }, {
        key: "getCropperBase64",
        value: function getCropperBase64(fn, ev) {
            this._drawEvent.getCropperImage(fn);
        }
    }, {
        key: "onLoad",
        value: function onLoad(options) {
            var _this3 = this;
            var opt = this.options;
            this._drawEvent = new _weCropper2.default(opt);
            this._drawEvent.on("ready", function() {
                // this.$emit('ready', ...args)
                _this3.pushOrigin(options.url);
            });
            // this._drawEvent.on('beforeImageLoad', (...args) => {
            //   // this.$emit('beforeImageLoad', ...args)
            // })
            // this._drawEvent.on('imageLoad', (...args) => {
            //   // this.$emit('imageLoad', ...args)
            // })
            // this._drawEvent.on('beforeDraw', (...args) => {
            //   // this.$emit('beforeDraw', ...args)
            // })
                        this._drawEvent.updateCanvas();
        }
    }, {
        key: "onShow",
        value: function onShow() {
            var _this4 = this;
            this.$parent.getUserInfo(function(user) {
                _this4.user = user;
                _this4.$apply();
            });
        }
    } ]);
    return Example;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Example, "pages/my/photo-cropper"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBob3RvLWNyb3BwZXIuanMiXSwibmFtZXMiOlsiZGV2aWNlIiwid3giLCJnZXRTeXN0ZW1JbmZvU3luYyIsIndpZHRoIiwid2luZG93V2lkdGgiLCJoZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJFeGFtcGxlIiwiY29uZmlnIiwiZGF0YSIsIl9kcmF3RXZlbnQiLCJpZCIsInVzZXIiLCJsb2FkaW5nIiwib3B0aW9ucyIsInNjYWxlIiwiem9vbSIsImJvdW5kU3R5bGUiLCJjb2xvciIsImxpbmVXaWR0aCIsIm1hc2siLCJjdXQiLCJ4IiwieSIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwidHMiLCJlIiwidG91Y2hTdGFydCIsInRtIiwidG91Y2hNb3ZlIiwidGUiLCJ0b3VjaEVuZCIsImNhbnZhc0Vycm9yIiwiY29uc29sZSIsImVycm9yIiwiZGV0YWlsIiwiZXJyTXNnIiwiY2FuY2VsIiwid2VweSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwic3VibWl0Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsImdldENyb3BwZXJJbWFnZSIsInNyYyIsInVwbG9hZEZpbGUiLCJ1cmwiLCJBUElfSE9TVCIsImhlYWRlciIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJmaWxlUGF0aCIsIm5hbWUiLCJzdWNjZXNzIiwicmVzdWx0IiwiSlNPTiIsInBhcnNlIiwicmVzIiwiY29kZSIsImFwaSIsInVwZGF0ZUluZm8iLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCIkcGFyZW50IiwidXBkYXRlVXNlckluZm8iLCJsb2ciLCJlcnIiLCJzaG93VG9hc3QiLCJtc2ciLCJpY29uIiwiZHVyYXRpb24iLCIkYXBwbHkiLCJldmVudHMiLCJ3YXRjaCIsImNvbXB1dGVkIiwicHVzaE9yaWduIiwidXBkYXRlQ2FudmFzIiwiZm4iLCJldiIsIm9wdCIsIldlQ3JvcHBlciIsIm9uIiwicHVzaE9yaWdpbiIsImdldFVzZXJJbmZvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7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O0FBQ1AsV0FBS2IsT0FBTCxDQUFhb0IsV0FBYixDQUF5QixnQkFBUTtBQUMvQixlQUFLekUsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsZUFBSzZELE1BQUw7QUFDRCxPQUhEO0FBSUQ7Ozs7RUE3SWtDbEMsZUFBSytDLEk7O2tCQUFyQi9FLE8iLCJmaWxlIjoicGhvdG8tY3JvcHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgV2VDcm9wcGVyIGZyb20gJ3dlLWNyb3BwZXInO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcbmNvbnN0IGRldmljZSA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG5jb25zdCB3aWR0aCA9IGRldmljZS53aW5kb3dXaWR0aDtcbmNvbnN0IGhlaWdodCA9IGRldmljZS53aW5kb3dIZWlnaHQgLSA1MDtcbmltcG9ydCB7IEFQSV9IT1NUIH0gZnJvbSAnLi4vLi4vYXBpL2NvbmZpZy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4YW1wbGUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gIH07XG5cbiAgZGF0YSA9IHtcbiAgICBfZHJhd0V2ZW50OiBudWxsLFxuICAgIGlkOiAnY3JvcHBlcicsXG4gICAgdXNlcjogbnVsbCxcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHNjYWxlOiAyLjUsXG4gICAgICB6b29tOiA4LFxuICAgICAgYm91bmRTdHlsZToge1xuICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICBsaW5lV2lkdGg6IDMsXG4gICAgICAgIG1hc2s6ICdyZ2JhKDAsIDAsIDAsIDAuNiknXG4gICAgICB9LFxuICAgICAgY3V0OiB7XG4gICAgICAgIHg6ICh3aWR0aCAtIDMwMCkgLyAyLFxuICAgICAgICB5OiAoaGVpZ2h0IC0gMzAwKSAvIDIsXG4gICAgICAgIHdpZHRoOiAzMDAsXG4gICAgICAgIGhlaWdodDogMzAwXG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbXBvbmVudHMgPSB7fTtcblxuICBtZXRob2RzID0ge1xuICAgIHRzKGUpIHtcbiAgICAgIHRoaXMuX2RyYXdFdmVudC50b3VjaFN0YXJ0KGUpO1xuICAgIH0sXG4gICAgdG0oZSkge1xuICAgICAgdGhpcy5fZHJhd0V2ZW50LnRvdWNoTW92ZShlKTtcbiAgICB9LFxuICAgIHRlKGUpIHtcbiAgICAgIHRoaXMuX2RyYXdFdmVudC50b3VjaEVuZChlKTtcbiAgICB9LFxuICAgIGNhbnZhc0Vycm9yKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZS5kZXRhaWwuZXJyTXNnKTtcbiAgICB9LFxuICAgIGNhbmNlbCgpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgZGVsdGE6IDFcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgc3VibWl0KCkge1xuICAgICAgaWYgKHRoaXMubG9hZGluZykgcmV0dXJuO1xuICAgICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn6K6+572u5aS05YOP5LitLi4uJyxcbiAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgfSk7XG4gICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5nZXRDcm9wcGVySW1hZ2UoKHNyYykgPT4ge1xuICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgLy8g5LiK5LygXG4gICAgICAgICAgd2VweS51cGxvYWRGaWxlKHtcbiAgICAgICAgICAgIHVybDogYCR7QVBJX0hPU1R9L2FwaS9wZXJzb25hbC9jZW50ZXIvdXBsb2FkL2F2YXRhcmAsIC8vIOW8gOWPkeiAheacjeWKoeWZqCB1cmxcbiAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICB0b2tlbjogd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbGVQYXRoOiBzcmMsIC8vIOimgeS4iuS8oOaWh+S7tui1hOa6kOeahOi3r+W+hFxuICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLCAvLyDmlofku7blr7nlupTnmoQga2V5ICwg5byA5Y+R6ICF5Zyo5pyN5Yqh5Zmo56uv6YCa6L+H6L+Z5LiqIGtleSDlj6/ku6Xojrflj5bliLDmlofku7bkuozov5vliLblhoXlrrlcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jb2RlID09PSAyMDAgJiYgdGhpcy5sb2FkaW5nKSB7XG4gICAgICAgICAgICAgICAgYXBpLnVwZGF0ZUluZm8ocmVzdWx0LmRhdGEudXJsLCB0aGlzLnVzZXIubmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLiRwYXJlbnQudXBkYXRlVXNlckluZm8oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgICAgICAgICBkZWx0YTogMSAvLyDov5Tlm57nmoTpobXpnaLmlbDvvIzlpoLmnpwgZGVsdGEg5aSn5LqO546w5pyJ6aG16Z2i5pWw77yM5YiZ6L+U5Zue5Yiw6aaW6aG1LFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKCk7XG4gICAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgdGl0bGU6IHJlc3VsdC5tc2csIC8vIOaPkOekuueahOWGheWuuSxcbiAgICAgICAgICAgICAgICAgIGljb246ICdub25lJywgLy8g5Zu+5qCHLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfojrflj5blm77niYflnLDlnYDlpLHotKXvvIzor7fnqI3lkI7ph43or5UnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHB1c2hPcmlnaW4oc3JjKSB7XG4gICAgdGhpcy5fZHJhd0V2ZW50LnB1c2hPcmlnbihzcmMpO1xuICB9XG4gIHVwZGF0ZUNhbnZhcygpIHtcbiAgICB0aGlzLl9kcmF3RXZlbnQudXBkYXRlQ2FudmFzKCk7XG4gIH1cbiAgZ2V0Q3JvcHBlckltYWdlKGZuLCBldikge1xuICAgIHRoaXMuX2RyYXdFdmVudC5nZXRDcm9wcGVySW1hZ2UoZm4pO1xuICB9XG4gIGdldENyb3BwZXJCYXNlNjQoZm4sIGV2KSB7XG4gICAgdGhpcy5fZHJhd0V2ZW50LmdldENyb3BwZXJJbWFnZShmbik7XG4gIH1cblxuICBldmVudHMgPSB7fTtcblxuICB3YXRjaCA9IHt9O1xuXG4gIGNvbXB1dGVkID0ge307XG5cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICBjb25zdCBvcHQgPSB0aGlzLm9wdGlvbnM7XG4gICAgdGhpcy5fZHJhd0V2ZW50ID0gbmV3IFdlQ3JvcHBlcihvcHQpO1xuICAgIHRoaXMuX2RyYXdFdmVudC5vbigncmVhZHknLCAoLi4uYXJncykgPT4ge1xuICAgICAgLy8gdGhpcy4kZW1pdCgncmVhZHknLCAuLi5hcmdzKVxuICAgICAgdGhpcy5wdXNoT3JpZ2luKG9wdGlvbnMudXJsKTtcbiAgICB9KTtcbiAgICAvLyB0aGlzLl9kcmF3RXZlbnQub24oJ2JlZm9yZUltYWdlTG9hZCcsICguLi5hcmdzKSA9PiB7XG4gICAgLy8gICAvLyB0aGlzLiRlbWl0KCdiZWZvcmVJbWFnZUxvYWQnLCAuLi5hcmdzKVxuICAgIC8vIH0pXG4gICAgLy8gdGhpcy5fZHJhd0V2ZW50Lm9uKCdpbWFnZUxvYWQnLCAoLi4uYXJncykgPT4ge1xuICAgIC8vICAgLy8gdGhpcy4kZW1pdCgnaW1hZ2VMb2FkJywgLi4uYXJncylcbiAgICAvLyB9KVxuICAgIC8vIHRoaXMuX2RyYXdFdmVudC5vbignYmVmb3JlRHJhdycsICguLi5hcmdzKSA9PiB7XG4gICAgLy8gICAvLyB0aGlzLiRlbWl0KCdiZWZvcmVEcmF3JywgLi4uYXJncylcbiAgICAvLyB9KVxuICAgIHRoaXMuX2RyYXdFdmVudC51cGRhdGVDYW52YXMoKTtcbiAgfTtcblxuICBvblNob3coKSB7XG4gICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKHVzZXIgPT4ge1xuICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSk7XG4gIH07XG59XG4iXX0=