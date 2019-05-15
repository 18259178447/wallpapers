Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = undefined;

var _wepy = require("./../npm/wepy/lib/wepy.js");

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

var BackMixin = function(_wepy$mixin) {
    _inherits(BackMixin, _wepy$mixin);
    function BackMixin() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, BackMixin);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BackMixin.__proto__ || Object.getPrototypeOf(BackMixin)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.methods = {
            back: function back() {
                if (this.getCurrentPages().length === 1) {
                    this.$redirect({
                        url: "/pages/home/index"
                    });
                } else {
                    _wepy2.default.navigateBack();
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    return BackMixin;
}(_wepy2.default.mixin);

exports.default = BackMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhY2suanMiXSwibmFtZXMiOlsiQmFja01peGluIiwibWV0aG9kcyIsImJhY2siLCJnZXRDdXJyZW50UGFnZXMiLCJsZW5ndGgiLCIkcmVkaXJlY3QiLCJ1cmwiLCJ3ZXB5IiwibmF2aWdhdGVCYWNrIiwibWl4aW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE8sR0FBVTtBQUNSQyxVQURRLGtCQUNEO0FBQ0wsWUFBSSxLQUFLQyxlQUFMLEdBQXVCQyxNQUF2QixLQUFrQyxDQUF0QyxFQUF5QztBQUN2QyxlQUFLQyxTQUFMLENBQWUsRUFBRUMsS0FBSyxtQkFBUCxFQUFmO0FBQ0QsU0FGRCxNQUVPO0FBQ0xDLHlCQUFLQyxZQUFMO0FBQ0Q7QUFDRjtBQVBPLEs7Ozs7RUFEMkJELGVBQUtFLEs7O2tCQUF2QlQsUyIsImZpbGUiOiJiYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tNaXhpbiBleHRlbmRzIHdlcHkubWl4aW4ge1xuICBtZXRob2RzID0ge1xuICAgIGJhY2soKSB7XG4gICAgICBpZiAodGhpcy5nZXRDdXJyZW50UGFnZXMoKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGhpcy4kcmVkaXJlY3QoeyB1cmw6ICcvcGFnZXMvaG9tZS9pbmRleCcgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSJdfQ==