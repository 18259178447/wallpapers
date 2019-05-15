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

var Navbar = function(_wepy$component) {
    _inherits(Navbar, _wepy$component);
    function Navbar() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Navbar);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            color: {
                type: String,
                default: "#141414"
            },
            padding: {
                type: String,
                default: null
            },
            title: String
        }, _this.data = {
            height: "22px",
            marginHeight: 60,
            showPadding: false
        }, _this.methods = {
            back: function back() {
                _wepy2.default.navigateBack();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Navbar, [ {
        key: "getHeight",
        value: function getHeight() {
            this.height = this.$root.$parent.globalData.navHeight + "px";
            this.marginHeight = this.$root.$parent.globalData.navHeight + 46;
        }
    }, {
        key: "onLoad",
        value: function onLoad() {
            this.getHeight();
            this.showPadding = !!this.padding;
            this.$apply();
        }
    } ]);
    return Navbar;
}(_wepy2.default.component);

exports.default = Navbar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmJhci5qcyJdLCJuYW1lcyI6WyJOYXZiYXIiLCJwcm9wcyIsImNvbG9yIiwidHlwZSIsIlN0cmluZyIsImRlZmF1bHQiLCJwYWRkaW5nIiwidGl0bGUiLCJkYXRhIiwiaGVpZ2h0IiwibWFyZ2luSGVpZ2h0Iiwic2hvd1BhZGRpbmciLCJtZXRob2RzIiwiYmFjayIsIndlcHkiLCJuYXZpZ2F0ZUJhY2siLCIkcm9vdCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwibmF2SGVpZ2h0IiwiZ2V0SGVpZ2h0IiwiJGFwcGx5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLEssR0FBUTtBQUNOQyxhQUFPO0FBQ0xDLGNBQU1DLE1BREQ7QUFFTEMsaUJBQVM7QUFGSixPQUREO0FBS05DLGVBQVM7QUFDUEgsY0FBTUMsTUFEQztBQUVQQyxpQkFBUztBQUZGLE9BTEg7QUFTTkUsYUFBT0g7QUFURCxLLFFBWVJJLEksR0FBTztBQUNMQyxjQUFRLE1BREg7QUFFTEMsb0JBQWMsRUFGVDtBQUdMQyxtQkFBYTtBQUhSLEssUUFnQlBDLE8sR0FBVTtBQUNSQyxVQURRLGtCQUNEO0FBQ0xDLHVCQUFLQyxZQUFMO0FBQ0Q7QUFITyxLOzs7OztnQ0FWRTtBQUNWLFdBQUtOLE1BQUwsR0FBYyxLQUFLTyxLQUFMLENBQVdDLE9BQVgsQ0FBbUJDLFVBQW5CLENBQThCQyxTQUE5QixHQUEwQyxJQUF4RDtBQUNBLFdBQUtULFlBQUwsR0FBb0IsS0FBS00sS0FBTCxDQUFXQyxPQUFYLENBQW1CQyxVQUFuQixDQUE4QkMsU0FBOUIsR0FBMEMsRUFBOUQ7QUFDRDs7OzZCQUNRO0FBQ1AsV0FBS0MsU0FBTDtBQUNBLFdBQUtULFdBQUwsR0FBbUIsQ0FBQyxDQUFDLEtBQUtMLE9BQTFCO0FBQ0EsV0FBS2UsTUFBTDtBQUNEOzs7O0VBM0JpQ1AsZUFBS1EsUzs7a0JBQXBCdEIsTSIsImZpbGUiOiJuYXZiYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2YmFyIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICBwcm9wcyA9IHtcbiAgICBjb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJyMxNDE0MTQnXG4gICAgfSxcbiAgICBwYWRkaW5nOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICB0aXRsZTogU3RyaW5nXG4gIH07XG5cbiAgZGF0YSA9IHtcbiAgICBoZWlnaHQ6ICcyMnB4JyxcbiAgICBtYXJnaW5IZWlnaHQ6IDYwLFxuICAgIHNob3dQYWRkaW5nOiBmYWxzZVxuICB9O1xuXG4gIGdldEhlaWdodCgpIHtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuJHJvb3QuJHBhcmVudC5nbG9iYWxEYXRhLm5hdkhlaWdodCArICdweCc7XG4gICAgdGhpcy5tYXJnaW5IZWlnaHQgPSB0aGlzLiRyb290LiRwYXJlbnQuZ2xvYmFsRGF0YS5uYXZIZWlnaHQgKyA0NjtcbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdGhpcy5nZXRIZWlnaHQoKTtcbiAgICB0aGlzLnNob3dQYWRkaW5nID0gISF0aGlzLnBhZGRpbmc7XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxuXG4gIG1ldGhvZHMgPSB7XG4gICAgYmFjaygpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XG4gICAgfVxuICB9O1xufVxuIl19