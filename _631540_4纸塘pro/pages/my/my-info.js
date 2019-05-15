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

var MyInfoPage = function(_wepy$page) {
    _inherits(MyInfoPage, _wepy$page);
    function MyInfoPage() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, MyInfoPage);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MyInfoPage.__proto__ || Object.getPrototypeOf(MyInfoPage)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {}, _this.data = {
            user: null
        }, _this.$repeat = {}, _this.$props = {
            navbar: {
                padding: "true",
                title: "设置"
            }
        }, _this.$events = {}, _this.components = {
            navbar: _navbar2.default
        }, _this.methods = {
            changeAvatar: function changeAvatar() {
                _wepy2.default.chooseImage({
                    count: "1",
                    // 最多可以选择的图片张数,
                    success: function success(res) {
                        console.log(res);
                        var fileUrl = res.tempFiles[0].path;
                        _wepy2.default.navigateTo({
                            url: "/pages/my/photo-cropper?url=" + fileUrl
                        });
                    }
                });
            },
            logout: function logout() {
                wx.removeStorageSync("token");
                this.$parent.globalData.userInfo = null;
                _wepy2.default.navigateBack({
                    delta: 3
                });
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(MyInfoPage, [ {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "onShow",
        value: function onShow() {
            var _this2 = this;
            this.$parent.getUserInfo(function(user) {
                _this2.user = user;
                _this2.$apply();
            }, true);
        }
    } ]);
    return MyInfoPage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(MyInfoPage, "pages/my/my-info"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LWluZm8uanMiXSwibmFtZXMiOlsiTXlJbmZvUGFnZSIsImNvbmZpZyIsImRhdGEiLCJ1c2VyIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibmF2YmFyIiwibWV0aG9kcyIsImNoYW5nZUF2YXRhciIsIndlcHkiLCJjaG9vc2VJbWFnZSIsImNvdW50Iiwic3VjY2VzcyIsImNvbnNvbGUiLCJsb2ciLCJyZXMiLCJmaWxlVXJsIiwidGVtcEZpbGVzIiwicGF0aCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJsb2dvdXQiLCJ3eCIsInJlbW92ZVN0b3JhZ2VTeW5jIiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJ1c2VySW5mbyIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiZXZlbnRzIiwid2F0Y2giLCJjb21wdXRlZCIsImdldFVzZXJJbmZvIiwiJGFwcGx5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxVOzs7Ozs7Ozs7Ozs7Ozs4TEFDbkJDLE0sR0FBUyxFLFFBR1RDLEksR0FBTztBQUNMQyxZQUFNO0FBREQsSyxRQUlSQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsV0FBVSxNQUFYLEVBQWtCLFNBQVEsSUFBMUIsRUFBVixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQztBQURVLEssUUFJWkMsTyxHQUFVO0FBQ1JDLGtCQURRLDBCQUNPO0FBQ2JDLHVCQUFLQyxXQUFMLENBQWlCO0FBQ2ZDLGlCQUFPLEdBRFEsRUFDSDtBQUNaQyxtQkFBUyxzQkFBTztBQUNkQyxvQkFBUUMsR0FBUixDQUFZQyxHQUFaO0FBQ0EsZ0JBQUlDLFVBQVVELElBQUlFLFNBQUosQ0FBYyxDQUFkLEVBQWlCQyxJQUEvQjtBQUNBVCwyQkFBS1UsVUFBTCxDQUFnQixFQUFFQyxzQ0FBb0NKLE9BQXRDLEVBQWhCO0FBQ0Q7QUFOYyxTQUFqQjtBQVFELE9BVk87QUFXUkssWUFYUSxvQkFXQztBQUNQQyxXQUFHQyxpQkFBSCxDQUFxQixPQUFyQjtBQUNBLGFBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsUUFBeEIsR0FBbUMsSUFBbkM7QUFDQWpCLHVCQUFLa0IsWUFBTCxDQUFrQjtBQUNoQkMsaUJBQU87QUFEUyxTQUFsQjtBQUdEO0FBakJPLEssUUFvQlZDLE0sR0FBUyxFLFFBRVRDLEssR0FBUSxFLFFBRVJDLFEsR0FBVyxFOzs7Ozs2QkFFRixDQUFHOzs7NkJBRUg7QUFBQTs7QUFDUCxXQUFLUCxPQUFMLENBQWFRLFdBQWIsQ0FBeUIsZ0JBQVE7QUFDL0IsZUFBSy9CLElBQUwsR0FBWUEsSUFBWjtBQUNBLGVBQUtnQyxNQUFMO0FBQ0QsT0FIRCxFQUdHLElBSEg7QUFJRDs7OztFQWhEcUN4QixlQUFLeUIsSTs7a0JBQXhCcEMsVSIsImZpbGUiOiJteS1pbmZvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9uYXZiYXInO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlJbmZvUGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgfTtcblxuICBkYXRhID0ge1xuICAgIHVzZXI6IG51bGxcbiAgfTtcblxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wibmF2YmFyXCI6e1wicGFkZGluZ1wiOlwidHJ1ZVwiLFwidGl0bGVcIjpcIuiuvue9rlwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgbmF2YmFyXG4gIH07XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBjaGFuZ2VBdmF0YXIoKSB7XG4gICAgICB3ZXB5LmNob29zZUltYWdlKHtcbiAgICAgICAgY291bnQ6ICcxJywgLy8g5pyA5aSa5Y+v5Lul6YCJ5oup55qE5Zu+54mH5byg5pWwLFxuICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgICAgbGV0IGZpbGVVcmwgPSByZXMudGVtcEZpbGVzWzBdLnBhdGg7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHsgdXJsOiBgL3BhZ2VzL215L3Bob3RvLWNyb3BwZXI/dXJsPSR7ZmlsZVVybH1gIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGxvZ291dCgpIHtcbiAgICAgIHd4LnJlbW92ZVN0b3JhZ2VTeW5jKCd0b2tlbicpO1xuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8gPSBudWxsO1xuICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICBkZWx0YTogM1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGV2ZW50cyA9IHt9O1xuXG4gIHdhdGNoID0ge307XG5cbiAgY29tcHV0ZWQgPSB7fTtcblxuICBvbkxvYWQoKSB7IH07XG5cbiAgb25TaG93KCkge1xuICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyh1c2VyID0+IHtcbiAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0sIHRydWUpO1xuICB9O1xufVxuIl19