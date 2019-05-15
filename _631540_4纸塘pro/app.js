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

var _wepy = require("./npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

require("./npm/wepy-async-function/index.js");

var _api = require("./api/api.js");

var _api2 = _interopRequireDefault(_api);

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

var _default = function(_wepy$app) {
    _inherits(_default, _wepy$app);
    function _default() {
        _classCallCheck(this, _default);
        var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));
        _this.config = {
            pages: [ "pages/home/index", "pages/upload/index", "pages/search/search", "pages/detail/detail", "pages/detail/comment", "pages/picture/all", "pages/picture/category", "pages/login/login", "pages/person/index", "pages/topic/index", "pages/topic/topic", "pages/my/index", "pages/my/my-upload", "pages/my/my-download", "pages/my/my-collection", "pages/my/about", "pages/my/help", "pages/my/my-score", "pages/my/my-fans", "pages/my/my-pay", "pages/my/my-attention", "pages/my/my-info", "pages/my/edit-name", "pages/my/photo-cropper", "pages/sign/sign", "pages/my/wx-official", "pages/upload/upload", "pages/my/upload-detail" ],
            window: {
                navigationStyle: "custom",
                backgroundTextStyle: "dark",
                navigationBarBackgroundColor: "#141414",
                navigationBarTitleText: "纸塘壁纸pro",
                navigationBarTextStyle: "#fff",
                backgroundColor: "#141414"
            }
        };
        _this.globalData = {
            userInfo: null,
            uuid: ""
        };
        _this.use("requestfix");
        _this.requestIntercept();
        return _this;
    }
    _createClass(_default, [ {
        key: "onLaunch",
        value: function onLaunch() {
            var _this2 = this;
            wx.getSystemInfo({
                success: function success(res) {
                    _this2.globalData.navHeight = res.statusBarHeight;
                    _this2.globalData.marginHeight = res.statusBarHeight + 46;
                    if (res.model.indexOf("iPhone X") > -1) {
                        _this2.globalData.isIpx = true;
                    }
                    if (res.platform === "ios") {
                        _this2.globalData.ios = true;
                    } else {
                        _this2.globalData.ios = false;
                    }
                },
                fail: function fail(err) {
                    console.error(err);
                }
            });
            this.wxLogin();
        }
    }, {
        key: "sleep",
        value: function sleep(s) {
            return new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve("promise resolved");
                }, s * 1e3);
            });
        }
    }, {
        key: "requestIntercept",
        value: function requestIntercept() {
            this.intercept("request", {
                // 发出请求时的回调函数
                config: function config(p) {
                    // 对所有request请求中的OBJECT参数对象统一附加时间戳属性
                    p.header.token = _wepy2.default.getStorageSync("token");
                    // 必须返回OBJECT参数对象，否则无法发送请求到服务端
                                        return p;
                },
                // 请求成功后的回调函数
                success: function success(p) {
                    // 可以在这里对收到的响应数据对象进行加工处理
                    if (p.data.code !== 200 && p.data.code !== 401) {
                        _wepy2.default.showToast({
                            icon: "none",
                            title: p.data.msg,
                            // 提示的内容,
                            duration: 1e3,
                            // 延迟时间,
                            mask: false
                        });
                    }
                    // 必须返回响应数据对象，否则后续无法对响应数据进行处理
                                        return p.data;
                },
                // 请求失败后的回调函数
                fail: function fail(p) {
                    // 必须返回响应数据对象，否则后续无法对响应数据进行处理
                    return p;
                }
            });
        }
    }, {
        key: "wxLogin",
        value: function wxLogin() {
            var _this3 = this;
            return new Promise(function(resolve, reject) {
                _wepy2.default.login({
                    success: function success(res) {
                        if (res.code) {
                            _api2.default.wxLogin(res.code).then(function(res) {
                                _this3.globalData.uuid = res;
                                resolve(true);
                            }, function(err) {
                                console.error(err);
                                resolve(false);
                            });
                        }
                    },
                    fail: function fail(err) {
                        console.error(err);
                        resolve(false);
                    }
                });
            });
        }
    }, {
        key: "getUserInfo",
        value: function() {
            var _ref = _asyncToGenerator(/* */ regeneratorRuntime.mark(function _callee(cb) {
                var detail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                var token;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            token = _wepy2.default.getStorageSync("token");
                            if (!(!this.globalData.userInfo && !token)) {
                                _context.next = 4;
                                break;
                            }
                            cb(null);
                            return _context.abrupt("return");

                          case 4:
                            if (!(this.globalData.userInfo && !detail)) {
                                _context.next = 8;
                                break;
                            }
                            cb(this.globalData.userInfo);
                            _context.next = 11;
                            break;

                          case 8:
                            _context.next = 10;
                            return this.updateUserInfo(detail);

                          case 10:
                            cb(this.globalData.userInfo);

                          case 11:
                          case "end":
                            return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
            function getUserInfo(_x2) {
                return _ref.apply(this, arguments);
            }
            return getUserInfo;
        }()
    }, {
        key: "updateUserInfo",
        value: function() {
            var _ref2 = _asyncToGenerator(/* */ regeneratorRuntime.mark(function _callee2(detail) {
                var result;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return _api2.default.fetchUser(detail);

                          case 3:
                            result = _context2.sent;
                            // if (!result.avatar) {
                            //   result.avatar = '/assets/imgs/my.png';
                            // }
                                                        this.globalData.userInfo = result;
                            _context2.next = 10;
                            break;

                          case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2["catch"](0);
                            console.log(_context2.t0);

                          case 10:
                          case "end":
                            return _context2.stop();
                        }
                    }
                }, _callee2, this, [ [ 0, 7 ] ]);
            }));
            function updateUserInfo(_x3) {
                return _ref2.apply(this, arguments);
            }
            return updateUserInfo;
        }()
    } ]);
    return _default;
}(_wepy2.default.app);

