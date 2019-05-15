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

var _wepy = require("./../../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

var _listHeader = require("./../../components/list-header.js");

var _listHeader2 = _interopRequireDefault(_listHeader);

var _imgList = require("./../../components/img-list.js");

var _imgList2 = _interopRequireDefault(_imgList);

var _categoryList = require("./category-list.js");

var _categoryList2 = _interopRequireDefault(_categoryList);

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

var Discover = function(_wepy$component) {
    _inherits(Discover, _wepy$component);
    function Discover() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Discover);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Discover.__proto__ || Object.getPrototypeOf(Discover)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            user: Object
        }, _this.$repeat = {}, _this.$props = {
            likeHeader: {
                title: "我的关注",
                content: "查看关注列表",
                "xmlns:v-on": "",
                "xmlns:wx": ""
            },
            likeImg: {
                "xmlns:v-bind": "",
                "v-bind:imgs.sync": "likes",
                "v-bind:author.once": "author",
                "xmlns:wx": ""
            },
            category: {
                "xmlns:v-bind": "",
                "v-bind:imgs.sync": "categories"
            }
        }, _this.$events = {
            likeHeader: {
                "v-on:itemTap": "goLikes"
            }
        }, _this.components = {
            likeHeader: _listHeader2.default,
            likeImg: _imgList2.default,
            category: _categoryList2.default
        }, _this.data = {
            showTip: true,
            author: true,
            categories: [],
            likes: []
        }, _this.computed = {}, _this.methods = {
            search: function search() {
                this.$root.$navigate("../search/search");
            },
            closeTip: function closeTip() {
                this.showTip = false;
                _wepy2.default.setStorageSync("search", "off");
            },
            goLikes: function goLikes() {
                if (this.user) {
                    this.$root.$navigate("/pages/my/my-attention");
                } else {
                    this.$root.$navigate("/pages/login/login");
                }
            },
            login: function login() {
                this.$root.needRefresh = true;
                this.$root.$navigate("/pages/login/login");
            },
            reload: function reload() {
                this.loadData();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Discover, [ {
        key: "loadData",
        value: function loadData() {
            var _this2 = this;
            _wallpaperApi2.default.fetchDiscovery().then(function(res) {
                _this2.likes = res.likes;
                _this2.categories = res.categories;
                _this2.$apply();
            }, function(err) {
                console.log(err);
            });
        }
    }, {
        key: "onLoad",
        value: function onLoad() {
            try {
                var value = wx.getStorageSync("search");
                if (value) {
                    this.showTip = false;
                }
            } catch (e) {
                this.showTip = true;
            }
            this.$apply();
        }
    } ]);
    return Discover;
}(_wepy2.default.component);

