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

var ListHeader = function(_wepy$component) {
    _inherits(ListHeader, _wepy$component);
    function ListHeader() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, ListHeader);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ListHeader.__proto__ || Object.getPrototypeOf(ListHeader)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            title: String,
            subTitle: String,
            fontSize: {
                type: String,
                default: "16px"
            },
            content: String,
            id: String
        }, _this.data = {}, _this.methods = {
            itemTap: function itemTap() {
                this.$emit("itemTap");
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    return ListHeader;
}(_wepy2.default.component);

exports.default = ListHeader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QtaGVhZGVyLmpzIl0sIm5hbWVzIjpbIkxpc3RIZWFkZXIiLCJwcm9wcyIsInRpdGxlIiwiU3RyaW5nIiwic3ViVGl0bGUiLCJmb250U2l6ZSIsInR5cGUiLCJkZWZhdWx0IiwiY29udGVudCIsImlkIiwiZGF0YSIsIm1ldGhvZHMiLCJpdGVtVGFwIiwiJGVtaXQiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxLLEdBQVE7QUFDTkMsYUFBT0MsTUFERDtBQUVOQyxnQkFBVUQsTUFGSjtBQUdORSxnQkFBVTtBQUNSQyxjQUFNSCxNQURFO0FBRVJJLGlCQUFTO0FBRkQsT0FISjtBQU9OQyxlQUFTTCxNQVBIO0FBUU5NLFVBQUlOO0FBUkUsSyxRQVdSTyxJLEdBQU8sRSxRQUVQQyxPLEdBQVU7QUFDUkMsYUFEUSxxQkFDRTtBQUNSLGFBQUtDLEtBQUwsQ0FBVyxTQUFYO0FBQ0Q7QUFITyxLOzs7O0VBZDRCQyxlQUFLQyxTOztrQkFBeEJmLFUiLCJmaWxlIjoibGlzdC1oZWFkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdEhlYWRlciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgdGl0bGU6IFN0cmluZyxcbiAgICBzdWJUaXRsZTogU3RyaW5nLFxuICAgIGZvbnRTaXplOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnMTZweCdcbiAgICB9LFxuICAgIGNvbnRlbnQ6IFN0cmluZyxcbiAgICBpZDogU3RyaW5nXG4gIH07XG5cbiAgZGF0YSA9IHt9O1xuXG4gIG1ldGhvZHMgPSB7XG4gICAgaXRlbVRhcCgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2l0ZW1UYXAnKTtcbiAgICB9XG4gIH07XG59XG4iXX0=