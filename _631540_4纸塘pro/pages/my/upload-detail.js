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

var UploadDetail = function(_wepy$page) {
    _inherits(UploadDetail, _wepy$page);
    function UploadDetail() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, UploadDetail);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = UploadDetail.__proto__ || Object.getPrototypeOf(UploadDetail)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {}, _this.data = {
            image: null,
            statusHeight: 22
        }, _this.components = {}, _this.methods = {
            back: function back() {
                _wepy2.default.navigateBack({
                    delta: 1
                });
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(UploadDetail, [ {
        key: "onLoad",
        value: function onLoad(options, data) {
            this.statusHeight = this.$parent.globalData.navHeight;
            this.image = data.preload.pic;
        }
    }, {
        key: "onShow",
        value: function onShow() {}
    } ]);
    return UploadDetail;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(UploadDetail, "pages/my/upload-detail"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVwbG9hZC1kZXRhaWwuanMiXSwibmFtZXMiOlsiVXBsb2FkRGV0YWlsIiwiY29uZmlnIiwiZGF0YSIsImltYWdlIiwic3RhdHVzSGVpZ2h0IiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJiYWNrIiwid2VweSIsIm5hdmlnYXRlQmFjayIsImRlbHRhIiwiZXZlbnRzIiwid2F0Y2giLCJjb21wdXRlZCIsIm9wdGlvbnMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIm5hdkhlaWdodCIsInByZWxvYWQiLCJwaWMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxZOzs7Ozs7Ozs7Ozs7OztrTUFDbkJDLE0sR0FBUyxFLFFBQ1RDLEksR0FBTztBQUNMQyxhQUFPLElBREY7QUFFTEMsb0JBQWM7QUFGVCxLLFFBSVBDLFUsR0FBYSxFLFFBQ2JDLE8sR0FBVTtBQUNSQyxVQURRLGtCQUNEO0FBQ0xDLHVCQUFLQyxZQUFMLENBQWtCO0FBQ2hCQyxpQkFBTztBQURTLFNBQWxCO0FBR0Q7QUFMTyxLLFFBT1ZDLE0sR0FBUyxFLFFBQ1RDLEssR0FBUSxFLFFBQ1JDLFEsR0FBVyxFOzs7OzsyQkFDSkMsTyxFQUFTWixJLEVBQU07QUFDcEIsV0FBS0UsWUFBTCxHQUFvQixLQUFLVyxPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLFNBQTVDO0FBQ0EsV0FBS2QsS0FBTCxHQUFhRCxLQUFLZ0IsT0FBTCxDQUFhQyxHQUExQjtBQUNEOzs7NkJBQ1EsQ0FBRzs7OztFQXJCNEJYLGVBQUtZLEk7O2tCQUExQnBCLFkiLCJmaWxlIjoidXBsb2FkLWRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWREZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7fTtcbiAgZGF0YSA9IHtcbiAgICBpbWFnZTogbnVsbCxcbiAgICBzdGF0dXNIZWlnaHQ6IDIyXG4gIH07XG4gIGNvbXBvbmVudHMgPSB7fTtcbiAgbWV0aG9kcyA9IHtcbiAgICBiYWNrKCkge1xuICAgICAgd2VweS5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICBkZWx0YTogMVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBldmVudHMgPSB7fTtcbiAgd2F0Y2ggPSB7fTtcbiAgY29tcHV0ZWQgPSB7fTtcbiAgb25Mb2FkKG9wdGlvbnMsIGRhdGEpIHtcbiAgICB0aGlzLnN0YXR1c0hlaWdodCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLm5hdkhlaWdodDtcbiAgICB0aGlzLmltYWdlID0gZGF0YS5wcmVsb2FkLnBpYztcbiAgfTtcbiAgb25TaG93KCkgeyB9O1xufVxuIl19