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
            navigationBarTitleText: ""
        }, _this.data = {
            user: null
        }, _this.$repeat = {}, _this.$props = {
            navbar: {
                color: "#1a1a1a",
                padding: "true",
                title: "个人中心"
            }
        }, _this.$events = {}, _this.components = {
            navbar: _navbar2.default
        }, _this.methods = {
            loadUser: function loadUser() {
                this.fetchUserInfo();
            },
            loadSuccess: function loadSuccess(e) {
                console.log(e);
            },
            error: function error(e) {
                console.log(e);
            },
            goFans: function goFans() {
                _wepy2.default.navigateTo({
                    url: "/pages/my/my-fans"
                });
            },
            goSetting: function goSetting() {
                _wepy2.default.navigateTo({
                    url: "/pages/my/setting"
                });
            },
            goMyInfo: function goMyInfo() {
                _wepy2.default.navigateTo({
                    url: "/pages/my/my-info"
                });
            },
            goPerson: function goPerson() {
                _wepy2.default.navigateTo({
                    url: "/pages/person/index?id=" + this.user.id
                });
            },
            kf: function kf() {}
        }, _this.events = {}, _this.watch = {}, _this.computed = {
            marginHeight: function marginHeight() {
                return _this.$parent.globalData.navHeight;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Example, [ {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "onShow",
        value: function onShow() {
            this.fetchUserInfo();
        }
    }, {
        key: "fetchUserInfo",
        value: function fetchUserInfo() {
            var _this2 = this;
            this.$parent.getUserInfo(function(user) {
                _this2.user = user;
                _this2.$apply();
            }, true);
        }
    } ]);
    return Example;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Example, "pages/my/index"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkV4YW1wbGUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsInVzZXIiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJuYXZiYXIiLCJtZXRob2RzIiwibG9hZFVzZXIiLCJmZXRjaFVzZXJJbmZvIiwibG9hZFN1Y2Nlc3MiLCJlIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiZ29GYW5zIiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJnb1NldHRpbmciLCJnb015SW5mbyIsImdvUGVyc29uIiwiaWQiLCJrZiIsImV2ZW50cyIsIndhdGNoIiwiY29tcHV0ZWQiLCJtYXJnaW5IZWlnaHQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIm5hdkhlaWdodCIsImdldFVzZXJJbmZvIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsWUFBTTtBQURELEssUUFHUkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLFNBQVEsU0FBVCxFQUFtQixXQUFVLE1BQTdCLEVBQW9DLFNBQVEsTUFBNUMsRUFBVixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQztBQURVLEssUUFHWkMsTyxHQUFVO0FBQ1JDLGNBRFEsc0JBQ0c7QUFDVCxhQUFLQyxhQUFMO0FBQ0QsT0FITztBQUlSQyxpQkFKUSx1QkFJSUMsQ0FKSixFQUlPO0FBQ2JDLGdCQUFRQyxHQUFSLENBQVlGLENBQVo7QUFDRCxPQU5PO0FBT1JHLFdBUFEsaUJBT0ZILENBUEUsRUFPQztBQUNQQyxnQkFBUUMsR0FBUixDQUFZRixDQUFaO0FBQ0QsT0FUTztBQVVSSSxZQVZRLG9CQVVDO0FBQ1BDLHVCQUFLQyxVQUFMLENBQWdCLEVBQUVDLEtBQUssbUJBQVAsRUFBaEI7QUFDRCxPQVpPO0FBYVJDLGVBYlEsdUJBYUk7QUFDVkgsdUJBQUtDLFVBQUwsQ0FBZ0IsRUFBRUMsS0FBSyxtQkFBUCxFQUFoQjtBQUNELE9BZk87QUFnQlJFLGNBaEJRLHNCQWdCRztBQUNUSix1QkFBS0MsVUFBTCxDQUFnQixFQUFFQyxLQUFLLG1CQUFQLEVBQWhCO0FBQ0QsT0FsQk87QUFtQlJHLGNBbkJRLHNCQW1CRztBQUNUTCx1QkFBS0MsVUFBTCxDQUFnQixFQUFFQyxpQ0FBK0IsS0FBS2pCLElBQUwsQ0FBVXFCLEVBQTNDLEVBQWhCO0FBQ0QsT0FyQk87QUFzQlJDLFFBdEJRLGdCQXNCSCxDQUVKO0FBeEJPLEssUUEwQlZDLE0sR0FBUyxFLFFBQ1RDLEssR0FBUSxFLFFBQ1JDLFEsR0FBVztBQUNUQyxvQkFBYyx3QkFBTTtBQUNsQixlQUFPLE1BQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsU0FBL0I7QUFDRDtBQUhRLEs7Ozs7OzZCQUtGLENBQUc7Ozs2QkFFSDtBQUNQLFdBQUtyQixhQUFMO0FBQ0Q7OztvQ0FFZTtBQUFBOztBQUNkLFdBQUttQixPQUFMLENBQWFHLFdBQWIsQ0FBeUIsZ0JBQVE7QUFDL0IsZUFBSzlCLElBQUwsR0FBWUEsSUFBWjtBQUNBLGVBQUsrQixNQUFMO0FBQ0QsT0FIRCxFQUdHLElBSEg7QUFJRDs7OztFQXpEa0NoQixlQUFLaUIsSTs7a0JBQXJCcEMsTyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgbmF2YmFyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbmF2YmFyJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4YW1wbGUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJydcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICB1c2VyOiBudWxsXG4gIH07XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJuYXZiYXJcIjp7XCJjb2xvclwiOlwiIzFhMWExYVwiLFwicGFkZGluZ1wiOlwidHJ1ZVwiLFwidGl0bGVcIjpcIuS4quS6uuS4reW/g1wifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgbmF2YmFyXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgbG9hZFVzZXIoKSB7XG4gICAgICB0aGlzLmZldGNoVXNlckluZm8oKTtcbiAgICB9LFxuICAgIGxvYWRTdWNjZXNzKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIH0sXG4gICAgZXJyb3IoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfSxcbiAgICBnb0ZhbnMoKSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvbXkvbXktZmFucycgfSk7XG4gICAgfSxcbiAgICBnb1NldHRpbmcoKSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvbXkvc2V0dGluZycgfSk7XG4gICAgfSxcbiAgICBnb015SW5mbygpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9teS9teS1pbmZvJyB9KTtcbiAgICB9LFxuICAgIGdvUGVyc29uKCkge1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHsgdXJsOiBgL3BhZ2VzL3BlcnNvbi9pbmRleD9pZD0ke3RoaXMudXNlci5pZH1gIH0pO1xuICAgIH0sXG4gICAga2YoKSB7XG5cbiAgICB9XG4gIH07XG4gIGV2ZW50cyA9IHt9O1xuICB3YXRjaCA9IHt9O1xuICBjb21wdXRlZCA9IHtcbiAgICBtYXJnaW5IZWlnaHQ6ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5uYXZIZWlnaHQ7XG4gICAgfVxuICB9O1xuICBvbkxvYWQoKSB7IH07XG5cbiAgb25TaG93KCkge1xuICAgIHRoaXMuZmV0Y2hVc2VySW5mbygpO1xuICB9XG5cbiAgZmV0Y2hVc2VySW5mbygpIHtcbiAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8odXNlciA9PiB7XG4gICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9LCB0cnVlKTtcbiAgfTtcbn1cbiJdfQ==