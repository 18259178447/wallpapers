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

var _pictureList = require("./../picture/picture-list.js");

var _pictureList2 = _interopRequireDefault(_pictureList);

var _pager = require("./../picture/pager.js");

var _pager2 = _interopRequireDefault(_pager);

var _api = require("./../../api/api.js");

var _api2 = _interopRequireDefault(_api);

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

var MyDownloadPage = function(_wepy$page) {
    _inherits(MyDownloadPage, _wepy$page);
    function MyDownloadPage() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, MyDownloadPage);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MyDownloadPage.__proto__ || Object.getPrototypeOf(MyDownloadPage)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {}, _this.data = {
            totalPages: 1,
            currentIndex: 1,
            size: 20,
            imgs: []
        }, _this.$repeat = {}, _this.$props = {
            navbar: {
                padding: "true",
                title: "近期下载"
            },
            pager: {
                "xmlns:v-bind": "",
                "v-bind:total.sync": "totalPages",
                "v-bind:currentIndex.sync": "currentIndex",
                "xmlns:v-on": ""
            },
            empty: {
                "xmlns:wx": ""
            },
            "picture-list": {
                "xmlns:v-bind": "",
                "v-bind:pics.sync": "imgs"
            }
        }, _this.$events = {
            pager: {
                "v-on:change": "pageChange"
            }
        }, _this.components = {
            navbar: _navbar2.default,
            pager: _pager2.default,
            empty: _empty2.default,
            "picture-list": _pictureList2.default
        }, _this.methods = {
            pageChange: function pageChange(index, event) {
                this.currentIndex = index;
                this.fetchImgs();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(MyDownloadPage, [ {
        key: "fetchImgs",
        value: function fetchImgs() {
            var _this2 = this;
            if (this.currentIndex <= this.totalPages) {
                _api2.default.fetchDownloads(this.currentIndex - 1, this.size).then(function(res) {
                    _this2.imgs = res.imgs;
                    _this2.totalPages = res.totalPages;
                    _wepy2.default.pageScrollTo({
                        scrollTop: 0,
                        // 滚动到页面的目标位置（单位px）,
                        duration: 0
                    });
                    _this2.$apply();
                }, function(err) {
                    console.error(err);
                });
            }
        }
    }, {
        key: "onReady",
        value: function onReady() {
            this.fetchImgs();
        }
    } ]);
    return MyDownloadPage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(MyDownloadPage, "pages/my/my-download"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LWRvd25sb2FkLmpzIl0sIm5hbWVzIjpbIk15RG93bmxvYWRQYWdlIiwiY29uZmlnIiwiZGF0YSIsInRvdGFsUGFnZXMiLCJjdXJyZW50SW5kZXgiLCJzaXplIiwiaW1ncyIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hdmJhciIsInBhZ2VyIiwiZW1wdHkiLCJwaWN0dXJlTGlzdCIsIm1ldGhvZHMiLCJwYWdlQ2hhbmdlIiwiaW5kZXgiLCJldmVudCIsImZldGNoSW1ncyIsImFwaSIsImZldGNoRG93bmxvYWRzIiwidGhlbiIsInJlcyIsIndlcHkiLCJwYWdlU2Nyb2xsVG8iLCJzY3JvbGxUb3AiLCJkdXJhdGlvbiIsIiRhcHBseSIsImNvbnNvbGUiLCJlcnJvciIsImVyciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7Ozs7Ozs7Ozs7OztzTUFDbkJDLE0sR0FBUyxFLFFBR1RDLEksR0FBTztBQUNMQyxrQkFBWSxDQURQO0FBRUxDLG9CQUFjLENBRlQ7QUFHTEMsWUFBTSxFQUhEO0FBSUxDLFlBQU07QUFKRCxLLFFBT1JDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxXQUFVLE1BQVgsRUFBa0IsU0FBUSxNQUExQixFQUFWLEVBQTRDLFNBQVEsRUFBQyxnQkFBZSxFQUFoQixFQUFtQixxQkFBb0IsWUFBdkMsRUFBb0QsNEJBQTJCLGNBQS9FLEVBQThGLGNBQWEsRUFBM0csRUFBcEQsRUFBbUssU0FBUSxFQUFDLFlBQVcsRUFBWixFQUEzSyxFQUEyTCxnQkFBZSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLG9CQUFtQixNQUF0QyxFQUExTSxFLFFBQ1RDLE8sR0FBVSxFQUFDLFNBQVEsRUFBQyxlQUFjLFlBQWYsRUFBVCxFLFFBQ1RDLFUsR0FBYTtBQUNWQyw4QkFEVTtBQUVWQyw0QkFGVTtBQUdWQyw0QkFIVTtBQUlWLHNCQUFnQkM7QUFKTixLLFFBT1pDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDR0MsS0FESCxFQUNVQyxLQURWLEVBQ2lCO0FBQ3ZCLGFBQUtkLFlBQUwsR0FBb0JhLEtBQXBCO0FBQ0EsYUFBS0UsU0FBTDtBQUNEO0FBSk8sSzs7Ozs7Z0NBT0U7QUFBQTs7QUFDVixVQUFJLEtBQUtmLFlBQUwsSUFBcUIsS0FBS0QsVUFBOUIsRUFBMEM7QUFDeENpQixzQkFBSUMsY0FBSixDQUFtQixLQUFLakIsWUFBTCxHQUFvQixDQUF2QyxFQUEwQyxLQUFLQyxJQUEvQyxFQUFxRGlCLElBQXJELENBQTBELGVBQU87QUFDL0QsaUJBQUtoQixJQUFMLEdBQVlpQixJQUFJakIsSUFBaEI7QUFDQSxpQkFBS0gsVUFBTCxHQUFrQm9CLElBQUlwQixVQUF0QjtBQUNBcUIseUJBQUtDLFlBQUwsQ0FBa0I7QUFDaEJDLHVCQUFXLENBREssRUFDRjtBQUNkQyxzQkFBVSxDQUZNLENBRUo7QUFGSSxXQUFsQjtBQUlBLGlCQUFLQyxNQUFMO0FBQ0QsU0FSRCxFQVFHLGVBQU87QUFDUkMsa0JBQVFDLEtBQVIsQ0FBY0MsR0FBZDtBQUNELFNBVkQ7QUFXRDtBQUNGOzs7OEJBRVM7QUFDUixXQUFLWixTQUFMO0FBQ0Q7Ozs7RUE5Q3lDSyxlQUFLUSxJOztrQkFBNUJoQyxjIiwiZmlsZSI6Im15LWRvd25sb2FkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9uYXZiYXInO1xuaW1wb3J0IHBpY3R1cmVMaXN0IGZyb20gJy4uL3BpY3R1cmUvcGljdHVyZS1saXN0JztcbmltcG9ydCBwYWdlciBmcm9tICcuLi9waWN0dXJlL3BhZ2VyJztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XG5pbXBvcnQgZW1wdHkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9lbXB0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15RG93bmxvYWRQYWdlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICB9O1xuXG4gIGRhdGEgPSB7XG4gICAgdG90YWxQYWdlczogMSxcbiAgICBjdXJyZW50SW5kZXg6IDEsXG4gICAgc2l6ZTogMjAsXG4gICAgaW1nczogW11cbiAgfTtcblxuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wibmF2YmFyXCI6e1wicGFkZGluZ1wiOlwidHJ1ZVwiLFwidGl0bGVcIjpcIui/keacn+S4i+i9vVwifSxcInBhZ2VyXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDp0b3RhbC5zeW5jXCI6XCJ0b3RhbFBhZ2VzXCIsXCJ2LWJpbmQ6Y3VycmVudEluZGV4LnN5bmNcIjpcImN1cnJlbnRJbmRleFwiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiZW1wdHlcIjp7XCJ4bWxuczp3eFwiOlwiXCJ9LFwicGljdHVyZS1saXN0XCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpwaWNzLnN5bmNcIjpcImltZ3NcIn19O1xyXG4kZXZlbnRzID0ge1wicGFnZXJcIjp7XCJ2LW9uOmNoYW5nZVwiOlwicGFnZUNoYW5nZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIG5hdmJhcixcbiAgICBwYWdlcixcbiAgICBlbXB0eSxcbiAgICAncGljdHVyZS1saXN0JzogcGljdHVyZUxpc3RcbiAgfTtcblxuICBtZXRob2RzID0ge1xuICAgIHBhZ2VDaGFuZ2UoaW5kZXgsIGV2ZW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgdGhpcy5mZXRjaEltZ3MoKTtcbiAgICB9XG4gIH07XG5cbiAgZmV0Y2hJbWdzKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA8PSB0aGlzLnRvdGFsUGFnZXMpIHtcbiAgICAgIGFwaS5mZXRjaERvd25sb2Fkcyh0aGlzLmN1cnJlbnRJbmRleCAtIDEsIHRoaXMuc2l6ZSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLmltZ3MgPSByZXMuaW1ncztcbiAgICAgICAgdGhpcy50b3RhbFBhZ2VzID0gcmVzLnRvdGFsUGFnZXM7XG4gICAgICAgIHdlcHkucGFnZVNjcm9sbFRvKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IDAsIC8vIOa7muWKqOWIsOmhtemdoueahOebruagh+S9jee9ru+8iOWNleS9jXB477yJLFxuICAgICAgICAgIGR1cmF0aW9uOiAwIC8vIOa7muWKqOWKqOeUu+eahOaXtumVv++8jOm7mOiupDMwMG1z77yM5Y2V5L2NIG1zLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uUmVhZHkoKSB7XG4gICAgdGhpcy5mZXRjaEltZ3MoKTtcbiAgfTtcbn1cbiJdfQ==