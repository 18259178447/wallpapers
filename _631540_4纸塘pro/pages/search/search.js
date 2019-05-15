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

var _empty = require("./../../components/empty.js");

var _empty2 = _interopRequireDefault(_empty);

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
            navigationBarTitleText: "搜索",
            disableScroll: true,
            backgroundColor: "#101010"
        }, _this.data = {
            result: null,
            search: false,
            searchValue: ""
        }, _this.$repeat = {}, _this.$props = {
            navbar: {
                padding: "true",
                title: "搜索"
            }
        }, _this.$events = {}, _this.components = {
            navbar: _navbar2.default,
            empty: _empty2.default
        }, _this.methods = {
            search: function search(event) {
                var _this2 = this;
                this.searchValue = event.detail.value;
                if (this.searchValue) {
                    this.search = true;
                    _wallpaperApi2.default.search(this.searchValue).then(function(res) {
                        _this2.result = res;
                        _this2.$apply();
                    }, function(err) {
                        console.log(err);
                    });
                }
            },
            input: function input(event) {
                this.searchValue = event.detail.value;
            },
            clearContent: function clearContent() {
                this.searchValue = "";
            },
            goDetail: function goDetail() {
                _wepy2.default.navigateTo({
                    url: "/pages/detail/detail?id=" + this.result.id
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Example, [ {
        key: "onLoad",
        value: function onLoad() {
            // this.navHeight = this.$parent.globalData.navHeight;
            // this.$apply();
        }
    }, {
        key: "onShow",
        value: function onShow() {}
    } ]);
    return Example;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Example, "pages/search/search"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJFeGFtcGxlIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRpc2FibGVTY3JvbGwiLCJiYWNrZ3JvdW5kQ29sb3IiLCJkYXRhIiwicmVzdWx0Iiwic2VhcmNoIiwic2VhcmNoVmFsdWUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJuYXZiYXIiLCJlbXB0eSIsIm1ldGhvZHMiLCJldmVudCIsImRldGFpbCIsInZhbHVlIiwiYXBpIiwidGhlbiIsInJlcyIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJlcnIiLCJpbnB1dCIsImNsZWFyQ29udGVudCIsImdvRGV0YWlsIiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJpZCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQQyxxQkFBZSxJQUZSO0FBR1BDLHVCQUFpQjtBQUhWLEssUUFLVEMsSSxHQUFPO0FBQ0xDLGNBQVEsSUFESDtBQUVMQyxjQUFRLEtBRkg7QUFHTEMsbUJBQWE7QUFIUixLLFFBS1JDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxXQUFVLE1BQVgsRUFBa0IsU0FBUSxJQUExQixFQUFWLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1ZDLDhCQURVO0FBRVZDO0FBRlUsSyxRQUlaQyxPLEdBQVU7QUFDUlIsWUFEUSxrQkFDRFMsS0FEQyxFQUNNO0FBQUE7O0FBQ1osYUFBS1IsV0FBTCxHQUFtQlEsTUFBTUMsTUFBTixDQUFhQyxLQUFoQztBQUNBLFlBQUksS0FBS1YsV0FBVCxFQUFzQjtBQUNwQixlQUFLRCxNQUFMLEdBQWMsSUFBZDtBQUNBWSxpQ0FBSVosTUFBSixDQUFXLEtBQUtDLFdBQWhCLEVBQTZCWSxJQUE3QixDQUFrQyxlQUFPO0FBQ3ZDLG1CQUFLZCxNQUFMLEdBQWNlLEdBQWQ7QUFDQSxtQkFBS0MsTUFBTDtBQUNELFdBSEQsRUFHRyxlQUFPO0FBQ1JDLG9CQUFRQyxHQUFSLENBQVlDLEdBQVo7QUFDRCxXQUxEO0FBTUQ7QUFDRixPQVpPO0FBYVJDLFdBYlEsaUJBYUZWLEtBYkUsRUFhSztBQUNYLGFBQUtSLFdBQUwsR0FBbUJRLE1BQU1DLE1BQU4sQ0FBYUMsS0FBaEM7QUFDRCxPQWZPO0FBZ0JSUyxrQkFoQlEsMEJBZ0JPO0FBQ2IsYUFBS25CLFdBQUwsR0FBbUIsRUFBbkI7QUFDRCxPQWxCTztBQW1CUm9CLGNBbkJRLHNCQW1CRztBQUNUQyx1QkFBS0MsVUFBTCxDQUFnQixFQUFFQyxrQ0FBZ0MsS0FBS3pCLE1BQUwsQ0FBWTBCLEVBQTlDLEVBQWhCO0FBQ0Q7QUFyQk8sSzs7Ozs7NkJBdUJEO0FBQ1A7QUFDQTtBQUNEOzs7NkJBQ1EsQ0FBRzs7OztFQTdDdUJILGVBQUtJLEk7O2tCQUFyQmpDLE8iLCJmaWxlIjoic2VhcmNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9uYXZiYXInO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvd2FsbHBhcGVyLWFwaSc7XG5pbXBvcnQgZW1wdHkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9lbXB0eSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeGFtcGxlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmkJzntKInLFxuICAgIGRpc2FibGVTY3JvbGw6IHRydWUsXG4gICAgYmFja2dyb3VuZENvbG9yOiAnIzEwMTAxMCdcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICByZXN1bHQ6IG51bGwsXG4gICAgc2VhcmNoOiBmYWxzZSxcbiAgICBzZWFyY2hWYWx1ZTogJydcbiAgfTtcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIm5hdmJhclwiOntcInBhZGRpbmdcIjpcInRydWVcIixcInRpdGxlXCI6XCLmkJzntKJcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIG5hdmJhcixcbiAgICBlbXB0eVxuICB9O1xuICBtZXRob2RzID0ge1xuICAgIHNlYXJjaChldmVudCkge1xuICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9IGV2ZW50LmRldGFpbC52YWx1ZTtcbiAgICAgIGlmICh0aGlzLnNlYXJjaFZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoID0gdHJ1ZTtcbiAgICAgICAgYXBpLnNlYXJjaCh0aGlzLnNlYXJjaFZhbHVlKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5yZXN1bHQgPSByZXM7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGlucHV0KGV2ZW50KSB7XG4gICAgICB0aGlzLnNlYXJjaFZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlO1xuICAgIH0sXG4gICAgY2xlYXJDb250ZW50KCkge1xuICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICcnO1xuICAgIH0sXG4gICAgZ29EZXRhaWwoKSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oeyB1cmw6IGAvcGFnZXMvZGV0YWlsL2RldGFpbD9pZD0ke3RoaXMucmVzdWx0LmlkfWAgfSk7XG4gICAgfVxuICB9O1xuICBvbkxvYWQoKSB7XG4gICAgLy8gdGhpcy5uYXZIZWlnaHQgPSB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5uYXZIZWlnaHQ7XG4gICAgLy8gdGhpcy4kYXBwbHkoKTtcbiAgfTtcbiAgb25TaG93KCkgeyB9O1xufVxuIl19