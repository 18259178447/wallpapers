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

var _api = require("./../../api/api.js");

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

var LoginPage = function(_wepy$page) {
    _inherits(LoginPage, _wepy$page);
    function LoginPage() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, LoginPage);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {}, _this.data = {
            loginType: "wx",
            phone: "",
            code: "",
            codeText: "获取验证码",
            sending: false,
            step: 1,
            loading: false
        }, _this.components = {}, _this.methods = {
            goProtocol: function goProtocol() {
                _wepy2.default.navigateTo({
                    url: "/pages/my/about?type=protocol"
                });
            },
            wxLogin: function wxLogin(e) {
                var _this2 = this;
                console.log(e);
                if (e.detail.iv) {
                    _api2.default.wxPhoneLogin(e.detail.iv, e.detail.encryptedData, this.$parent.globalData.uuid).then(function(res) {
                        _this2.goNext(res);
                    }, function(err) {
                        console.log(err);
                    });
                }
            },
            changeType: function changeType(type) {
                this.loginType = type;
            },
            phoneInput: function phoneInput(e) {
                this.phone = e.detail.value;
            },
            codeInput: function codeInput(e) {
                this.code = e.detail.value;
            },
            sendCode: function sendCode() {
                var _this3 = this;
                if (!this.phone) {
                    this.toast("请先填写手机号");
                } else if (this.phone.length < 11) {
                    this.toast("请填写正确的手机号");
                } else if (!this.sending) {
                    _api2.default.sendSms(this.phone).then(function() {
                        _this3.countdown();
                    }, function(err) {
                        console.log(err);
                    });
                }
            },
            next: function next() {
                var _this4 = this;
                // 登录
                                if (!this.phone) {
                    this.toast("请先填写手机号");
                } else if (this.phone.length < 11) {
                    this.toast("请填写正确的手机号");
                } else if (!this.code) {
                    this.toast("请填写验证码");
                } else if (this.code.length < 6) {
                    this.toast("请填写正确的验证码");
                } else if (!this.loading) {
                    this.loading = true;
                    _api2.default.smsLogin(this.phone, this.code).then(function(res) {
                        _this4.goNext(res);
                    }, function(err) {
                        console.log(err);
                    });
                }
            },
            getUserInfo: function getUserInfo(e) {
                var _this5 = this;
                if (e.detail.iv) {
                    _api2.default.updateUser(e.detail.iv, e.detail.encryptedData, this.$parent.globalData.uuid).then(function(res) {
                        _this5.$parent.updateUserInfo();
                        _wepy2.default.navigateBack({
                            delta: 1
                        });
                    });
                } else {
                    _wepy2.default.navigateBack({
                        delta: 1
                    });
                }
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {
            marginHeight: function marginHeight() {
                return _this.$parent.globalData.navHeight;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(LoginPage, [ {
        key: "toast",
        value: function toast(info) {
            _wepy2.default.showToast({
                title: info,
                // 提示的内容,
                icon: "none",
                // 图标,
                duration: 2e3,
                // 延迟时间,
                mask: false
            });
        }
    }, {
        key: "goNext",
        value: function() {
            var _ref2 = _asyncToGenerator(/* */ regeneratorRuntime.mark(function _callee(token) {
                var result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _wepy2.default.setStorageSync("token", token);
                            _context.next = 3;
                            return this.$parent.updateUserInfo(false);

                          case 3:
                            result = this.$parent.globalData.userInfo;
                            if (!result.avatar) {
                                this.step = 2;
                                this.$apply();
                            } else {
                                _wepy2.default.navigateBack({
                                    delta: 1
                                });
                            }

                          case 5:
                          case "end":
                            return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
            function goNext(_x) {
                return _ref2.apply(this, arguments);
            }
            return goNext;
        }()
    }, {
        key: "countdown",
        value: function countdown() {
            var _this6 = this;
            this.sending = true;
            var times = 60;
            this.timer = setInterval(function() {
                times--;
                _this6.codeText = "已发送" + times + "s";
                if (times === 0) {
                    _this6.sending = false;
                    _this6.codeText = "重新获取";
                    clearInterval(_this6.timer);
                }
                _this6.$apply();
            }, 1e3);
        }
    }, {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "onShow",
        value: function onShow() {
            var _this7 = this;
            if (!this.$parent.globalData.uuid) {
                this.$parent.wxLogin();
            } else {
                _wepy2.default.checkSession({
                    success: function success(res) {},
                    fail: function fail() {
                        _this7.$parent.wxLogin();
                    }
                });
            }
        }
    } ]);
    return LoginPage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(LoginPage, "pages/login/login"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luUGFnZSIsImNvbmZpZyIsImRhdGEiLCJsb2dpblR5cGUiLCJwaG9uZSIsImNvZGUiLCJjb2RlVGV4dCIsInNlbmRpbmciLCJzdGVwIiwibG9hZGluZyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwiZ29Qcm90b2NvbCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwid3hMb2dpbiIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwiaXYiLCJhcGkiLCJ3eFBob25lTG9naW4iLCJlbmNyeXB0ZWREYXRhIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1dWlkIiwidGhlbiIsImdvTmV4dCIsInJlcyIsImVyciIsImNoYW5nZVR5cGUiLCJ0eXBlIiwicGhvbmVJbnB1dCIsInZhbHVlIiwiY29kZUlucHV0Iiwic2VuZENvZGUiLCJ0b2FzdCIsImxlbmd0aCIsInNlbmRTbXMiLCJjb3VudGRvd24iLCJuZXh0Iiwic21zTG9naW4iLCJnZXRVc2VySW5mbyIsInVwZGF0ZVVzZXIiLCJ1cGRhdGVVc2VySW5mbyIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiZXZlbnRzIiwid2F0Y2giLCJjb21wdXRlZCIsIm1hcmdpbkhlaWdodCIsIm5hdkhlaWdodCIsImluZm8iLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsIm1hc2siLCJ0b2tlbiIsInNldFN0b3JhZ2VTeW5jIiwicmVzdWx0IiwidXNlckluZm8iLCJhdmF0YXIiLCIkYXBwbHkiLCJ0aW1lcyIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiY2hlY2tTZXNzaW9uIiwic3VjY2VzcyIsImZhaWwiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7Ozs7NExBQ25CQyxNLEdBQVMsRSxRQUNUQyxJLEdBQU87QUFDTEMsaUJBQVcsSUFETjtB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LENBQWtCO0FBQ2hCQywyQkFBTztBQURTLG1CQUFsQjtBQUdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBR1M7QUFBQTs7QUFDVixXQUFLekMsT0FBTCxHQUFlLElBQWY7QUFDQSxVQUFJMkQsUUFBUSxFQUFaO0FBQ0EsV0FBS0MsS0FBTCxHQUFhQyxZQUFZLFlBQU07QUFDN0JGO0FBQ0EsZUFBSzVELFFBQUwsMEJBQXNCNEQsS0FBdEI7QUFDQSxZQUFJQSxVQUFVLENBQWQsRUFBaUI7QUFDZixpQkFBSzNELE9BQUwsR0FBZSxLQUFmO0FBQ0EsaUJBQUtELFFBQUwsR0FBZ0IsTUFBaEI7QUFDQStELHdCQUFjLE9BQUtGLEtBQW5CO0FBQ0Q7QUFDRCxlQUFLRixNQUFMO0FBQ0QsT0FUWSxFQVNWLElBVFUsQ0FBYjtBQVVEOzs7NkJBUVEsQ0FBRzs7OzZCQUNIO0FBQUE7O0FBQ1AsVUFBSSxDQUFDLEtBQUt4QyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLElBQTdCLEVBQW1DO0FBQ2pDLGFBQUtGLE9BQUwsQ0FBYVQsT0FBYjtBQUNELE9BRkQsTUFFTztBQUNMSCx1QkFBS3lELFlBQUwsQ0FBa0I7QUFDaEJDLG1CQUFTLHNCQUFPLENBQUcsQ0FESDtBQUVoQkMsZ0JBQU0sZ0JBQU07QUFDVixtQkFBSy9DLE9BQUwsQ0FBYVQsT0FBYjtBQUNEO0FBSmUsU0FBbEI7QUFNRDtBQUVGOzs7O0VBM0lvQ0gsZUFBSzRELEk7O2tCQUF2QnpFLFMiLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2luUGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHt9O1xuICBkYXRhID0ge1xuICAgIGxvZ2luVHlwZTogJ3d4JyxcbiAgICBwaG9uZTogJycsXG4gICAgY29kZTogJycsXG4gICAgY29kZVRleHQ6ICfojrflj5bpqozor4HnoIEnLFxuICAgIHNlbmRpbmc6IGZhbHNlLFxuICAgIHN0ZXA6IDEsXG4gICAgbG9hZGluZzogZmFsc2VcbiAgfTtcbiAgY29tcG9uZW50cyA9IHt9O1xuICBtZXRob2RzID0ge1xuICAgIGdvUHJvdG9jb2woKSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvbXkvYWJvdXQ/dHlwZT1wcm90b2NvbCcgfSk7XG4gICAgfSxcbiAgICB3eExvZ2luKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgaWYgKGUuZGV0YWlsLml2KSB7XG4gICAgICAgIGFwaS53eFBob25lTG9naW4oZS5kZXRhaWwuaXYsIGUuZGV0YWlsLmVuY3J5cHRlZERhdGEsIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnV1aWQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICB0aGlzLmdvTmV4dChyZXMpO1xuICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgY2hhbmdlVHlwZSh0eXBlKSB7XG4gICAgICB0aGlzLmxvZ2luVHlwZSA9IHR5cGU7XG4gICAgfSxcbiAgICBwaG9uZUlucHV0KGUpIHtcbiAgICAgIHRoaXMucGhvbmUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICB9LFxuICAgIGNvZGVJbnB1dChlKSB7XG4gICAgICB0aGlzLmNvZGUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICB9LFxuICAgIHNlbmRDb2RlKCkge1xuICAgICAgaWYgKCF0aGlzLnBob25lKSB7XG4gICAgICAgIHRoaXMudG9hc3QoJ+ivt+WFiOWhq+WGmeaJi+acuuWPtycpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnBob25lLmxlbmd0aCA8IDExKSB7XG4gICAgICAgIHRoaXMudG9hc3QoJ+ivt+Whq+WGmeato+ehrueahOaJi+acuuWPtycpO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5zZW5kaW5nKSB7XG4gICAgICAgIGFwaS5zZW5kU21zKHRoaXMucGhvbmUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY291bnRkb3duKCk7XG4gICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBuZXh0KCkge1xuICAgICAgLy8g55m75b2VXG4gICAgICBpZiAoIXRoaXMucGhvbmUpIHtcbiAgICAgICAgdGhpcy50b2FzdCgn6K+35YWI5aGr5YaZ5omL5py65Y+3Jyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucGhvbmUubGVuZ3RoIDwgMTEpIHtcbiAgICAgICAgdGhpcy50b2FzdCgn6K+35aGr5YaZ5q2j56Gu55qE5omL5py65Y+3Jyk7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLmNvZGUpIHtcbiAgICAgICAgdGhpcy50b2FzdCgn6K+35aGr5YaZ6aqM6K+B56CBJyk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY29kZS5sZW5ndGggPCA2KSB7XG4gICAgICAgIHRoaXMudG9hc3QoJ+ivt+Whq+WGmeato+ehrueahOmqjOivgeeggScpO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5sb2FkaW5nKSB7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIGFwaS5zbXNMb2dpbih0aGlzLnBob25lLCB0aGlzLmNvZGUpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICB0aGlzLmdvTmV4dChyZXMpO1xuICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0VXNlckluZm8oZSkge1xuICAgICAgaWYgKGUuZGV0YWlsLml2KSB7XG4gICAgICAgIGFwaS51cGRhdGVVc2VyKGUuZGV0YWlsLml2LCBlLmRldGFpbC5lbmNyeXB0ZWREYXRhLCB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51dWlkKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy4kcGFyZW50LnVwZGF0ZVVzZXJJbmZvKCk7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHRvYXN0KGluZm8pIHtcbiAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICB0aXRsZTogaW5mbywgLy8g5o+Q56S655qE5YaF5a65LFxuICAgICAgaWNvbjogJ25vbmUnLCAvLyDlm77moIcsXG4gICAgICBkdXJhdGlvbjogMjAwMCwgLy8g5bu26L+f5pe26Ze0LFxuICAgICAgbWFzazogZmFsc2VcbiAgICB9KTtcbiAgfVxuICBhc3luYyBnb05leHQodG9rZW4pIHtcbiAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd0b2tlbicsIHRva2VuKTtcbiAgICBhd2FpdCB0aGlzLiRwYXJlbnQudXBkYXRlVXNlckluZm8oZmFsc2UpO1xuICAgIGxldCByZXN1bHQgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS51c2VySW5mbztcbiAgICBpZiAoIXJlc3VsdC5hdmF0YXIpIHtcbiAgICAgIHRoaXMuc3RlcCA9IDI7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgIGRlbHRhOiAxXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY291bnRkb3duKCkge1xuICAgIHRoaXMuc2VuZGluZyA9IHRydWU7XG4gICAgbGV0IHRpbWVzID0gNjA7XG4gICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRpbWVzLS07XG4gICAgICB0aGlzLmNvZGVUZXh0ID0gYOW3suWPkemAgSR7dGltZXN9c2A7XG4gICAgICBpZiAodGltZXMgPT09IDApIHtcbiAgICAgICAgdGhpcy5zZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29kZVRleHQgPSAn6YeN5paw6I635Y+WJztcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSwgMTAwMCk7XG4gIH1cbiAgZXZlbnRzID0ge307XG4gIHdhdGNoID0ge307XG4gIGNvbXB1dGVkID0ge1xuICAgIG1hcmdpbkhlaWdodDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLm5hdkhlaWdodDtcbiAgICB9XG4gIH07XG4gIG9uTG9hZCgpIHsgfTtcbiAgb25TaG93KCkge1xuICAgIGlmICghdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXVpZCkge1xuICAgICAgdGhpcy4kcGFyZW50Lnd4TG9naW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2VweS5jaGVja1Nlc3Npb24oe1xuICAgICAgICBzdWNjZXNzOiByZXMgPT4geyB9LFxuICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy4kcGFyZW50Lnd4TG9naW4oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gIH07XG59XG4iXX0=