App(require("./npm/wepy/lib/wepy.js").default.$createApp(_default, {
    noPromiseAPI: [ "createSelectorQuery" ]
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsIm5hdmlnYXRpb25TdHlsZSIsImJhY2tncm91bmRUZXh0U3R5bGUiLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJ1dWlkIiwidXNlIiwicmVxdWVzdEludGVyY2VwdCIsInd4IiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJuYXZIZWlnaHQiLCJyZXMiLCJzdGF0dXNCYXJIZWlnaHQiLCJtYXJnaW5IZWlnaHQiLCJtb2RlbCIsImluZGV4T2YiLCJpc0lweCIsInBsYXRmb3JtIiwiaW9zIiwiZmFpbCIsImNvbnNvbGUiLCJlcnJvciIsImVyciIsInd4TG9naW4iLCJzIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0IiwiaW50ZXJjZXB0IiwicCIsImhlYWRlciIsInRva2VuIiwid2VweSIsImdldFN0b3JhZ2VTeW5jIiwiZGF0YSIsImNvZGUiLCJzaG93VG9hc3QiLCJpY29uIiwidGl0bGUiLCJtc2ciLCJkdXJhdGlvbiIsIm1hc2siLCJsb2dpbiIsImFwaSIsInRoZW4iLCJjYiIsImRldGFpbCIsInVwZGF0ZVVzZXJJbmZvIiwiZmV0Y2hVc2VyIiwicmVzdWx0IiwibG9nIiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlERSxzQkFBYztBQUFBOztBQUFBOztBQUFBLFVBOUNkQSxNQThDYyxHQTlDTDtBQUNQQyxhQUFPLENBQ0wsa0JBREssRUFFTCxvQkFGSyxFQUdMLHFCQUhLLEVBSUwscUJBSkssRUFLTCxzQkFMSyxFQU1MLG1CQU5LLEVBT0wsd0JBUEssRUFRTCxtQkFSSyxFQVNMLG9CQVRLLEVB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Ozs7O0VBL0p1QmxCLGVBQUttQixHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nO1xuaW1wb3J0IGFwaSBmcm9tICcuL2FwaS9hcGknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgY29uZmlnID0ge1xuICAgIHBhZ2VzOiBbXG4gICAgICAncGFnZXMvaG9tZS9pbmRleCcsXG4gICAgICAncGFnZXMvdXBsb2FkL2luZGV4JyxcbiAgICAgICdwYWdlcy9zZWFyY2gvc2VhcmNoJyxcbiAgICAgICdwYWdlcy9kZXRhaWwvZGV0YWlsJyxcbiAgICAgICdwYWdlcy9kZXRhaWwvY29tbWVudCcsXG4gICAgICAncGFnZXMvcGljdHVyZS9hbGwnLFxuICAgICAgJ3BhZ2VzL3BpY3R1cmUvY2F0ZWdvcnknLFxuICAgICAgJ3BhZ2VzL2xvZ2luL2xvZ2luJyxcbiAgICAgICdwYWdlcy9wZXJzb24vaW5kZXgnLFxuICAgICAgJ3BhZ2VzL3RvcGljL2luZGV4JyxcbiAgICAgICdwYWdlcy90b3BpYy90b3BpYycsXG4gICAgICAncGFnZXMvbXkvaW5kZXgnLFxuICAgICAgJ3BhZ2VzL215L215LXVwbG9hZCcsXG4gICAgICAncGFnZXMvbXkvbXktZG93bmxvYWQnLFxuICAgICAgJ3BhZ2VzL215L215LWNvbGxlY3Rpb24nLFxuICAgICAgJ3BhZ2VzL215L2Fib3V0JyxcbiAgICAgICdwYWdlcy9teS9oZWxwJyxcbiAgICAgICdwYWdlcy9teS9teS1zY29yZScsXG4gICAgICAncGFnZXMvbXkvbXktZmFucycsXG4gICAgICAncGFnZXMvbXkvbXktcGF5JyxcbiAgICAgICdwYWdlcy9teS9teS1hdHRlbnRpb24nLFxuICAgICAgJ3BhZ2VzL215L215LWluZm8nLFxuICAgICAgJ3BhZ2VzL215L2VkaXQtbmFtZScsXG4gICAgICAncGFnZXMvbXkvcGhvdG8tY3JvcHBlcicsXG4gICAgICAncGFnZXMvc2lnbi9zaWduJyxcbiAgICAgICdwYWdlcy9teS93eC1vZmZpY2lhbCcsXG4gICAgICAncGFnZXMvdXBsb2FkL3VwbG9hZCcsXG4gICAgICAncGFnZXMvbXkvdXBsb2FkLWRldGFpbCdcbiAgICBdLFxuICAgIHdpbmRvdzoge1xuICAgICAgbmF2aWdhdGlvblN0eWxlOiAnY3VzdG9tJyxcbiAgICAgIGJhY2tncm91bmRUZXh0U3R5bGU6ICdkYXJrJyxcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMTQxNDE0JyxcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnurjloZjlo4Hnurhwcm8nLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJyNmZmYnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzE0MTQxNCdcbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIHV1aWQ6ICcnXG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudXNlKCdyZXF1ZXN0Zml4Jyk7XG4gICAgdGhpcy5yZXF1ZXN0SW50ZXJjZXB0KCk7XG4gIH1cblxuICBvbkxhdW5jaCgpIHtcbiAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5uYXZIZWlnaHQgPSByZXMuc3RhdHVzQmFySGVpZ2h0O1xuICAgICAgICB0aGlzLmdsb2JhbERhdGEubWFyZ2luSGVpZ2h0ID0gcmVzLnN0YXR1c0JhckhlaWdodCArIDQ2O1xuICAgICAgICBpZiAocmVzLm1vZGVsLmluZGV4T2YoJ2lQaG9uZSBYJykgPiAtMSkge1xuICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS5pc0lweCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcy5wbGF0Zm9ybSA9PT0gJ2lvcycpIHtcbiAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuaW9zID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmdsb2JhbERhdGEuaW9zID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBmYWlsOiBlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy53eExvZ2luKCk7XG4gIH1cblxuICBzbGVlcChzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXNvbHZlKCdwcm9taXNlIHJlc29sdmVkJyk7XG4gICAgICB9LCBzICogMTAwMCk7XG4gICAgfSk7XG4gIH1cblxuICByZXF1ZXN0SW50ZXJjZXB0KCkge1xuICAgIHRoaXMuaW50ZXJjZXB0KCdyZXF1ZXN0Jywge1xuICAgICAgLy8g5Y+R5Ye66K+35rGC5pe255qE5Zue6LCD5Ye95pWwXG4gICAgICBjb25maWcocCkge1xuICAgICAgICAvLyDlr7nmiYDmnIlyZXF1ZXN06K+35rGC5Lit55qET0JKRUNU5Y+C5pWw5a+56LGh57uf5LiA6ZmE5Yqg5pe26Ze05oiz5bGe5oCnXG4gICAgICAgIHAuaGVhZGVyLnRva2VuID0gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKTtcbiAgICAgICAgLy8g5b+F6aG76L+U5ZueT0JKRUNU5Y+C5pWw5a+56LGh77yM5ZCm5YiZ5peg5rOV5Y+R6YCB6K+35rGC5Yiw5pyN5Yqh56uvXG4gICAgICAgIHJldHVybiBwO1xuICAgICAgfSxcblxuICAgICAgLy8g6K+35rGC5oiQ5Yqf5ZCO55qE5Zue6LCD5Ye95pWwXG4gICAgICBzdWNjZXNzKHApIHtcbiAgICAgICAgLy8g5Y+v5Lul5Zyo6L+Z6YeM5a+55pS25Yiw55qE5ZON5bqU5pWw5o2u5a+56LGh6L+b6KGM5Yqg5bel5aSE55CGXG4gICAgICAgIGlmIChwLmRhdGEuY29kZSAhPT0gMjAwICYmIHAuZGF0YS5jb2RlICE9PSA0MDEpIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICB0aXRsZTogcC5kYXRhLm1zZywgLy8g5o+Q56S655qE5YaF5a65LFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsIC8vIOW7tui/n+aXtumXtCxcbiAgICAgICAgICAgIG1hc2s6IGZhbHNlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5b+F6aG76L+U5Zue5ZON5bqU5pWw5o2u5a+56LGh77yM5ZCm5YiZ5ZCO57ut5peg5rOV5a+55ZON5bqU5pWw5o2u6L+b6KGM5aSE55CGXG4gICAgICAgIHJldHVybiBwLmRhdGE7XG4gICAgICB9LFxuXG4gICAgICAvLyDor7fmsYLlpLHotKXlkI7nmoTlm57osIPlh73mlbBcbiAgICAgIGZhaWwocCkge1xuICAgICAgICAvLyDlv4Xpobvov5Tlm57lk43lupTmlbDmja7lr7nosaHvvIzlkKbliJnlkI7nu63ml6Dms5Xlr7nlk43lupTmlbDmja7ov5vooYzlpITnkIZcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB3eExvZ2luKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB3ZXB5LmxvZ2luKHtcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICBpZiAocmVzLmNvZGUpIHtcbiAgICAgICAgICAgIGFwaS53eExvZ2luKHJlcy5jb2RlKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuZ2xvYmFsRGF0YS51dWlkID0gcmVzO1xuICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZXJyID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0VXNlckluZm8oY2IsIGRldGFpbCA9IGZhbHNlKSB7XG4gICAgbGV0IHRva2VuID0gd2VweS5nZXRTdG9yYWdlU3luYygndG9rZW4nKTtcbiAgICBpZiAoIXRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyAmJiAhdG9rZW4pIHtcbiAgICAgIGNiKG51bGwpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvICYmICFkZXRhaWwpIHtcbiAgICAgIGNiKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF3YWl0IHRoaXMudXBkYXRlVXNlckluZm8oZGV0YWlsKTtcbiAgICAgIGNiKHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdXBkYXRlVXNlckluZm8oZGV0YWlsKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBhcGkuZmV0Y2hVc2VyKGRldGFpbCk7XG4gICAgICAvLyBpZiAoIXJlc3VsdC5hdmF0YXIpIHtcbiAgICAgIC8vICAgcmVzdWx0LmF2YXRhciA9ICcvYXNzZXRzL2ltZ3MvbXkucG5nJztcbiAgICAgIC8vIH1cbiAgICAgIHRoaXMuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlc3VsdDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==