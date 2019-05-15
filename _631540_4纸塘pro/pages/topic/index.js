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

var _wallpaperApi = require("./../../api/wallpaper-api.js");

var _wallpaperApi2 = _interopRequireDefault(_wallpaperApi);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
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

var TopicPage = function(_wepy$page) {
    _inherits(TopicPage, _wepy$page);
    function TopicPage() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, TopicPage);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TopicPage.__proto__ || Object.getPrototypeOf(TopicPage)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {}, _this.data = {
            totalPages: 1,
            index: 0,
            size: 12,
            topics: [],
            loading: false
        }, _this.$repeat = {}, _this.$props = {
            navbar: {
                padding: "true",
                title: "专题"
            }
        }, _this.$events = {}, _this.components = {
            navbar: _navbar2.default
        }, _this.methods = {
            goDetail: function goDetail(index) {
                _wepy2.default.navigateTo({
                    url: "/pages/topic/topic?id=" + this.topics[index].id
                });
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(TopicPage, [ {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "onReady",
        value: function onReady() {
            this.fetchTopics();
        }
    }, {
        key: "fetchTopics",
        value: function fetchTopics() {
            var _this2 = this;
            if (!this.loading && this.index < this.totalPages) {
                this.loading = true;
                _wallpaperApi2.default.fetchTopics(this.index, this.size).then(function(res) {
                    var _topics;
                    _this2.index++;
                    _this2.loading = false;
                    (_topics = _this2.topics).push.apply(_topics, _toConsumableArray(res.topics));
                    _this2.totalPages = res.totalPages;
                    _this2.$apply();
                });
            }
        }
    }, {
        key: "onReachBottom",
        value: function onReachBottom() {
            this.fetchTopics();
        }
    } ]);
    return TopicPage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(TopicPage, "pages/topic/index"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlRvcGljUGFnZSIsImNvbmZpZyIsImRhdGEiLCJ0b3RhbFBhZ2VzIiwiaW5kZXgiLCJzaXplIiwidG9waWNzIiwibG9hZGluZyIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hdmJhciIsIm1ldGhvZHMiLCJnb0RldGFpbCIsIndlcHkiLCJuYXZpZ2F0ZVRvIiwidXJsIiwiaWQiLCJldmVudHMiLCJ3YXRjaCIsImNvbXB1dGVkIiwiZmV0Y2hUb3BpY3MiLCJhcGkiLCJ0aGVuIiwicHVzaCIsInJlcyIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUNuQkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGtCQUFZLENBRFA7QUFFTEMsYUFBTyxDQUZGO0FBR0xDLFlBQU0sRUFIRDtBQUlMQyxjQUFRLEVBSkg7QUFLTEMsZUFBUztBQUxKLEssUUFPUkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLFdBQVUsTUFBWCxFQUFrQixTQUFRLElBQTFCLEVBQVYsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkM7QUFEVSxLLFFBR1pDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNDVixLQURELEVBQ1E7QUFDZFcsdUJBQUtDLFVBQUwsQ0FBZ0IsRUFBRUMsZ0NBQThCLEtBQUtYLE1BQUwsQ0FBWUYsS0FBWixFQUFtQmMsRUFBbkQsRUFBaEI7QUFDRDtBQUhPLEssUUFLVkMsTSxHQUFTLEUsUUFDVEMsSyxHQUFRLEUsUUFDUkMsUSxHQUFXLEU7Ozs7OzZCQUNGLENBQUc7Ozs4QkFDRjtBQUNSLFdBQUtDLFdBQUw7QUFDRDs7O2tDQUVhO0FBQUE7O0FBQ1osVUFBSSxDQUFDLEtBQUtmLE9BQU4sSUFBaUIsS0FBS0gsS0FBTCxHQUFhLEtBQUtELFVBQXZDLEVBQW1EO0FBQ2pELGFBQUtJLE9BQUwsR0FBZSxJQUFmO0FBQ0FnQiwrQkFBSUQsV0FBSixDQUFnQixLQUFLbEIsS0FBckIsRUFBNEIsS0FBS0MsSUFBakMsRUFBdUNtQixJQUF2QyxDQUE0QyxlQUFPO0FBQUE7O0FBQ2pELGlCQUFLcEIsS0FBTDtBQUNBLGlCQUFLRyxPQUFMLEdBQWUsS0FBZjtBQUNBLDRCQUFLRCxNQUFMLEVBQVltQixJQUFaLG1DQUNLQyxJQUFJcEIsTUFEVDtBQUdBLGlCQUFLSCxVQUFMLEdBQWtCdUIsSUFBSXZCLFVBQXRCO0FBQ0EsaUJBQUt3QixNQUFMO0FBQ0QsU0FSRDtBQVNEO0FBQ0Y7OztvQ0FFZTtBQUNkLFdBQUtMLFdBQUw7QUFDRDs7OztFQTlDb0NQLGVBQUthLEk7O2tCQUF2QjVCLFMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IG5hdmJhciBmcm9tICcuLi8uLi9jb21wb25lbnRzL25hdmJhcic7XG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL2FwaS93YWxscGFwZXItYXBpJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvcGljUGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICB0b3RhbFBhZ2VzOiAxLFxuICAgIGluZGV4OiAwLFxuICAgIHNpemU6IDEyLFxuICAgIHRvcGljczogW10sXG4gICAgbG9hZGluZzogZmFsc2VcbiAgfTtcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIm5hdmJhclwiOntcInBhZGRpbmdcIjpcInRydWVcIixcInRpdGxlXCI6XCLkuJPpophcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIG5hdmJhclxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIGdvRGV0YWlsKGluZGV4KSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oeyB1cmw6IGAvcGFnZXMvdG9waWMvdG9waWM/aWQ9JHt0aGlzLnRvcGljc1tpbmRleF0uaWR9YCB9KTtcbiAgICB9XG4gIH07XG4gIGV2ZW50cyA9IHt9O1xuICB3YXRjaCA9IHt9O1xuICBjb21wdXRlZCA9IHt9O1xuICBvbkxvYWQoKSB7IH07XG4gIG9uUmVhZHkoKSB7XG4gICAgdGhpcy5mZXRjaFRvcGljcygpO1xuICB9O1xuXG4gIGZldGNoVG9waWNzKCkge1xuICAgIGlmICghdGhpcy5sb2FkaW5nICYmIHRoaXMuaW5kZXggPCB0aGlzLnRvdGFsUGFnZXMpIHtcbiAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICBhcGkuZmV0Y2hUb3BpY3ModGhpcy5pbmRleCwgdGhpcy5zaXplKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG9waWNzLnB1c2goXG4gICAgICAgICAgLi4ucmVzLnRvcGljc1xuICAgICAgICApO1xuICAgICAgICB0aGlzLnRvdGFsUGFnZXMgPSByZXMudG90YWxQYWdlcztcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgdGhpcy5mZXRjaFRvcGljcygpO1xuICB9O1xufVxuIl19