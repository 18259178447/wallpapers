Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = undefined;

var _wepy = require("./../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

var _image = require("./../mixins/image.js");

var _image2 = _interopRequireDefault(_image);

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

var ImgList = function(_wepy$component) {
    _inherits(ImgList, _wepy$component);
    function ImgList() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, ImgList);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ImgList.__proto__ || Object.getPrototypeOf(ImgList)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            imgs: {
                type: Array,
                default: []
            },
            type: {
                type: String,
                default: "normal"
            },
            author: {
                type: Boolean,
                default: false
            }
        }, _this.mixins = [ _image2.default ], _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    return ImgList;
}(_wepy2.default.component);

exports.default = ImgList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltZy1saXN0LmpzIl0sIm5hbWVzIjpbIkltZ0xpc3QiLCJwcm9wcyIsImltZ3MiLCJ0eXBlIiwiQXJyYXkiLCJkZWZhdWx0IiwiU3RyaW5nIiwiYXV0aG9yIiwiQm9vbGVhbiIsIm1peGlucyIsIkltYWdlU2hvd01peGluIiwibWV0aG9kcyIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSyxHQUFRO0FBQ05DLFlBQU07QUFDSkMsY0FBTUMsS0FERjtBQUVKQyxpQkFBUztBQUZMLE9BREE7QUFLTkYsWUFBTTtBQUNKQSxjQUFNRyxNQURGO0FBRUpELGlCQUFTO0FBRkwsT0FMQTtBQVNORSxjQUFRO0FBQ05KLGNBQU1LLE9BREE7QUFFTkgsaUJBQVM7QUFGSDtBQVRGLEssUUFlUkksTSxHQUFTLENBQUNDLGVBQUQsQyxRQUVUQyxPLEdBQVUsRTs7OztFQWxCeUJDLGVBQUtDLFM7O2tCQUFyQmIsTyIsImZpbGUiOiJpbWctbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgSW1hZ2VTaG93TWl4aW4gZnJvbSAnLi4vbWl4aW5zL2ltYWdlJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEltZ0xpc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIGltZ3M6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogW11cbiAgICB9LFxuICAgIHR5cGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdub3JtYWwnXG4gICAgfSxcbiAgICBhdXRob3I6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH1cbiAgfTtcblxuICBtaXhpbnMgPSBbSW1hZ2VTaG93TWl4aW5dO1xuXG4gIG1ldGhvZHMgPSB7fVxufVxuIl19