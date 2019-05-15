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

var CollectionPage = function(_wepy$page) {
    _inherits(CollectionPage, _wepy$page);
    function CollectionPage() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, CollectionPage);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CollectionPage.__proto__ || Object.getPrototypeOf(CollectionPage)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {}, _this.data = {
            totalPages: 1,
            currentIndex: 1,
            size: 20,
            imgs: []
        }, _this.$repeat = {}, _this.$props = {
            navbar: {
                padding: "true",
                title: "我的收藏"
            },
            empty: {
                "xmlns:wx": ""
            },
            pager: {
                "xmlns:v-bind": "",
                "v-bind:total.sync": "totalPages",
                "v-bind:currentIndex.sync": "currentIndex",
                "xmlns:v-on": ""
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
            empty: _empty2.default,
            pager: _pager2.default,
            "picture-list": _pictureList2.default
        }, _this.methods = {
            pageChange: function pageChange(index, event) {
                this.currentIndex = index;
                this.fetchImgs();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(CollectionPage, [ {
        key: "fetchImgs",
        value: function fetchImgs() {
            var _this2 = this;
            if (this.currentIndex <= this.totalPages) {
                _api2.default.fetchCollection(this.currentIndex - 1, this.size).then(function(res) {
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
    return CollectionPage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(CollectionPage, "pages/my/my-collection"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LWNvbGxlY3Rpb24uanMiXSwibmFtZXMiOlsiQ29sbGVjdGlvblBhZ2UiLCJjb25maWciLCJkYXRhIiwidG90YWxQYWdlcyIsImN1cnJlbnRJbmRleCIsInNpemUiLCJpbWdzIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibmF2YmFyIiwiZW1wdHkiLCJwYWdlciIsInBpY3R1cmVMaXN0IiwibWV0aG9kcyIsInBhZ2VDaGFuZ2UiLCJpbmRleCIsImV2ZW50IiwiZmV0Y2hJbWdzIiwiYXBpIiwiZmV0Y2hDb2xsZWN0aW9uIiwidGhlbiIsInJlcyIsIndlcHkiLCJwYWdlU2Nyb2xsVG8iLCJzY3JvbGxUb3AiLCJkdXJhdGlvbiIsIiRhcHBseSIsImNvbnNvbGUiLCJlcnJvciIsImVyciIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7Ozs7Ozs7Ozs7OztzTUFDbkJDLE0sR0FBUyxFLFFBR1RDLEksR0FBTztBQUNMQyxrQkFBWSxDQURQO0FBRUxDLG9CQUFjLENBRlQ7QUFHTEMsWUFBTSxFQUhEO0FBSUxDLFlBQU07QUFKRCxLLFFBT1JDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxXQUFVLE1BQVgsRUFBa0IsU0FBUSxNQUExQixFQUFWLEVBQTRDLFNBQVEsRUFBQyxZQUFXLEVBQVosRUFBcEQsRUFBb0UsU0FBUSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHFCQUFvQixZQUF2QyxFQUFvRCw0QkFBMkIsY0FBL0UsRUFBOEYsY0FBYSxFQUEzRyxFQUE1RSxFQUEyTCxnQkFBZSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLG9CQUFtQixNQUF0QyxFQUExTSxFLFFBQ1RDLE8sR0FBVSxFQUFDLFNBQVEsRUFBQyxlQUFjLFlBQWYsRUFBVCxFLFFBQ1RDLFUsR0FBYTtBQUNWQyw4QkFEVTtBQUVWQyw0QkFGVTtBQUdWQyw0QkFIVTtBQUlWLHNCQUFnQkM7QUFKTixLLFFBT1pDLE8sR0FBVTtBQUNSQyxnQkFEUSxzQkFDR0MsS0FESCxFQUNVQyxLQURWLEVBQ2lCO0FBQ3ZCLGFBQUtkLFlBQUwsR0FBb0JhLEtBQXBCO0FBQ0EsYUFBS0UsU0FBTDtBQUNEO0FBSk8sSzs7Ozs7Z0NBT0U7QUFBQTs7QUFDVixVQUFJLEtBQUtmLFlBQUwsSUFBcUIsS0FBS0QsVUFBOUIsRUFBMEM7QUFDeENpQixzQkFBSUMsZUFBSixDQUFvQixLQUFLakIsWUFBTCxHQUFvQixDQUF4QyxFQUEyQyxLQUFLQyxJQUFoRCxFQUFzRGlCLElBQXRELENBQTJELGVBQU87QUFDaEUsaUJBQUtoQixJQUFMLEdBQVlpQixJQUFJakIsSUFBaEI7QUFDQSxpQkFBS0gsVUFBTCxHQUFrQm9CLElBQUlwQixVQUF0QjtBQUNBcUIseUJBQUtDLFlBQUwsQ0FBa0I7QUFDaEJDLHVCQUFXLENBREssRUFDRjtBQUNkQyxzQkFBVSxDQUZNLENBRUo7QUFGSSxXQUFsQjtBQUlBLGlCQUFLQyxNQUFMO0FBQ0QsU0FSRCxFQVFHLGVBQU87QUFDUkMsa0JBQVFDLEtBQVIsQ0FBY0MsR0FBZDtBQUNELFNBVkQ7QUFXRDtBQUNGOzs7OEJBRVM7QUFDUixXQUFLWixTQUFMO0FBQ0Q7Ozs7RUE5Q3lDSyxlQUFLUSxJOztrQkFBNUJoQyxjIiwiZmlsZSI6Im15LWNvbGxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IG5hdmJhciBmcm9tICcuLi8uLi9jb21wb25lbnRzL25hdmJhcic7XG5pbXBvcnQgcGljdHVyZUxpc3QgZnJvbSAnLi4vcGljdHVyZS9waWN0dXJlLWxpc3QnO1xuaW1wb3J0IHBhZ2VyIGZyb20gJy4uL3BpY3R1cmUvcGFnZXInO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcbmltcG9ydCBlbXB0eSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2VtcHR5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvblBhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gIH07XG5cbiAgZGF0YSA9IHtcbiAgICB0b3RhbFBhZ2VzOiAxLFxuICAgIGN1cnJlbnRJbmRleDogMSxcbiAgICBzaXplOiAyMCxcbiAgICBpbWdzOiBbXVxuICB9O1xuXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJuYXZiYXJcIjp7XCJwYWRkaW5nXCI6XCJ0cnVlXCIsXCJ0aXRsZVwiOlwi5oiR55qE5pS26JePXCJ9LFwiZW1wdHlcIjp7XCJ4bWxuczp3eFwiOlwiXCJ9LFwicGFnZXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnRvdGFsLnN5bmNcIjpcInRvdGFsUGFnZXNcIixcInYtYmluZDpjdXJyZW50SW5kZXguc3luY1wiOlwiY3VycmVudEluZGV4XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJwaWN0dXJlLWxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBpY3Muc3luY1wiOlwiaW1nc1wifX07XHJcbiRldmVudHMgPSB7XCJwYWdlclwiOntcInYtb246Y2hhbmdlXCI6XCJwYWdlQ2hhbmdlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgbmF2YmFyLFxuICAgIGVtcHR5LFxuICAgIHBhZ2VyLFxuICAgICdwaWN0dXJlLWxpc3QnOiBwaWN0dXJlTGlzdFxuICB9O1xuXG4gIG1ldGhvZHMgPSB7XG4gICAgcGFnZUNoYW5nZShpbmRleCwgZXZlbnQpIHtcbiAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICB0aGlzLmZldGNoSW1ncygpO1xuICAgIH1cbiAgfTtcblxuICBmZXRjaEltZ3MoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudEluZGV4IDw9IHRoaXMudG90YWxQYWdlcykge1xuICAgICAgYXBpLmZldGNoQ29sbGVjdGlvbih0aGlzLmN1cnJlbnRJbmRleCAtIDEsIHRoaXMuc2l6ZSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLmltZ3MgPSByZXMuaW1ncztcbiAgICAgICAgdGhpcy50b3RhbFBhZ2VzID0gcmVzLnRvdGFsUGFnZXM7XG4gICAgICAgIHdlcHkucGFnZVNjcm9sbFRvKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IDAsIC8vIOa7muWKqOWIsOmhtemdoueahOebruagh+S9jee9ru+8iOWNleS9jXB477yJLFxuICAgICAgICAgIGR1cmF0aW9uOiAwIC8vIOa7muWKqOWKqOeUu+eahOaXtumVv++8jOm7mOiupDMwMG1z77yM5Y2V5L2NIG1zLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uUmVhZHkoKSB7XG4gICAgdGhpcy5mZXRjaEltZ3MoKTtcbiAgfTtcbn1cbiJdfQ==