exports.default = Discover;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc2NvdmVyeS5qcyJdLCJuYW1lcyI6WyJEaXNjb3ZlciIsInByb3BzIiwidXNlciIsIk9iamVjdCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImxpa2VIZWFkZXIiLCJoZWFkZXIiLCJsaWtlSW1nIiwiaW1nTGlzdCIsImNhdGVnb3J5IiwiZGF0YSIsInNob3dUaXAiLCJhdXRob3IiLCJjYXRlZ29yaWVzIiwibGlrZXMiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJzZWFyY2giLCIkcm9vdCIsIiRuYXZpZ2F0ZSIsImNsb3NlVGlwIiwid2VweSIsInNldFN0b3JhZ2VTeW5jIiwiZ29MaWtlcyIsImxvZ2luIiwibmVlZFJlZnJlc2giLCJyZWxvYWQiLCJsb2FkRGF0YSIsImFwaSIsImZldGNoRGlzY292ZXJ5IiwidGhlbiIsInJlcyIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJlcnIiLCJ2YWx1ZSIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsSyxHQUFRO0FBQ05DLFlBQU1DO0FBREEsSyxRQUdUQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxjQUFhLEVBQUMsU0FBUSxNQUFULEVBQWdCLFdBQVUsUUFBMUIsRUFBbUMsY0FBYSxFQUFoRCxFQUFtRCxZQUFXLEVBQTlELEVBQWQsRUFBZ0YsV0FBVSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLG9CQUFtQixPQUF0QyxFQUE4QyxzQkFBcUIsUUFBbkUsRUFBNEUsWUFBVyxFQUF2RixFQUExRixFQUFxTCxZQUFXLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsb0JBQW1CLFlBQXRDLEVBQWhNLEUsUUFDVEMsTyxHQUFVLEVBQUMsY0FBYSxFQUFDLGdCQUFlLFNBQWhCLEVBQWQsRSxRQUNUQyxVLEdBQWE7QUFDVkMsa0JBQVlDLG9CQURGO0FBRVZDLGVBQVNDLGlCQUZDO0FBR1ZDLGdCQUFVQTtBQUhBLEssUUFLWkMsSSxHQUFPO0FBQ0xDLGVBQVMsSUFESjtBQUVMQyxjQUFRLElBRkg7QUFHTEMsa0JBQVksRUFIUDtBQUlMQyxhQUFPO0FBSkYsSyxRQU1QQyxRLEdBQVcsRSxRQUNYQyxPLEdBQVU7QUFDUkMsWUFEUSxvQkFDQztBQUNQLGFBQUtDLEtBQUwsQ0FBV0MsU0FBWCxDQUFxQixrQkFBckI7QUFDRCxPQUhPO0FBSVJDLGNBSlEsc0JBSUc7QUFDVCxhQUFLVCxPQUFMLEdBQWUsS0FBZjtBQUNBVSx1QkFBS0MsY0FBTCxDQUFvQixRQUFwQixFQUE4QixLQUE5QjtBQUNELE9BUE87QUFRUkMsYUFSUSxxQkFRRTtBQUNSLFlBQUksS0FBS3hCLElBQVQsRUFBZTtBQUNiLGVBQUttQixLQUFMLENBQVdDLFNBQVgsQ0FBcUIsd0JBQXJCO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZUFBS0QsS0FBTCxDQUFXQyxTQUFYLENBQXFCLG9CQUFyQjtBQUNEO0FBQ0YsT0FkTztBQWVSSyxXQWZRLG1CQWVBO0FBQ04sYUFBS04sS0FBTCxDQUFXTyxXQUFYLEdBQXlCLElBQXpCO0FBQ0EsYUFBS1AsS0FBTCxDQUFXQyxTQUFYLENBQXFCLG9CQUFyQjtBQUNELE9BbEJPO0FBbUJSTyxZQW5CUSxvQkFtQkM7QUFDUCxhQUFLQyxRQUFMO0FBQ0Q7QUFyQk8sSzs7Ozs7K0JBdUJDO0FBQUE7O0FBQ1RDLDZCQUFJQyxjQUFKLEdBQXFCQyxJQUFyQixDQUEwQixlQUFPO0FBQy9CLGVBQUtoQixLQUFMLEdBQWFpQixJQUFJakIsS0FBakI7QUFDQSxlQUFLRCxVQUFMLEdBQWtCa0IsSUFBSWxCLFVBQXRCO0FBQ0EsZUFBS21CLE1BQUw7QUFDRCxPQUpELEVBSUcsZUFBTztBQUNSQyxnQkFBUUMsR0FBUixDQUFZQyxHQUFaO0FBQ0QsT0FORDtBQU9EOzs7NkJBQ1E7QUFDUCxVQUFJO0FBQ0YsWUFBSUMsUUFBUUMsR0FBR0MsY0FBSCxDQUFrQixRQUFsQixDQUFaO0FBQ0EsWUFBSUYsS0FBSixFQUFXO0FBQ1QsZUFBS3pCLE9BQUwsR0FBZSxLQUFmO0FBQ0Q7QUFDRixPQUxELENBS0UsT0FBTzRCLENBQVAsRUFBVTtBQUNWLGFBQUs1QixPQUFMLEdBQWUsSUFBZjtBQUNEO0FBQ0QsV0FBS3FCLE1BQUw7QUFDRDs7OztFQTdEbUNYLGVBQUttQixTOztrQkFBdEIzQyxRIiwiZmlsZSI6ImRpc2NvdmVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgaGVhZGVyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbGlzdC1oZWFkZXInO1xuaW1wb3J0IGltZ0xpc3QgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9pbWctbGlzdCc7XG5pbXBvcnQgY2F0ZWdvcnkgZnJvbSAnLi9jYXRlZ29yeS1saXN0JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL3dhbGxwYXBlci1hcGknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlzY292ZXIgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIHVzZXI6IE9iamVjdFxuICB9O1xuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wibGlrZUhlYWRlclwiOntcInRpdGxlXCI6XCLmiJHnmoTlhbPms6hcIixcImNvbnRlbnRcIjpcIuafpeeci+WFs+azqOWIl+ihqFwiLFwieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp3eFwiOlwiXCJ9LFwibGlrZUltZ1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6aW1ncy5zeW5jXCI6XCJsaWtlc1wiLFwidi1iaW5kOmF1dGhvci5vbmNlXCI6XCJhdXRob3JcIixcInhtbG5zOnd4XCI6XCJcIn0sXCJjYXRlZ29yeVwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6aW1ncy5zeW5jXCI6XCJjYXRlZ29yaWVzXCJ9fTtcclxuJGV2ZW50cyA9IHtcImxpa2VIZWFkZXJcIjp7XCJ2LW9uOml0ZW1UYXBcIjpcImdvTGlrZXNcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBsaWtlSGVhZGVyOiBoZWFkZXIsXG4gICAgbGlrZUltZzogaW1nTGlzdCxcbiAgICBjYXRlZ29yeTogY2F0ZWdvcnlcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICBzaG93VGlwOiB0cnVlLFxuICAgIGF1dGhvcjogdHJ1ZSxcbiAgICBjYXRlZ29yaWVzOiBbXSxcbiAgICBsaWtlczogW11cbiAgfTtcbiAgY29tcHV0ZWQgPSB7fTtcbiAgbWV0aG9kcyA9IHtcbiAgICBzZWFyY2goKSB7XG4gICAgICB0aGlzLiRyb290LiRuYXZpZ2F0ZSgnLi4vc2VhcmNoL3NlYXJjaCcpO1xuICAgIH0sXG4gICAgY2xvc2VUaXAoKSB7XG4gICAgICB0aGlzLnNob3dUaXAgPSBmYWxzZTtcbiAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ3NlYXJjaCcsICdvZmYnKTtcbiAgICB9LFxuICAgIGdvTGlrZXMoKSB7XG4gICAgICBpZiAodGhpcy51c2VyKSB7XG4gICAgICAgIHRoaXMuJHJvb3QuJG5hdmlnYXRlKCcvcGFnZXMvbXkvbXktYXR0ZW50aW9uJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRyb290LiRuYXZpZ2F0ZSgnL3BhZ2VzL2xvZ2luL2xvZ2luJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBsb2dpbigpIHtcbiAgICAgIHRoaXMuJHJvb3QubmVlZFJlZnJlc2ggPSB0cnVlO1xuICAgICAgdGhpcy4kcm9vdC4kbmF2aWdhdGUoJy9wYWdlcy9sb2dpbi9sb2dpbicpO1xuICAgIH0sXG4gICAgcmVsb2FkKCkge1xuICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgIH1cbiAgfTtcbiAgbG9hZERhdGEoKSB7XG4gICAgYXBpLmZldGNoRGlzY292ZXJ5KCkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5saWtlcyA9IHJlcy5saWtlcztcbiAgICAgIHRoaXMuY2F0ZWdvcmllcyA9IHJlcy5jYXRlZ29yaWVzO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9KTtcbiAgfVxuICBvbkxvYWQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB2YWx1ZSA9IHd4LmdldFN0b3JhZ2VTeW5jKCdzZWFyY2gnKTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnNob3dUaXAgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLnNob3dUaXAgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG59XG4iXX0=