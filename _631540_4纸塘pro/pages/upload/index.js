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

var UploadPage = function(_wepy$page) {
    _inherits(UploadPage, _wepy$page);
    function UploadPage() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, UploadPage);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UploadPage.__proto__ || Object.getPrototypeOf(UploadPage)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {}, _this.data = {
            user: null,
            firstIn: true,
            tempFiles: null,
            cancel: false
        }, _this.methods = {
            login: function login() {
                _wepy2.default.navigateTo({
                    url: "/pages/login/login"
                });
            },
            agree: function agree() {
                // this.firstIn = false;
                _wepy2.default.setStorageSync("firstIn", "false");
                this.choosePicture();
            },
            back: function back() {
                _wepy2.default.navigateBack({
                    delta: 1
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(UploadPage, [ {
        key: "choosePicture",
        value: function choosePicture() {
            var _this2 = this;
            _wepy2.default.chooseImage({
                count: "9",
                // 最多可以选择的图片张数,
                sizeType: [ "original" ],
                sourceType: [ "album" ],
                success: function success(res) {
                    _this2.tempFiles = res.tempFiles;
                    _this2.tempFiles.forEach(function(item) {
                        _wepy2.default.getImageInfo({
                            src: item.path,
                            // 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径,
                            success: function success(res) {
                                item.width = res.width;
                                item.height = res.height;
                                item.size = (item.size / 1024 / 1024).toFixed(2);
                                item.owner = false;
                                item.ok = res.width * res.height >= 1920 * 1080;
                                _this2.$apply();
                            }
                        });
                    });
                    _this2.$preload("tempFiles", _this2.tempFiles);
                    _this2.$redirect("/pages/upload/upload");
                },
                // 返回图片的本地文件路径列表 tempFilePaths,
                fail: function fail() {
                    _wepy2.default.navigateBack();
                }
            });
        }
    }, {
        key: "onLoad",
        value: function onLoad() {
            this.firstIn = !wx.getStorageSync("firstIn");
            this.$apply();
        }
    }, {
        key: "onShow",
        value: function onShow() {
            var _this3 = this;
            this.$parent.getUserInfo(function(user) {
                _this3.user = user;
                if (_this3.user && !_this3.firstIn && !_this3.cancel) {
                    _this3.cancel = true;
                    _this3.$nextTick().then(function() {
                        _this3.choosePicture();
                    });
                }
                _this3.$apply();
            });
        }
    } ]);
    return UploadPage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(UploadPage, "pages/upload/index"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlVwbG9hZFBhZ2UiLCJjb25maWciLCJkYXRhIiwidXNlciIsImZpcnN0SW4iLCJ0ZW1wRmlsZXMiLCJjYW5jZWwiLCJtZXRob2RzIiwibG9naW4iLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsImFncmVlIiwic2V0U3RvcmFnZVN5bmMiLCJjaG9vc2VQaWN0dXJlIiwiYmFjayIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJmb3JFYWNoIiwiZ2V0SW1hZ2VJbmZvIiwic3JjIiwiaXRlbSIsInBhdGgiLCJ3aWR0aCIsImhlaWdodCIsInNpemUiLCJ0b0ZpeGVkIiwib3duZXIiLCJvayIsIiRhcHBseSIsIiRwcmVsb2FkIiwiJHJlZGlyZWN0IiwiZmFpbCIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCIkcGFyZW50IiwiZ2V0VXNlckluZm8iLCIkbmV4dFRpY2siLCJ0aGVuIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxNLEdBQVM7QUFDUDtBQURPLEssUUFHVEMsSSxHQUFPO0FBQ0xDLFlBQU0sSUFERDtBQUVMQyxlQUFTLElBRko7QUFHTEMsaUJBQVcsSUFITjtBQUlMQyxjQUFRO0FBSkgsSyxRQU1QQyxPLEdBQVU7QUFDUkMsV0FEUSxtQkFDQTtBQUNOQyx1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQUxPO0FBTVJDLFdBTlEsbUJBTUE7QUFDTjtBQUNBSCx1QkFBS0ksY0FBTCxDQUNFLFNBREYsRUFFRSxPQUZGO0FBSUEsYUFBS0MsYUFBTDtBQUNELE9BYk87QUFjUkMsVUFkUSxrQkFjRDtBQUNMTix1QkFBS08sWUFBTCxDQUFrQjtBQUNoQkMsaUJBQU87QUFEUyxTQUFsQjtBQUdEO0FBbEJPLEs7Ozs7O29DQW9CTTtBQUFBOztBQUNkUixxQkFBS1MsV0FBTCxDQUFpQjtBQUNmQyxlQUFPLEdBRFEsRUFDSDtBQUNaQyxrQkFBVSxDQUFDLFVBQUQsQ0FGSztBQUdmQyxvQkFBWSxDQUFDLE9BQUQsQ0FIRztBQUlmQyxpQkFBUyxzQkFBTztBQUNkLGlCQUFLakIsU0FBTCxHQUFpQmtCLElBQUlsQixTQUFyQjtBQUNBLGlCQUFLQSxTQUFMLENBQWVtQixPQUFmLENBQXVCLGdCQUFRO0FBQzdCZiwyQkFBS2dCLFlBQUwsQ0FBa0I7QUFDaEJDLG1CQUFLQyxLQUFLQyxJQURNLEVBQ0E7QUFDaEJOLHVCQUFTLHNCQUFPO0FBQ2RLLHFCQUFLRSxLQUFMLEdBQWFOLElBQUlNLEtBQWpCO0FBQ0FGLHFCQUFLRyxNQUFMLEdBQWNQLElBQUlPLE1BQWxCO0FBQ0FILHFCQUFLSSxJQUFMLEdBQVksQ0FBQ0osS0FBS0ksSUFBTCxHQUFZLElBQVosR0FBbUIsSUFBcEIsRUFBMEJDLE9BQTFCLENBQWtDLENBQWxDLENBQVo7QUFDQUwscUJBQUtNLEtBQUwsR0FBYSxLQUFiO0FBQ0FOLHFCQUFLTyxFQUFMLEdBQVVYLElBQUlNLEtBQUosR0FBWU4sSUFBSU8sTUFBaEIsSUFBMEIsT0FBTyxJQUEzQztBQUNBLHVCQUFLSyxNQUFMO0FBQ0Q7QUFUZSxhQUFsQjtBQVdELFdBWkQ7QUFhQSxpQkFBS0MsUUFBTCxDQUFjLFdBQWQsRUFBMkIsT0FBSy9CLFNBQWhDO0FBQ0EsaUJBQUtnQyxTQUFMLENBQWUsc0JBQWY7QUFDRCxTQXJCYyxFQXFCWjtBQUNIQyxjQUFNLGdCQUFNO0FBQ1Y3Qix5QkFBS08sWUFBTDtBQUNEO0FBeEJjLE9BQWpCO0FBMEJEOzs7NkJBQ1E7QUFDUCxXQUFLWixPQUFMLEdBQWUsQ0FBQ21DLEdBQUdDLGNBQUgsQ0FBa0IsU0FBbEIsQ0FBaEI7QUFDQSxXQUFLTCxNQUFMO0FBQ0Q7Ozs2QkFDUTtBQUFBOztBQUNQLFdBQUtNLE9BQUwsQ0FBYUMsV0FBYixDQUF5QixnQkFBUTtBQUMvQixlQUFLdkMsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsWUFBSSxPQUFLQSxJQUFMLElBQWEsQ0FBQyxPQUFLQyxPQUFuQixJQUE4QixDQUFDLE9BQUtFLE1BQXhDLEVBQWdEO0FBQzlDLGlCQUFLQSxNQUFMLEdBQWMsSUFBZDtBQUNBLGlCQUFLcUMsU0FBTCxHQUFpQkMsSUFBakIsQ0FBc0IsWUFBTTtBQUMxQixtQkFBSzlCLGFBQUw7QUFDRCxXQUZEO0FBR0Q7QUFDRCxlQUFLcUIsTUFBTDtBQUNELE9BVEQ7QUFVRDs7OztFQXpFcUMxQixlQUFLb0MsSTs7a0JBQXhCN0MsVSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZFBhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgLy8gZGlzYWJsZVN3aXBlQmFjazogdHJ1ZVxuICB9O1xuICBkYXRhID0ge1xuICAgIHVzZXI6IG51bGwsXG4gICAgZmlyc3RJbjogdHJ1ZSxcbiAgICB0ZW1wRmlsZXM6IG51bGwsXG4gICAgY2FuY2VsOiBmYWxzZVxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGxvZ2luKCkge1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnL3BhZ2VzL2xvZ2luL2xvZ2luJ1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBhZ3JlZSgpIHtcbiAgICAgIC8vIHRoaXMuZmlyc3RJbiA9IGZhbHNlO1xuICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyhcbiAgICAgICAgJ2ZpcnN0SW4nLFxuICAgICAgICAnZmFsc2UnXG4gICAgICApO1xuICAgICAgdGhpcy5jaG9vc2VQaWN0dXJlKCk7XG4gICAgfSxcbiAgICBiYWNrKCkge1xuICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICBkZWx0YTogMVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBjaG9vc2VQaWN0dXJlKCkge1xuICAgIHdlcHkuY2hvb3NlSW1hZ2Uoe1xuICAgICAgY291bnQ6ICc5JywgLy8g5pyA5aSa5Y+v5Lul6YCJ5oup55qE5Zu+54mH5byg5pWwLFxuICAgICAgc2l6ZVR5cGU6IFsnb3JpZ2luYWwnXSxcbiAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nXSxcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIHRoaXMudGVtcEZpbGVzID0gcmVzLnRlbXBGaWxlcztcbiAgICAgICAgdGhpcy50ZW1wRmlsZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICB3ZXB5LmdldEltYWdlSW5mbyh7XG4gICAgICAgICAgICBzcmM6IGl0ZW0ucGF0aCwgLy8g5Zu+54mH55qE6Lev5b6E77yM5Y+v5Lul5piv55u45a+56Lev5b6E77yM5Li05pe25paH5Lu26Lev5b6E77yM5a2Y5YKo5paH5Lu26Lev5b6E77yM572R57uc5Zu+54mH6Lev5b6ELFxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgaXRlbS53aWR0aCA9IHJlcy53aWR0aDtcbiAgICAgICAgICAgICAgaXRlbS5oZWlnaHQgPSByZXMuaGVpZ2h0O1xuICAgICAgICAgICAgICBpdGVtLnNpemUgPSAoaXRlbS5zaXplIC8gMTAyNCAvIDEwMjQpLnRvRml4ZWQoMik7XG4gICAgICAgICAgICAgIGl0ZW0ub3duZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgaXRlbS5vayA9IHJlcy53aWR0aCAqIHJlcy5oZWlnaHQgPj0gMTkyMCAqIDEwODA7XG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRwcmVsb2FkKCd0ZW1wRmlsZXMnLCB0aGlzLnRlbXBGaWxlcyk7XG4gICAgICAgIHRoaXMuJHJlZGlyZWN0KCcvcGFnZXMvdXBsb2FkL3VwbG9hZCcpO1xuICAgICAgfSwgLy8g6L+U5Zue5Zu+54mH55qE5pys5Zyw5paH5Lu26Lev5b6E5YiX6KGoIHRlbXBGaWxlUGF0aHMsXG4gICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMuZmlyc3RJbiA9ICF3eC5nZXRTdG9yYWdlU3luYygnZmlyc3RJbicpO1xuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH07XG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8odXNlciA9PiB7XG4gICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgaWYgKHRoaXMudXNlciAmJiAhdGhpcy5maXJzdEluICYmICF0aGlzLmNhbmNlbCkge1xuICAgICAgICB0aGlzLmNhbmNlbCA9IHRydWU7XG4gICAgICAgIHRoaXMuJG5leHRUaWNrKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jaG9vc2VQaWN0dXJlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==