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

var Loading = function(_wepy$component) {
    _inherits(Loading, _wepy$component);
    function Loading() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Loading);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Loading.__proto__ || Object.getPrototypeOf(Loading)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            top: {
                type: Number,
                default: 100
            },
            width: {
                type: Number,
                default: 60
            },
            height: {
                type: Number,
                default: 60
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    return Loading;
}(_wepy2.default.component);

exports.default = Loading;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmcuanMiXSwibmFtZXMiOlsiTG9hZGluZyIsInByb3BzIiwidG9wIiwidHlwZSIsIk51bWJlciIsImRlZmF1bHQiLCJ3aWR0aCIsImhlaWdodCIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLEssR0FBUTtBQUNOQyxXQUFLO0FBQ0hDLGNBQU1DLE1BREg7QUFFSEMsaUJBQVM7QUFGTixPQURDO0FBS05DLGFBQU87QUFDTEgsY0FBTUMsTUFERDtBQUVMQyxpQkFBUztBQUZKLE9BTEQ7QUFTTkUsY0FBUTtBQUNOSixjQUFNQyxNQURBO0FBRU5DLGlCQUFTO0FBRkg7QUFURixLOzs7O0VBRDJCRyxlQUFLQyxTOztrQkFBckJULE8iLCJmaWxlIjoibG9hZGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICB0b3A6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDEwMFxuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDYwXG4gICAgfSxcbiAgICBoZWlnaHQ6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDYwXG4gICAgfVxuICB9O1xufVxuIl19