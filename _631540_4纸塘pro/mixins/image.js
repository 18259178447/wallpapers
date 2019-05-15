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

var ImageShowMixin = function(_wepy$mixin) {
    _inherits(ImageShowMixin, _wepy$mixin);
    function ImageShowMixin() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, ImageShowMixin);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ImageShowMixin.__proto__ || Object.getPrototypeOf(ImageShowMixin)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.methods = {
            error: function error(index) {
                this.imgs[index].loaded = true;
            },
            goPerson: function goPerson(img) {
                _wepy2.default.navigateTo({
                    url: "/pages/person/index?id=" + img.authorId
                });
            },
            detail: function detail(id) {
                if (this.type === "topic") {
                    _wepy2.default.navigateTo({
                        url: "/pages/topic/topic?id=" + id
                    });
                } else {
                    _wepy2.default.navigateTo({
                        url: "/pages/detail/detail?id=" + id
                    });
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    return ImageShowMixin;
}(_wepy2.default.mixin);

exports.default = ImageShowMixin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImltYWdlLmpzIl0sIm5hbWVzIjpbIkltYWdlU2hvd01peGluIiwibWV0aG9kcyIsImVycm9yIiwiaW5kZXgiLCJpbWdzIiwibG9hZGVkIiwiZ29QZXJzb24iLCJpbWciLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsImF1dGhvcklkIiwiZGV0YWlsIiwiaWQiLCJ0eXBlIiwibWl4aW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7Ozs7Ozs7Ozs7OztzTUFDbkJDLE8sR0FBVTtBQUNSQyxXQURRLGlCQUNGQyxLQURFLEVBQ0s7QUFDWCxhQUFLQyxJQUFMLENBQVVELEtBQVYsRUFBaUJFLE1BQWpCLEdBQTBCLElBQTFCO0FBQ0QsT0FITztBQUlSQyxjQUpRLG9CQUlDQyxHQUpELEVBSU07QUFDWkMsdUJBQUtDLFVBQUwsQ0FBZ0IsRUFBRUMsaUNBQStCSCxJQUFJSSxRQUFyQyxFQUFoQjtBQUNELE9BTk87QUFPUkMsWUFQUSxrQkFPREMsRUFQQyxFQU9HO0FBQ1QsWUFBSSxLQUFLQyxJQUFMLEtBQWMsT0FBbEIsRUFBMkI7QUFDekJOLHlCQUFLQyxVQUFMLENBQWdCLEVBQUVDLGdDQUE4QkcsRUFBaEMsRUFBaEI7QUFDRCxTQUZELE1BRU87QUFDTEwseUJBQUtDLFVBQUwsQ0FBZ0IsRUFBRUMsa0NBQWdDRyxFQUFsQyxFQUFoQjtBQUNEO0FBQ0Y7QUFiTyxLOzs7O0VBRGdDTCxlQUFLTyxLOztrQkFBNUJmLGMiLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2VTaG93TWl4aW4gZXh0ZW5kcyB3ZXB5Lm1peGluIHtcbiAgbWV0aG9kcyA9IHtcbiAgICBlcnJvcihpbmRleCkge1xuICAgICAgdGhpcy5pbWdzW2luZGV4XS5sb2FkZWQgPSB0cnVlO1xuICAgIH0sXG4gICAgZ29QZXJzb24oaW1nKSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oeyB1cmw6IGAvcGFnZXMvcGVyc29uL2luZGV4P2lkPSR7aW1nLmF1dGhvcklkfWAgfSk7XG4gICAgfSxcbiAgICBkZXRhaWwoaWQpIHtcbiAgICAgIGlmICh0aGlzLnR5cGUgPT09ICd0b3BpYycpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHsgdXJsOiBgL3BhZ2VzL3RvcGljL3RvcGljP2lkPSR7aWR9YCB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7IHVybDogYC9wYWdlcy9kZXRhaWwvZGV0YWlsP2lkPSR7aWR9YCB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iXX0=