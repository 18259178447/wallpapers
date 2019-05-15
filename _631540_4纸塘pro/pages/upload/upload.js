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

var _countdown = require("./../../components/countdown.js");

var _countdown2 = _interopRequireDefault(_countdown);

var _dialog = require("./../../components/dialog.js");

var _dialog2 = _interopRequireDefault(_dialog);

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

var UploadViewPage = function(_wepy$page) {
    _inherits(UploadViewPage, _wepy$page);
    function UploadViewPage() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, UploadViewPage);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UploadViewPage.__proto__ || Object.getPrototypeOf(UploadViewPage)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {
            disableSwipeBack: true
        }, _this.data = {
            process: 0,
            total: 0,
            successNum: 0,
            upState: "",
            tempFiles: []
        }, _this.$repeat = {}, _this.$props = {
            countdown: {
                "xmlns:v-bind": "",
                "v-bind:total.sync": "total",
                type: "num"
            },
            dialog: {
                locked: "true",
                animationMode: "bottom",
                align: "center"
            }
        }, _this.$events = {}, _this.components = {
            countdown: _countdown2.default,
            dialog: _dialog2.default
        }, _this.methods = {
            chooseSource: function chooseSource(owner, event) {
                console.log(event.currentTarget.dataset);
                this.tempFiles[event.currentTarget.dataset.index].owner = owner === "true";
                this.$apply();
            },
            back: function back() {
                _wepy2.default.navigateBack();
                this.$invoke("dialog", "hide");
            },
            input: function input(index, event) {
                console.log(event.detail.value);
                this.tempFiles[index].source = event.detail.value;
            },
            changePic: function changePic(index) {
                var _this2 = this;
                _wepy2.default.chooseImage({
                    count: "1",
                    // 最多可以选择的图片张数,
                    sizeType: [ "original" ],
                    success: function success(res) {
                        var file = res.tempFiles[0];
                        _wepy2.default.getImageInfo({
                            src: file.path,
                            // 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径,
                            success: function success(res) {
                                _this2.tempFiles[index].path = file.path;
                                _this2.tempFiles[index].size = (file.size / 1024 / 1024).toFixed(2);
                                _this2.tempFiles[index].width = res.width;
                                _this2.tempFiles[index].height = res.height;
                                _this2.tempFiles[index].ok = res.width * res.height >= 1920 * 1080;
                                _this2.$apply();
                            }
                        });
                    }
                    // 返回图片的本地文件路径列表 tempFilePaths,
                                });
            },
            delete: function _delete(index) {
                this.tempFiles.splice(index, 1);
                if (this.tempFiles.length <= 0) {
                    _wepy2.default.navigateBack();
                }
            },
            upload: function upload() {
                var _this3 = this;
                this.total = 0;
                this.tempFiles.forEach(function(item) {
                    if (item.ok) {
                        _this3.total++;
                    }
                });
                if (this.total === 0) {
                    // 不能上传
                    _wepy2.default.showToast({
                        title: "至少需要一个可用图片",
                        // 提示的内容,
                        icon: "none",
                        // 图标,
                        duration: 2e3
                    });
                } else {
                    this.process = 0;
                    this.upState = "loading";
                    this.successNum = 0;
                    this.$apply();
                    this.uploadFile(0);
                    this.$invoke("dialog", "show");
                    this.$invoke("countdown", "draw");
                }
            }
        }, _this.computed = {
            marginHeight: function marginHeight() {
                return _this.$parent.globalData.navHeight;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(UploadViewPage, [ {
        key: "uploadFile",
        value: function uploadFile(index) {
            var _this4 = this;
            while (index < this.tempFiles.length && !this.tempFiles[index].ok) {
                index++;
            }
            if (index < this.tempFiles.length) {
                var file = this.tempFiles[index];
                _wepy2.default.uploadFile({
                    url: _config.API_HOST + "/api/submission",
                    // 开发者服务器 url
                    header: {
                        token: _wepy2.default.getStorageSync("token")
                    },
                    filePath: file.path,
                    // 要上传文件资源的路径
                    name: "file",
                    // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
                    formData: {
                        source: file.owner ? "original" : "reprint",
                        sourceRemark: file.source ? file.source : ""
                    },
                    success: function success(res) {
                        var code = JSON.parse(res.data).code;
                        _this4.process++;
                        index++;
                        _this4.$invoke("countdown", "setProcess", _this4.process);
                        _this4.$apply();
                        if (code === 200) {
                            _this4.successNum++;
                        }
                        _this4.uploadFile(index);
                    },
                    fail: function fail(res) {
                        _this4.process++;
                        index++;
                        _this4.$invoke("countdown", "setProcess", _this4.process);
                        _this4.uploadFile(index);
                        _this4.$apply();
                    }
                });
            } else {
                // wepy.navigateBack();
                // this.$invoke('dialog', 'hide');
                // wepy.showToast({
                //   title: `成功投稿${this.successNum}张`, // 提示的内容,
                //   icon: 'none', // 图标,
                //   duration: 3000, // 延迟时间,
                //   mask: false
                // });
                this.upState = "complete";
                this.$apply();
            }
        }
    }, {
        key: "onLoad",
        value: function onLoad(options, data) {
            this.tempFiles = data.preload.tempFiles;
        }
    } ]);
    return UploadViewPage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(UploadViewPage, "pages/upload/upload"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZC5qcyJdLCJuYW1lcyI6WyJVcGxvYWRWaWV3UGFnZSIsImNvbmZpZyIsImRpc2FibGVTd2lwZUJhY2siLCJkYXRhIiwicHJvY2VzcyIsInRvdGFsIiwic3VjY2Vzc051bSIsInVwU3RhdGUiLCJ0ZW1wRmlsZXMiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb3VudGRvd24iLCJkaWFsb2ciLCJtZXRob2RzIiwiY2hvb3NlU291cmNlIiwib3duZXIiLCJldmVudCIsImNvbnNvbGUiLCJsb2ciLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwiJGFwcGx5IiwiYmFjayIsIndlcHkiLCJuYXZpZ2F0ZUJhY2siLCIkaW52b2tlIiwiaW5wdXQiLCJkZXRhaWwiLCJ2YWx1ZSIsInNvdXJjZSIsImNoYW5nZVBpYyIsImNob29zZUltYWdlIiwiY291bnQiLCJzaXplVHlwZSIsInN1Y2Nlc3MiLCJmaWxlIiwicmVzIiwiZ2V0SW1hZ2VJbmZvIiwic3JjIiwicGF0aCIsInNpemUiLCJ0b0ZpeGVkIiwid2lkdGgiLCJoZWlnaHQiLCJvayIsImRlbGV0ZSIsInNwbGljZSIsImxlbmd0aCIsInVwbG9hZCIsImZvckVhY2giLCJpdGVtIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJ1cGxvYWRGaWxlIiwiY29tcHV0ZWQiLCJtYXJnaW5IZWlnaHQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIm5hdkhlaWdodCIsInVybCIsIkFQSV9IT1NUIiwiaGVhZGVyIiwidG9rZW4iLCJnZXRTdG9yYWdlU3luYyIsImZpbGVQYXRoIiwibmFtZSIsImZvcm1EYXRhIiwic291cmNlUmVtYXJrIiwiY29kZSIsIkpTT04iLCJwYXJzZSIsImZhaWwiLCJvcHRpb25zIiwicHJlbG9hZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lB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bSAnd2VweSc7XG5pbXBvcnQgY291bnRkb3duIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY291bnRkb3duJztcbmltcG9ydCBkaWFsb2cgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9kaWFsb2cnO1xuaW1wb3J0IHsgQVBJX0hPU1QgfSBmcm9tICcuLi8uLi9hcGkvY29uZmlnLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkVmlld1BhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgZGlzYWJsZVN3aXBlQmFjazogdHJ1ZVxuICB9O1xuICBkYXRhID0ge1xuICAgIHByb2Nlc3M6IDAsXG4gICAgdG90YWw6IDAsXG4gICAgc3VjY2Vzc051bTogMCxcbiAgICB1cFN0YXRlOiAnJyxcbiAgICB0ZW1wRmlsZXM6IFtdXG4gIH07XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJjb3VudGRvd25cIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnRvdGFsLnN5bmNcIjpcInRvdGFsXCIsXCJ0eXBlXCI6XCJudW1cIn0sXCJkaWFsb2dcIjp7XCJsb2NrZWRcIjpcInRydWVcIixcImFuaW1hdGlvbk1vZGVcIjpcImJvdHRvbVwiLFwiYWxpZ25cIjpcImNlbnRlclwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgY291bnRkb3duLFxuICAgIGRpYWxvZ1xuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGNob29zZVNvdXJjZShvd25lciwgZXZlbnQpIHtcbiAgICAgIGNvbnNvbGUubG9nKGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldCk7XG4gICAgICB0aGlzLnRlbXBGaWxlc1tldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhdLm93bmVyID0gb3duZXIgPT09ICd0cnVlJztcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSxcbiAgICBiYWNrKCkge1xuICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soKTtcbiAgICAgIHRoaXMuJGludm9rZSgnZGlhbG9nJywgJ2hpZGUnKTtcbiAgICB9LFxuICAgIGlucHV0KGluZGV4LCBldmVudCkge1xuICAgICAgY29uc29sZS5sb2coZXZlbnQuZGV0YWlsLnZhbHVlKTtcbiAgICAgIHRoaXMudGVtcEZpbGVzW2luZGV4XS5zb3VyY2UgPSBldmVudC5kZXRhaWwudmFsdWU7XG4gICAgfSxcbiAgICBjaGFuZ2VQaWMoaW5kZXgpIHtcbiAgICAgIHdlcHkuY2hvb3NlSW1hZ2Uoe1xuICAgICAgICBjb3VudDogJzEnLCAvLyDmnIDlpJrlj6/ku6XpgInmi6nnmoTlm77niYflvKDmlbAsXG4gICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJ10sXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgbGV0IGZpbGUgPSByZXMudGVtcEZpbGVzWzBdO1xuICAgICAgICAgIHdlcHkuZ2V0SW1hZ2VJbmZvKHtcbiAgICAgICAgICAgIHNyYzogZmlsZS5wYXRoLCAvLyDlm77niYfnmoTot6/lvoTvvIzlj6/ku6XmmK/nm7jlr7not6/lvoTvvIzkuLTml7bmlofku7bot6/lvoTvvIzlrZjlgqjmlofku7bot6/lvoTvvIznvZHnu5zlm77niYfot6/lvoQsXG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnRlbXBGaWxlc1tpbmRleF0ucGF0aCA9IGZpbGUucGF0aDtcbiAgICAgICAgICAgICAgdGhpcy50ZW1wRmlsZXNbaW5kZXhdLnNpemUgPSAoZmlsZS5zaXplIC8gMTAyNCAvIDEwMjQpLnRvRml4ZWQoMik7XG4gICAgICAgICAgICAgIHRoaXMudGVtcEZpbGVzW2luZGV4XS53aWR0aCA9IHJlcy53aWR0aDtcbiAgICAgICAgICAgICAgdGhpcy50ZW1wRmlsZXNbaW5kZXhdLmhlaWdodCA9IHJlcy5oZWlnaHQ7XG4gICAgICAgICAgICAgIHRoaXMudGVtcEZpbGVzW2luZGV4XS5vayA9IHJlcy53aWR0aCAqIHJlcy5oZWlnaHQgPj0gMTkyMCAqIDEwODA7XG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gLy8g6L+U5Zue5Zu+54mH55qE5pys5Zyw5paH5Lu26Lev5b6E5YiX6KGoIHRlbXBGaWxlUGF0aHMsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGRlbGV0ZShpbmRleCkge1xuICAgICAgdGhpcy50ZW1wRmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGlmICh0aGlzLnRlbXBGaWxlcy5sZW5ndGggPD0gMCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdXBsb2FkKCkge1xuICAgICAgdGhpcy50b3RhbCA9IDA7XG4gICAgICB0aGlzLnRlbXBGaWxlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbS5vaykge1xuICAgICAgICAgIHRoaXMudG90YWwrKztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAodGhpcy50b3RhbCA9PT0gMCkge1xuICAgICAgICAvLyDkuI3og73kuIrkvKBcbiAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn6Iez5bCR6ZyA6KaB5LiA5Liq5Y+v55So5Zu+54mHJywgLy8g5o+Q56S655qE5YaF5a65LFxuICAgICAgICAgIGljb246ICdub25lJywgLy8g5Zu+5qCHLFxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzID0gMDtcbiAgICAgICAgdGhpcy51cFN0YXRlID0gJ2xvYWRpbmcnO1xuICAgICAgICB0aGlzLnN1Y2Nlc3NOdW0gPSAwO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB0aGlzLnVwbG9hZEZpbGUoMCk7XG4gICAgICAgIHRoaXMuJGludm9rZSgnZGlhbG9nJywgJ3Nob3cnKTtcbiAgICAgICAgdGhpcy4kaW52b2tlKCdjb3VudGRvd24nLCAnZHJhdycpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgdXBsb2FkRmlsZShpbmRleCkge1xuICAgIHdoaWxlIChpbmRleCA8IHRoaXMudGVtcEZpbGVzLmxlbmd0aCAmJiAhdGhpcy50ZW1wRmlsZXNbaW5kZXhdLm9rKSB7XG4gICAgICBpbmRleCsrO1xuICAgIH1cbiAgICBpZiAoaW5kZXggPCB0aGlzLnRlbXBGaWxlcy5sZW5ndGgpIHtcbiAgICAgIGxldCBmaWxlID0gdGhpcy50ZW1wRmlsZXNbaW5kZXhdO1xuICAgICAgd2VweS51cGxvYWRGaWxlKHtcbiAgICAgICAgdXJsOiBgJHtBUElfSE9TVH0vYXBpL3N1Ym1pc3Npb25gLCAvLyDlvIDlj5HogIXmnI3liqHlmaggdXJsXG4gICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgIHRva2VuOiB3ZXB5LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICAgIH0sXG4gICAgICAgIGZpbGVQYXRoOiBmaWxlLnBhdGgsIC8vIOimgeS4iuS8oOaWh+S7tui1hOa6kOeahOi3r+W+hFxuICAgICAgICBuYW1lOiAnZmlsZScsIC8vIOaWh+S7tuWvueW6lOeahCBrZXkgLCDlvIDlj5HogIXlnKjmnI3liqHlmajnq6/pgJrov4fov5nkuKoga2V5IOWPr+S7peiOt+WPluWIsOaWh+S7tuS6jOi/m+WItuWGheWuuVxuICAgICAgICBmb3JtRGF0YToge1xuICAgICAgICAgIHNvdXJjZTogZmlsZS5vd25lciA/ICdvcmlnaW5hbCcgOiAncmVwcmludCcsXG4gICAgICAgICAgc291cmNlUmVtYXJrOiBmaWxlLnNvdXJjZSA/IGZpbGUuc291cmNlIDogJydcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBsZXQgY29kZSA9IEpTT04ucGFyc2UocmVzLmRhdGEpLmNvZGU7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzKys7XG4gICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICB0aGlzLiRpbnZva2UoJ2NvdW50ZG93bicsICdzZXRQcm9jZXNzJywgdGhpcy5wcm9jZXNzKTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIGlmIChjb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgIHRoaXMuc3VjY2Vzc051bSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnVwbG9hZEZpbGUoaW5kZXgpO1xuICAgICAgICB9LFxuICAgICAgICBmYWlsOiByZXMgPT4ge1xuICAgICAgICAgIHRoaXMucHJvY2VzcysrO1xuICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgdGhpcy4kaW52b2tlKCdjb3VudGRvd24nLCAnc2V0UHJvY2VzcycsIHRoaXMucHJvY2Vzcyk7XG4gICAgICAgICAgdGhpcy51cGxvYWRGaWxlKGluZGV4KTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gd2VweS5uYXZpZ2F0ZUJhY2soKTtcbiAgICAgIC8vIHRoaXMuJGludm9rZSgnZGlhbG9nJywgJ2hpZGUnKTtcbiAgICAgIC8vIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgIC8vICAgdGl0bGU6IGDmiJDlip/mipXnqL8ke3RoaXMuc3VjY2Vzc051bX3lvKBgLCAvLyDmj5DnpLrnmoTlhoXlrrksXG4gICAgICAvLyAgIGljb246ICdub25lJywgLy8g5Zu+5qCHLFxuICAgICAgLy8gICBkdXJhdGlvbjogMzAwMCwgLy8g5bu26L+f5pe26Ze0LFxuICAgICAgLy8gICBtYXNrOiBmYWxzZVxuICAgICAgLy8gfSk7XG4gICAgICB0aGlzLnVwU3RhdGUgPSAnY29tcGxldGUnO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gIH07XG4gIGNvbXB1dGVkID0ge1xuICAgIG1hcmdpbkhlaWdodDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLm5hdkhlaWdodDtcbiAgICB9XG4gIH07XG5cbiAgb25Mb2FkKG9wdGlvbnMsIGRhdGEpIHtcbiAgICB0aGlzLnRlbXBGaWxlcyA9IGRhdGEucHJlbG9hZC50ZW1wRmlsZXM7XG4gIH1cbn1cbiJdfQ==