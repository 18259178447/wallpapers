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
            navigationBarTitleText: "用户协议",
            navigationStyle: "default"
        }, _this.data = {
            src: "https://ztwp.ninefrost.com/static/secrecy.html"
        }, _this.components = {}, _this.methods = {}, _this.events = {}, _this.watch = {}, 
        _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Example, [ {
        key: "onLoad",
        value: function onLoad(options) {
            if (options.type === "copyright") {
                // this.src = '';
                this.$apply();
            }
        }
    }, {
        key: "onShow",
        value: function onShow() {}
    } ]);
    return Example;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Example, "pages/my/about"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0LmpzIl0sIm5hbWVzIjpbIkV4YW1wbGUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvblN0eWxlIiwiZGF0YSIsInNyYyIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwiZXZlbnRzIiwid2F0Y2giLCJjb21wdXRlZCIsIm9wdGlvbnMiLCJ0eXBlIiwiJGFwcGx5Iiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyx1QkFBaUI7QUFGVixLLFFBS1RDLEksR0FBTztBQUNMQyxXQUFLO0FBREEsSyxRQUlQQyxVLEdBQWEsRSxRQUViQyxPLEdBQVUsRSxRQUVWQyxNLEdBQVMsRSxRQUVUQyxLLEdBQVEsRSxRQUVSQyxRLEdBQVcsRTs7Ozs7MkJBRUpDLE8sRUFBUztBQUNkLFVBQUlBLFFBQVFDLElBQVIsS0FBaUIsV0FBckIsRUFBa0M7QUFDaEM7QUFDQSxhQUFLQyxNQUFMO0FBQ0Q7QUFDRjs7OzZCQUVRLENBQUc7Ozs7RUEzQnVCQyxlQUFLQyxJOztrQkFBckJmLE8iLCJmaWxlIjoiYWJvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhhbXBsZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn55So5oi35Y2P6K6uJyxcbiAgICBuYXZpZ2F0aW9uU3R5bGU6ICdkZWZhdWx0J1xuICB9O1xuXG4gIGRhdGEgPSB7XG4gICAgc3JjOiAnaHR0cHM6Ly96dHdwLm5pbmVmcm9zdC5jb20vc3RhdGljL3NlY3JlY3kuaHRtbCdcbiAgfTtcblxuICBjb21wb25lbnRzID0ge307XG5cbiAgbWV0aG9kcyA9IHt9O1xuXG4gIGV2ZW50cyA9IHt9O1xuXG4gIHdhdGNoID0ge307XG5cbiAgY29tcHV0ZWQgPSB7fTtcblxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLnR5cGUgPT09ICdjb3B5cmlnaHQnKSB7XG4gICAgICAvLyB0aGlzLnNyYyA9ICcnO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gIH07XG5cbiAgb25TaG93KCkgeyB9O1xufVxuIl19