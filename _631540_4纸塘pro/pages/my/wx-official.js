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
        _this), _this.config = {}, _this.data = {}, _this.$repeat = {}, _this.$props = {
            navbar: {
                padding: "true",
                title: "关注公众号"
            }
        }, _this.$events = {}, _this.components = {
            navbar: _navbar2.default
        }, _this.methods = {
            copyData: function copyData() {
                _wepy2.default.setClipboardData({
                    data: "iwannabefreeee",
                    // 需要设置的内容,
                    success: function success(res) {
                        _wepy2.default.showToast({
                            title: "复制成功",
                            // 提示的内容,
                            icon: "success",
                            // 图标,
                            duration: 2e3
                        });
                    }
                });
            },
            kf: function kf() {}
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Example, [ {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "onShow",
        value: function onShow() {}
    } ]);
    return Example;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Example, "pages/my/wx-official"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4LW9mZmljaWFsLmpzIl0sIm5hbWVzIjpbIkV4YW1wbGUiLCJjb25maWciLCJkYXRhIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibmF2YmFyIiwibWV0aG9kcyIsImNvcHlEYXRhIiwid2VweSIsInNldENsaXBib2FyZERhdGEiLCJzdWNjZXNzIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJrZiIsImV2ZW50cyIsIndhdGNoIiwiY29tcHV0ZWQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTLEUsUUFDVEMsSSxHQUFPLEUsUUFDUkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLFdBQVUsTUFBWCxFQUFrQixTQUFRLE9BQTFCLEVBQVYsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkM7QUFEVSxLLFFBR1pDLE8sR0FBVTtBQUNSQyxjQURRLHNCQUNHO0FBQ1RDLHVCQUFLQyxnQkFBTCxDQUFzQjtBQUNwQlQsZ0JBQU0sZ0JBRGMsRUFDSTtBQUN4QlUsbUJBQVMsc0JBQU87QUFDZEYsMkJBQUtHLFNBQUwsQ0FBZTtBQUNiQyxxQkFBTyxNQURNLEVBQ0U7QUFDZkMsb0JBQU0sU0FGTyxFQUVJO0FBQ2pCQyx3QkFBVTtBQUhHLGFBQWY7QUFLRDtBQVJtQixTQUF0QjtBQVVELE9BWk87QUFhUkMsUUFiUSxnQkFhSCxDQUFHO0FBYkEsSyxRQWVWQyxNLEdBQVMsRSxRQUNUQyxLLEdBQVEsRSxRQUNSQyxRLEdBQVcsRTs7Ozs7NkJBQ0YsQ0FBRzs7OzZCQUNILENBQUc7Ozs7RUE1QnVCVixlQUFLVyxJOztrQkFBckJyQixPIiwiZmlsZSI6Ind4LW9mZmljaWFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9uYXZiYXInO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhhbXBsZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHt9O1xuICBkYXRhID0ge307XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJuYXZiYXJcIjp7XCJwYWRkaW5nXCI6XCJ0cnVlXCIsXCJ0aXRsZVwiOlwi5YWz5rOo5YWs5LyX5Y+3XCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBuYXZiYXJcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBjb3B5RGF0YSgpIHtcbiAgICAgIHdlcHkuc2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgIGRhdGE6ICdpd2FubmFiZWZyZWVlZScsIC8vIOmcgOimgeiuvue9rueahOWGheWuuSxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+WkjeWItuaIkOWKnycsIC8vIOaPkOekuueahOWGheWuuSxcbiAgICAgICAgICAgIGljb246ICdzdWNjZXNzJywgLy8g5Zu+5qCHLFxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBrZigpIHsgfVxuICB9O1xuICBldmVudHMgPSB7fTtcbiAgd2F0Y2ggPSB7fTtcbiAgY29tcHV0ZWQgPSB7fTtcbiAgb25Mb2FkKCkgeyB9O1xuICBvblNob3coKSB7IH07XG59XG4iXX0=