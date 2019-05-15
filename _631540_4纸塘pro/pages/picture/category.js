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

var _pictureList = require("./picture-list.js");

var _pictureList2 = _interopRequireDefault(_pictureList);

var _pager = require("./pager.js");

var _pager2 = _interopRequireDefault(_pager);

var _wallpaperApi = require("./../../api/wallpaper-api.js");

var _wallpaperApi2 = _interopRequireDefault(_wallpaperApi);

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

var CategoryPage = function(_wepy$page) {
    _inherits(CategoryPage, _wepy$page);
    function CategoryPage() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, CategoryPage);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CategoryPage.__proto__ || Object.getPrototypeOf(CategoryPage)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {}, _this.data = {
            categoryName: "分类",
            totalPages: 1,
            currentIndex: 1,
            size: 20,
            imgs: []
        }, _this.$repeat = {}, _this.$props = {
            navbar: {
                padding: "true",
                "xmlns:v-bind": "",
                "v-bind:title.sync": "categoryName"
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
            pager: _pager2.default,
            "picture-list": _pictureList2.default
        }, _this.methods = {
            pageChange: function pageChange(index, event) {
                this.currentIndex = index;
                this.fetchImgs();
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(CategoryPage, [ {
        key: "fetchImgs",
        value: function fetchImgs() {
            var _this2 = this;
            if (this.currentIndex <= this.totalPages) {
                _wallpaperApi2.default.fetchCategoryList(this.id, this.currentIndex - 1, this.size).then(function(res) {
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
        key: "onLoad",
        value: function onLoad(options) {
            this.id = options.id;
            this.categoryName = options.name;
        }
    }, {
        key: "onReady",
        value: function onReady() {
            this.fetchImgs();
        }
    } ]);
    return CategoryPage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(CategoryPage, "pages/picture/category"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5UGFnZSIsImNvbmZpZyIsImRhdGEiLCJjYXRlZ29yeU5hbWUiLCJ0b3RhbFBhZ2VzIiwiY3VycmVudEluZGV4Iiwic2l6ZSIsImltZ3MiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJuYXZiYXIiLCJwYWdlciIsInBpY3R1cmVMaXN0IiwibWV0aG9kcyIsInBhZ2VDaGFuZ2UiLCJpbmRleCIsImV2ZW50IiwiZmV0Y2hJbWdzIiwiZXZlbnRzIiwid2F0Y2giLCJjb21wdXRlZCIsImFwaSIsImZldGNoQ2F0ZWdvcnlMaXN0IiwiaWQiLCJ0aGVuIiwicmVzIiwid2VweSIsInBhZ2VTY3JvbGxUbyIsInNjcm9sbFRvcCIsImR1cmF0aW9uIiwiJGFwcGx5IiwiY29uc29sZSIsImVycm9yIiwiZXJyIiwib3B0aW9ucyIsIm5hbWUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFk7Ozs7Ozs7Ozs7Ozs7O2tNQUNuQkMsTSxHQUFTLEUsUUFHVEMsSSxHQUFPO0FBQ0xDLG9CQUFjLElBRFQ7QUFFTEMsa0JBQVksQ0FGUDtBQUdMQyxvQkFBYyxDQUhUO0FBSUxDLFlBQU0sRUFKRDtBQUtMQyxZQUFNO0FBTEQsSyxRQVFSQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsV0FBVSxNQUFYLEVBQWtCLGdCQUFlLEVBQWpDLEVBQW9DLHFCQUFvQixjQUF4RCxFQUFWLEVBQWtGLFNBQVEsRUFBQyxnQkFBZSxFQUFoQixFQUFtQixxQkFBb0IsWUFBdkMsRUFBb0QsNEJBQTJCLGNBQS9FLEVBQThGLGNBQWEsRUFBM0csRUFBMUYsRUFBeU0sZ0JBQWUsRUFBQyxnQkFBZSxFQUFoQixFQUFtQixvQkFBbUIsTUFBdEMsRUFBeE4sRSxRQUNUQyxPLEdBQVUsRUFBQyxTQUFRLEVBQUMsZUFBYyxZQUFmLEVBQVQsRSxRQUNUQyxVLEdBQWE7QUFDVkMsOEJBRFU7QUFFVkMsNEJBRlU7QUFHVixzQkFBZ0JDO0FBSE4sSyxRQU1aQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0dDLEtBREgsRUFDVUMsS0FEVixFQUNpQjtBQUN2QixhQUFLYixZQUFMLEdBQW9CWSxLQUFwQjtBQUNBLGFBQUtFLFNBQUw7QUFDRDtBQUpPLEssUUFPVkMsTSxHQUFTLEUsUUFFVEMsSyxHQUFRLEUsUUFFUkMsUSxHQUFXLEU7Ozs7O2dDQUVDO0FBQUE7O0FBQ1YsVUFBSSxLQUFLakIsWUFBTCxJQUFxQixLQUFLRCxVQUE5QixFQUEwQztBQUN4Q21CLCtCQUFJQyxpQkFBSixDQUFzQixLQUFLQyxFQUEzQixFQUErQixLQUFLcEIsWUFBTCxHQUFvQixDQUFuRCxFQUFzRCxLQUFLQyxJQUEzRCxFQUFpRW9CLElBQWpFLENBQXNFLGVBQU87QUFDM0UsaUJBQUtuQixJQUFMLEdBQVlvQixJQUFJcEIsSUFBaEI7QUFDQSxpQkFBS0gsVUFBTCxHQUFrQnVCLElBQUl2QixVQUF0QjtBQUNBd0IseUJBQUtDLFlBQUwsQ0FBa0I7QUFDaEJDLHVCQUFXLENBREssRUFDRjtBQUNkQyxzQkFBVSxDQUZNLENBRUo7QUFGSSxXQUFsQjtBQUlBLGlCQUFLQyxNQUFMO0FBQ0QsU0FSRCxFQVFHLGVBQU87QUFDUkMsa0JBQVFDLEtBQVIsQ0FBY0MsR0FBZDtBQUNELFNBVkQ7QUFXRDtBQUNGOzs7MkJBRU1DLE8sRUFBUztBQUNkLFdBQUtYLEVBQUwsR0FBVVcsUUFBUVgsRUFBbEI7QUFDQSxXQUFLdEIsWUFBTCxHQUFvQmlDLFFBQVFDLElBQTVCO0FBQ0Q7Ozs4QkFFUztBQUNSLFdBQUtsQixTQUFMO0FBQ0Q7Ozs7RUF6RHVDUyxlQUFLVSxJOztrQkFBMUJ0QyxZIiwiZmlsZSI6ImNhdGVnb3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9uYXZiYXInO1xuaW1wb3J0IHBpY3R1cmVMaXN0IGZyb20gJy4vcGljdHVyZS1saXN0JztcbmltcG9ydCBwYWdlciBmcm9tICcuL3BhZ2VyJztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL3dhbGxwYXBlci1hcGknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRlZ29yeVBhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gIH07XG5cbiAgZGF0YSA9IHtcbiAgICBjYXRlZ29yeU5hbWU6ICfliIbnsbsnLFxuICAgIHRvdGFsUGFnZXM6IDEsXG4gICAgY3VycmVudEluZGV4OiAxLFxuICAgIHNpemU6IDIwLFxuICAgIGltZ3M6IFtdXG4gIH07XG5cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIm5hdmJhclwiOntcInBhZGRpbmdcIjpcInRydWVcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6dGl0bGUuc3luY1wiOlwiY2F0ZWdvcnlOYW1lXCJ9LFwicGFnZXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnRvdGFsLnN5bmNcIjpcInRvdGFsUGFnZXNcIixcInYtYmluZDpjdXJyZW50SW5kZXguc3luY1wiOlwiY3VycmVudEluZGV4XCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJwaWN0dXJlLWxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBpY3Muc3luY1wiOlwiaW1nc1wifX07XHJcbiRldmVudHMgPSB7XCJwYWdlclwiOntcInYtb246Y2hhbmdlXCI6XCJwYWdlQ2hhbmdlXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgbmF2YmFyLFxuICAgIHBhZ2VyLFxuICAgICdwaWN0dXJlLWxpc3QnOiBwaWN0dXJlTGlzdFxuICB9O1xuXG4gIG1ldGhvZHMgPSB7XG4gICAgcGFnZUNoYW5nZShpbmRleCwgZXZlbnQpIHtcbiAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICB0aGlzLmZldGNoSW1ncygpO1xuICAgIH1cbiAgfTtcblxuICBldmVudHMgPSB7fTtcblxuICB3YXRjaCA9IHt9O1xuXG4gIGNvbXB1dGVkID0ge307XG5cbiAgZmV0Y2hJbWdzKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA8PSB0aGlzLnRvdGFsUGFnZXMpIHtcbiAgICAgIGFwaS5mZXRjaENhdGVnb3J5TGlzdCh0aGlzLmlkLCB0aGlzLmN1cnJlbnRJbmRleCAtIDEsIHRoaXMuc2l6ZSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLmltZ3MgPSByZXMuaW1ncztcbiAgICAgICAgdGhpcy50b3RhbFBhZ2VzID0gcmVzLnRvdGFsUGFnZXM7XG4gICAgICAgIHdlcHkucGFnZVNjcm9sbFRvKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IDAsIC8vIOa7muWKqOWIsOmhtemdoueahOebruagh+S9jee9ru+8iOWNleS9jXB477yJLFxuICAgICAgICAgIGR1cmF0aW9uOiAwIC8vIOa7muWKqOWKqOeUu+eahOaXtumVv++8jOm7mOiupDMwMG1z77yM5Y2V5L2NIG1zLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uTG9hZChvcHRpb25zKSB7XG4gICAgdGhpcy5pZCA9IG9wdGlvbnMuaWQ7XG4gICAgdGhpcy5jYXRlZ29yeU5hbWUgPSBvcHRpb25zLm5hbWU7XG4gIH07XG5cbiAgb25SZWFkeSgpIHtcbiAgICB0aGlzLmZldGNoSW1ncygpO1xuICB9O1xufVxuIl19