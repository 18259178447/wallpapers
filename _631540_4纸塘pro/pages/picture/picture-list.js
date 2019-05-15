Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = undefined;

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

var PictureListView = function(_wepy$component) {
    _inherits(PictureListView, _wepy$component);
    function PictureListView() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, PictureListView);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PictureListView.__proto__ || Object.getPrototypeOf(PictureListView)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            pics: Array,
            detail: {
                type: Boolean,
                default: true
            }
        }, _this.data = {}, _this.components = {}, _this.methods = {
            goDetail: function goDetail(id) {
                if (this.detail) {
                    _wepy2.default.navigateTo({
                        url: "/pages/detail/detail?id=" + id
                    });
                } else {
                    this.$emit("click", id);
                }
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(PictureListView, [ {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "onShow",
        value: function onShow() {}
    } ]);
    return PictureListView;
}(_wepy2.default.component);

exports.default = PictureListView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBpY3R1cmUtbGlzdC5qcyJdLCJuYW1lcyI6WyJQaWN0dXJlTGlzdFZpZXciLCJwcm9wcyIsInBpY3MiLCJBcnJheSIsImRldGFpbCIsInR5cGUiLCJCb29sZWFuIiwiZGVmYXVsdCIsImRhdGEiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsImdvRGV0YWlsIiwiaWQiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsIiRlbWl0IiwiZXZlbnRzIiwid2F0Y2giLCJjb21wdXRlZCIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsZTs7Ozs7Ozs7Ozs7Ozs7d01BQ25CQyxLLEdBQVE7QUFDTkMsWUFBTUMsS0FEQTtBQUVOQyxjQUFRO0FBQ05DLGNBQU1DLE9BREE7QUFFTkMsaUJBQVM7QUFGSDtBQUZGLEssUUFPUkMsSSxHQUFPLEUsUUFDUEMsVSxHQUFhLEUsUUFDYkMsTyxHQUFVO0FBQ1JDLGNBRFEsb0JBQ0NDLEVBREQsRUFDSztBQUNYLFlBQUksS0FBS1IsTUFBVCxFQUFpQjtBQUNmUyx5QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyw4Q0FBZ0NIO0FBRGxCLFdBQWhCO0FBR0QsU0FKRCxNQUlPO0FBQ0wsZUFBS0ksS0FBTCxDQUFXLE9BQVgsRUFBb0JKLEVBQXBCO0FBQ0Q7QUFDRjtBQVRPLEssUUFXVkssTSxHQUFTLEUsUUFDVEMsSyxHQUFRLEUsUUFDUkMsUSxHQUFXLEU7Ozs7OzZCQUNGLENBQUc7Ozs2QkFDSCxDQUFHOzs7O0VBekIrQk4sZUFBS08sUzs7a0JBQTdCcEIsZSIsImZpbGUiOiJwaWN0dXJlLWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGljdHVyZUxpc3RWaWV3IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBwaWNzOiBBcnJheSxcbiAgICBkZXRhaWw6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfVxuICB9O1xuICBkYXRhID0ge307XG4gIGNvbXBvbmVudHMgPSB7fTtcbiAgbWV0aG9kcyA9IHtcbiAgICBnb0RldGFpbChpZCkge1xuICAgICAgaWYgKHRoaXMuZGV0YWlsKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiBgL3BhZ2VzL2RldGFpbC9kZXRhaWw/aWQ9JHtpZH1gXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snLCBpZCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBldmVudHMgPSB7fTtcbiAgd2F0Y2ggPSB7fTtcbiAgY29tcHV0ZWQgPSB7fTtcbiAgb25Mb2FkKCkgeyB9O1xuICBvblNob3coKSB7IH07XG59XG4iXX0=