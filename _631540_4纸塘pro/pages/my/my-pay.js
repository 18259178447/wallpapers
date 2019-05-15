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

var _navbar = require("./../../components/navbar.js");

var _navbar2 = _interopRequireDefault(_navbar);

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

var MyScorePage = function(_wepy$page) {
    _inherits(MyScorePage, _wepy$page);
    function MyScorePage() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, MyScorePage);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MyScorePage.__proto__ || Object.getPrototypeOf(MyScorePage)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {}, _this.data = {
            user: null
        }, _this.$repeat = {}, _this.$props = {
            navbar: {
                padding: "true",
                title: "我的打赏码"
            }
        }, _this.$events = {}, _this.components = {
            navbar: _navbar2.default
        }, _this.methods = {
            upload: function upload() {
                var _this2 = this;
                _wepy2.default.chooseImage({
                    count: "1",
                    // 最多可以选择的图片张数,
                    success: function success(res) {
                        _wepy2.default.uploadFile({
                            url: _config.API_HOST + "/api/personal/center/upload/reward/code",
                            // 开发者服务器 url
                            header: {
                                token: _wepy2.default.getStorageSync("token")
                            },
                            filePath: res.tempFilePaths[0],
                            // 要上传文件资源的路径
                            name: "file",
                            // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
                            success: function success(res) {
                                var result = JSON.parse(res.data);
                                if (result.code === 200) {
                                    _this2.fetchUser(true);
                                } else {
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
                    }
                    // 返回图片的本地文件路径列表 tempFilePaths,
                                });
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(MyScorePage, [ {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "fetchUser",
        value: function fetchUser() {
            var _this3 = this;
            var refresh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            this.$parent.getUserInfo(function(user) {
                _this3.user = user;
                _this3.$apply();
            }, refresh);
        }
    }, {
        key: "onShow",
        value: function onShow() {
            this.fetchUser();
        }
    } ]);
    return MyScorePage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(MyScorePage, "pages/my/my-pay"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LXBheS5qcyJdLCJuYW1lcyI6WyJNeVNjb3JlUGFnZSIsImNvbmZpZyIsImRhdGEiLCJ1c2VyIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibmF2YmFyIiwibWV0aG9kcyIsInVwbG9hZCIsIndlcHkiLCJjaG9vc2VJbWFnZSIsImNvdW50Iiwic3VjY2VzcyIsInVwbG9hZEZpbGUiLCJ1cmwiLCJBUElfSE9TVCIsImhlYWRlciIsInRva2VuIiwiZ2V0U3RvcmFnZVN5bmMiLCJmaWxlUGF0aCIsInJlcyIsInRlbXBGaWxlUGF0aHMiLCJuYW1lIiwicmVzdWx0IiwiSlNPTiIsInBhcnNlIiwiY29kZSIsImZldGNoVXNlciIsInNob3dUb2FzdCIsInRpdGxlIiwibXNnIiwiaWNvbiIsImR1cmF0aW9uIiwiJGFwcGx5IiwiZXZlbnRzIiwid2F0Y2giLCJjb21wdXRlZCIsInJlZnJlc2giLCIkcGFyZW50IiwiZ2V0VXNlckluZm8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsTSxHQUFTLEUsUUFDVEMsSSxHQUFPO0FBQ0xDLFlBQU07QUFERCxLLFFBR1JDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxXQUFVLE1BQVgsRUFBa0IsU0FBUSxPQUExQixFQUFWLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDO0FBRFUsSyxRQUdaQyxPLEdBQVU7QUFDUkMsWUFEUSxvQkFDQztBQUFBOztBQUNQQyx1QkFBS0MsV0FBTCxDQUFpQjtBQUNmQyxpQkFBTyxHQURRLEVBQ0g7QUFDWkMsbUJBQVMsc0JBQU87QUFDZEgsMkJBQUtJLFVBQUwsQ0FBZ0I7QUFDZEMsbUJBQVFDLGdCQUFSLDRDQURjLEVBQzZDO0FBQzNEQyxzQkFBUTtBQUNOQyx1QkFBT1IsZUFBS1MsY0FBTCxDQUFvQixPQUFwQjtBQURELGVBRk07QUFLZEMsd0JBQVVDLElBQUlDLGFBQUosQ0FBa0IsQ0FBbEIsQ0FMSSxFQUtrQjtBQUNoQ0Msb0JBQU0sTUFOUSxFQU1BO0FBQ2RWLHVCQUFTLHNCQUFPO0FBQ2Qsb0JBQUlXLFNBQVNDLEtBQUtDLEtBQUwsQ0FBV0wsSUFBSXBCLElBQWYsQ0FBYjtBQUNBLG9CQUFJdUIsT0FBT0csSUFBUCxLQUFnQixHQUFwQixFQUF5QjtBQUN2Qix5QkFBS0MsU0FBTCxDQUFlLElBQWY7QUFDRCxpQkFGRCxNQUVPO0FBQ0xsQixpQ0FBS21CLFNBQUwsQ0FBZTtBQUNiQywyQkFBT04sT0FBT08sR0FERCxFQUNNO0FBQ25CQywwQkFBTSxNQUZPLEVBRUM7QUFDZEMsOEJBQVU7QUFIRyxtQkFBZjtBQUtEO0FBQ0QsdUJBQUtDLE1BQUw7QUFDRDtBQW5CYSxhQUFoQjtBQXFCRCxXQXhCYyxDQXdCYjtBQXhCYSxTQUFqQjtBQTBCRDtBQTVCTyxLLFFBOEJWQyxNLEdBQVMsRSxRQUNUQyxLLEdBQVEsRSxRQUNSQyxRLEdBQVcsRTs7Ozs7NkJBQ0YsQ0FBRzs7O2dDQUVlO0FBQUE7O0FBQUEsVUFBakJDLE9BQWlCLHVFQUFQLEtBQU87O0FBQ3pCLFdBQUtDLE9BQUwsQ0FBYUMsV0FBYixDQUF5QixnQkFBUTtBQUMvQixlQUFLdEMsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsZUFBS2dDLE1BQUw7QUFDRCxPQUhELEVBR0dJLE9BSEg7QUFJRDs7OzZCQUNRO0FBQ1AsV0FBS1YsU0FBTDtBQUNEOzs7O0VBdERzQ2xCLGVBQUsrQixJOztrQkFBekIxQyxXIiwiZmlsZSI6Im15LXBheS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgbmF2YmFyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbmF2YmFyJztcbmltcG9ydCB7IEFQSV9IT1NUIH0gZnJvbSAnLi4vLi4vYXBpL2NvbmZpZy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15U2NvcmVQYWdlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge307XG4gIGRhdGEgPSB7XG4gICAgdXNlcjogbnVsbFxuICB9O1xuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wibmF2YmFyXCI6e1wicGFkZGluZ1wiOlwidHJ1ZVwiLFwidGl0bGVcIjpcIuaIkeeahOaJk+i1j+eggVwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgbmF2YmFyXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgdXBsb2FkKCkge1xuICAgICAgd2VweS5jaG9vc2VJbWFnZSh7XG4gICAgICAgIGNvdW50OiAnMScsIC8vIOacgOWkmuWPr+S7pemAieaLqeeahOWbvueJh+W8oOaVsCxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICB3ZXB5LnVwbG9hZEZpbGUoe1xuICAgICAgICAgICAgdXJsOiBgJHtBUElfSE9TVH0vYXBpL3BlcnNvbmFsL2NlbnRlci91cGxvYWQvcmV3YXJkL2NvZGVgLCAvLyDlvIDlj5HogIXmnI3liqHlmaggdXJsXG4gICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgdG9rZW46IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaWxlUGF0aDogcmVzLnRlbXBGaWxlUGF0aHNbMF0sIC8vIOimgeS4iuS8oOaWh+S7tui1hOa6kOeahOi3r+W+hFxuICAgICAgICAgICAgbmFtZTogJ2ZpbGUnLCAvLyDmlofku7blr7nlupTnmoQga2V5ICwg5byA5Y+R6ICF5Zyo5pyN5Yqh5Zmo56uv6YCa6L+H6L+Z5LiqIGtleSDlj6/ku6Xojrflj5bliLDmlofku7bkuozov5vliLblhoXlrrlcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jb2RlID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZldGNoVXNlcih0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogcmVzdWx0Lm1zZywgLy8g5o+Q56S655qE5YaF5a65LFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLCAvLyDlm77moIcsXG4gICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gLy8g6L+U5Zue5Zu+54mH55qE5pys5Zyw5paH5Lu26Lev5b6E5YiX6KGoIHRlbXBGaWxlUGF0aHMsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGV2ZW50cyA9IHt9O1xuICB3YXRjaCA9IHt9O1xuICBjb21wdXRlZCA9IHt9O1xuICBvbkxvYWQoKSB7IH07XG5cbiAgZmV0Y2hVc2VyKHJlZnJlc2ggPSBmYWxzZSkge1xuICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyh1c2VyID0+IHtcbiAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0sIHJlZnJlc2gpO1xuICB9XG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLmZldGNoVXNlcigpO1xuICB9O1xufVxuIl19