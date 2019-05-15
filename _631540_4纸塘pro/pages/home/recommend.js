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

var _wallpaperApi = require("./../../api/wallpaper-api.js");

var _wallpaperApi2 = _interopRequireDefault(_wallpaperApi);

var _loading = require("./../../components/loading.js");

var _loading2 = _interopRequireDefault(_loading);

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

// import dateUtil from '../../utils/date.js';
var Recommend = function(_wepy$component) {
    _inherits(Recommend, _wepy$component);
    function Recommend() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Recommend);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Recommend.__proto__ || Object.getPrototypeOf(Recommend)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {}, _this.$repeat = {}, _this.$props = {
            choiceHeader: {
                title: "今日精选",
                "xmlns:wx": ""
            },
            topicHeader: {
                title: "推荐专题",
                content: "全部专题",
                "xmlns:wx": "",
                "xmlns:v-on": ""
            },
            todayImg: {
                "xmlns:v-bind": "",
                "v-bind:imgs.sync": "today",
                type: "big"
            },
            topicImg: {
                "xmlns:v-bind": "",
                "v-bind:imgs.sync": "topics",
                type: "topic"
            },
            newHeader: {
                title: "最新壁纸",
                content: "全部壁纸",
                "xmlns:v-on": "",
                "xmlns:wx": ""
            },
            newImg: {
                "xmlns:v-bind": "",
                "v-bind:imgs.sync": "nImgs"
            },
            downloadHeader: {
                title: "近期下载",
                content: "全部壁纸",
                "xmlns:v-on": "",
                "xmlns:wx": ""
            },
            downloadImg: {
                "xmlns:v-bind": "",
                "v-bind:imgs.sync": "downloadImgs"
            },
            recommendHeader: {
                title: "猜你喜欢",
                content: "换一批",
                "xmlns:v-on": "",
                "xmlns:wx": ""
            },
            recommendImg: {
                "xmlns:v-bind": "",
                "v-bind:imgs.sync": "recommends"
            },
            loading: {
                "xmlns:wx": ""
            }
        }, _this.$events = {
            topicHeader: {
                "v-on:itemTap": "lookTopic"
            },
            newHeader: {
                "v-on:itemTap": "lookAll"
            },
            downloadHeader: {
                "v-on:itemTap": "lookAll"
            },
            recommendHeader: {
                "v-on:itemTap": "random"
            }
        }, _this.components = {
            choiceHeader: _listHeader2.default,
            topicHeader: _listHeader2.default,
            todayImg: _imgList2.default,
            topicImg: _imgList2.default,
            newHeader: _listHeader2.default,
            newImg: _imgList2.default,
            downloadHeader: _listHeader2.default,
            downloadImg: _imgList2.default,
            recommendHeader: _listHeader2.default,
            recommendImg: _imgList2.default,
            loading: _loading2.default
        }, _this.data = {
            daySigns: [],
            today: [],
            topics: [],
            downloadImgs: [],
            nImgs: [],
            recommends: []
        }, _this.computed = {}, _this.methods = {
            lookAll: function lookAll() {
                this.$root.$navigate("/pages/picture/all");
            },
            lookTopic: function lookTopic() {
                this.$root.$navigate("/pages/topic/index");
            },
            reload: function reload() {
                this.loadData();
            },
            lookSign: function lookSign() {
                this.$root.$preload("sign", this.daySigns);
                this.$root.$navigate("/pages/sign/sign");
            },
            random: function random() {
                var _this2 = this;
                _wallpaperApi2.default.fetchWallpaperList("random", 0, 10).then(function(res) {
                    _this2.recommends = res.imgs;
                    _this2.$apply();
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Recommend, [ {
        key: "loadData",
        value: function loadData() {
            var _this3 = this;
            _wallpaperApi2.default.fetchRecommends().then(function(res) {
                _this3.daySigns = res.daySigns;
                _this3.today = res.today;
                _this3.topics = res.topics;
                _this3.downloadImgs = res.downloads;
                _this3.nImgs = res.newImgs;
                _this3.recommends = res.recommends;
                _this3.$apply();
            }, function(err) {
                console.log(err);
            });
        }
    }, {
        key: "getHeight",
        value: function getHeight() {
            this.height = this.$root.$parent.globalData.navHeight + "px";
            this.marginHeight = this.$root.$parent.globalData.navHeight + 46;
        }
    }, {
        key: "onLoad",
        value: function onLoad() {
            this.getHeight();
            this.$apply();
        }
    } ]);
    return Recommend;
}(_wepy2.default.component);

exports.default = Recommend;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29tbWVuZC5qcyJdLCJuYW1lcyI6WyJSZWNvbW1lbmQiLCJwcm9wcyIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNob2ljZUhlYWRlciIsImhlYWRlciIsInRvcGljSGVhZGVyIiwidG9kYXlJbWciLCJpbWdMaXN0IiwidG9waWNJbWciLCJuZXdIZWFkZXIiLCJuZXdJbWciLCJkb3dubG9hZEhlYWRlciIsImRvd25sb2FkSW1nIiwicmVjb21tZW5kSGVhZGVyIiwicmVjb21tZW5kSW1nIiwibG9hZGluZyIsImRhdGEiLCJkYXlTaWducyIsInRvZGF5IiwidG9waWNzIiwiZG93bmxvYWRJbWdzIiwibkltZ3MiLCJyZWNvbW1lbmRzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwibG9va0FsbCIsIiRyb290IiwiJG5hdmlnYXRlIiwibG9va1RvcGljIiwicmVsb2FkIiwibG9hZERhdGEiLCJsb29rU2lnbiIsIiRwcmVsb2FkIiwicmFuZG9tIiwiYXBpIiwiZmV0Y2hXYWxscGFwZXJMaXN0IiwidGhlbiIsInJlcyIsImltZ3MiLCIkYXBwbHkiLCJmZXRjaFJlY29tbWVuZHMiLCJkb3dubG9hZHMiLCJuZXdJbWdzIiwiY29uc29sZSIsImxvZyIsImVyciIsImhlaWdodCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwibmF2SGVpZ2h0IiwibWFyZ2luSGVpZ2h0IiwiZ2V0SGVpZ2h0Iiwid2VweSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFKQTs7O0lBTXFCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEssR0FBUSxFLFFBQ1RDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLGdCQUFlLEVBQUMsU0FBUSxNQUFULEVBQWdCLFlBQVcsRUFBM0IsRUFBaEIsRUFBK0MsZUFBYyxFQUFDLFNBQVEsTUFBVCxFQUFnQixXQUFVLE1B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TCxHQUFvQmlCLElBQUlJLFNBQXhCO0FBQ0EsZUFBS3BCLEtBQUwsR0FBYWdCLElBQUlLLE9BQWpCO0FBQ0EsZUFBS3BCLFVBQUwsR0FBa0JlLElBQUlmLFVBQXRCO0FBQ0EsZUFBS2lCLE1BQUw7QUFDRCxPQVJELEVBUUcsZUFBTztBQUNSSSxnQkFBUUMsR0FBUixDQUFZQyxHQUFaO0FBQ0QsT0FWRDtBQVdEOzs7Z0NBQ1c7QUFDVixXQUFLQyxNQUFMLEdBQWMsS0FBS3BCLEtBQUwsQ0FBV3FCLE9BQVgsQ0FBbUJDLFVBQW5CLENBQThCQyxTQUE5QixHQUEwQyxJQUF4RDtBQUNBLFdBQUtDLFlBQUwsR0FBb0IsS0FBS3hCLEtBQUwsQ0FBV3FCLE9BQVgsQ0FBbUJDLFVBQW5CLENBQThCQyxTQUE5QixHQUEwQyxFQUE5RDtBQUNEOzs7NkJBQ1E7QUFDUCxXQUFLRSxTQUFMO0FBQ0EsV0FBS1osTUFBTDtBQUNEOzs7O0VBcEVvQ2EsZUFBS0MsUzs7a0JBQXZCeEQsUyIsImZpbGUiOiJyZWNvbW1lbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuLy8gaW1wb3J0IGRhdGVVdGlsIGZyb20gJy4uLy4uL3V0aWxzL2RhdGUuanMnO1xuaW1wb3J0IGhlYWRlciBmcm9tICcuLi8uLi9jb21wb25lbnRzL2xpc3QtaGVhZGVyJztcbmltcG9ydCBpbWdMaXN0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvaW1nLWxpc3QnO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvd2FsbHBhcGVyLWFwaSc7XG5pbXBvcnQgbG9hZGluZyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2xvYWRpbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvbW1lbmQgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge307XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJjaG9pY2VIZWFkZXJcIjp7XCJ0aXRsZVwiOlwi5LuK5pel57K+6YCJXCIsXCJ4bWxuczp3eFwiOlwiXCJ9LFwidG9waWNIZWFkZXJcIjp7XCJ0aXRsZVwiOlwi5o6o6I2Q5LiT6aKYXCIsXCJjb250ZW50XCI6XCLlhajpg6jkuJPpophcIixcInhtbG5zOnd4XCI6XCJcIixcInhtbG5zOnYtb25cIjpcIlwifSxcInRvZGF5SW1nXCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDppbWdzLnN5bmNcIjpcInRvZGF5XCIsXCJ0eXBlXCI6XCJiaWdcIn0sXCJ0b3BpY0ltZ1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6aW1ncy5zeW5jXCI6XCJ0b3BpY3NcIixcInR5cGVcIjpcInRvcGljXCJ9LFwibmV3SGVhZGVyXCI6e1widGl0bGVcIjpcIuacgOaWsOWjgee6uFwiLFwiY29udGVudFwiOlwi5YWo6YOo5aOB57q4XCIsXCJ4bWxuczp2LW9uXCI6XCJcIixcInhtbG5zOnd4XCI6XCJcIn0sXCJuZXdJbWdcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmltZ3Muc3luY1wiOlwibkltZ3NcIn0sXCJkb3dubG9hZEhlYWRlclwiOntcInRpdGxlXCI6XCLov5HmnJ/kuIvovb1cIixcImNvbnRlbnRcIjpcIuWFqOmDqOWjgee6uFwiLFwieG1sbnM6di1vblwiOlwiXCIsXCJ4bWxuczp3eFwiOlwiXCJ9LFwiZG93bmxvYWRJbWdcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmltZ3Muc3luY1wiOlwiZG93bmxvYWRJbWdzXCJ9LFwicmVjb21tZW5kSGVhZGVyXCI6e1widGl0bGVcIjpcIueMnOS9oOWWnOasolwiLFwiY29udGVudFwiOlwi5o2i5LiA5om5XCIsXCJ4bWxuczp2LW9uXCI6XCJcIixcInhtbG5zOnd4XCI6XCJcIn0sXCJyZWNvbW1lbmRJbWdcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmltZ3Muc3luY1wiOlwicmVjb21tZW5kc1wifSxcImxvYWRpbmdcIjp7XCJ4bWxuczp3eFwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcInRvcGljSGVhZGVyXCI6e1widi1vbjppdGVtVGFwXCI6XCJsb29rVG9waWNcIn0sXCJuZXdIZWFkZXJcIjp7XCJ2LW9uOml0ZW1UYXBcIjpcImxvb2tBbGxcIn0sXCJkb3dubG9hZEhlYWRlclwiOntcInYtb246aXRlbVRhcFwiOlwibG9va0FsbFwifSxcInJlY29tbWVuZEhlYWRlclwiOntcInYtb246aXRlbVRhcFwiOlwicmFuZG9tXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgY2hvaWNlSGVhZGVyOiBoZWFkZXIsXG4gICAgdG9waWNIZWFkZXI6IGhlYWRlcixcbiAgICB0b2RheUltZzogaW1nTGlzdCxcbiAgICB0b3BpY0ltZzogaW1nTGlzdCxcbiAgICBuZXdIZWFkZXI6IGhlYWRlcixcbiAgICBuZXdJbWc6IGltZ0xpc3QsXG4gICAgZG93bmxvYWRIZWFkZXI6IGhlYWRlcixcbiAgICBkb3dubG9hZEltZzogaW1nTGlzdCxcbiAgICByZWNvbW1lbmRIZWFkZXI6IGhlYWRlcixcbiAgICByZWNvbW1lbmRJbWc6IGltZ0xpc3QsXG4gICAgbG9hZGluZ1xuICB9O1xuICBkYXRhID0ge1xuICAgIGRheVNpZ25zOiBbXSxcbiAgICB0b2RheTogW10sXG4gICAgdG9waWNzOiBbXSxcbiAgICBkb3dubG9hZEltZ3M6IFtdLFxuICAgIG5JbWdzOiBbXSxcbiAgICByZWNvbW1lbmRzOiBbXVxuICB9O1xuICBjb21wdXRlZCA9IHt9O1xuICBtZXRob2RzID0ge1xuICAgIGxvb2tBbGwoKSB7XG4gICAgICB0aGlzLiRyb290LiRuYXZpZ2F0ZSgnL3BhZ2VzL3BpY3R1cmUvYWxsJyk7XG4gICAgfSxcbiAgICBsb29rVG9waWMoKSB7XG4gICAgICB0aGlzLiRyb290LiRuYXZpZ2F0ZSgnL3BhZ2VzL3RvcGljL2luZGV4Jyk7XG4gICAgfSxcbiAgICByZWxvYWQoKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKCk7XG4gICAgfSxcbiAgICBsb29rU2lnbigpIHtcbiAgICAgIHRoaXMuJHJvb3QuJHByZWxvYWQoJ3NpZ24nLCB0aGlzLmRheVNpZ25zKTtcbiAgICAgIHRoaXMuJHJvb3QuJG5hdmlnYXRlKGAvcGFnZXMvc2lnbi9zaWduYCk7XG4gICAgfSxcbiAgICByYW5kb20oKSB7XG4gICAgICBhcGkuZmV0Y2hXYWxscGFwZXJMaXN0KCdyYW5kb20nLCAwLCAxMCkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLnJlY29tbWVuZHMgPSByZXMuaW1ncztcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBsb2FkRGF0YSgpIHtcbiAgICBhcGkuZmV0Y2hSZWNvbW1lbmRzKCkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5kYXlTaWducyA9IHJlcy5kYXlTaWducztcbiAgICAgIHRoaXMudG9kYXkgPSByZXMudG9kYXk7XG4gICAgICB0aGlzLnRvcGljcyA9IHJlcy50b3BpY3M7XG4gICAgICB0aGlzLmRvd25sb2FkSW1ncyA9IHJlcy5kb3dubG9hZHM7XG4gICAgICB0aGlzLm5JbWdzID0gcmVzLm5ld0ltZ3M7XG4gICAgICB0aGlzLnJlY29tbWVuZHMgPSByZXMucmVjb21tZW5kcztcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG4gIH1cbiAgZ2V0SGVpZ2h0KCkge1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy4kcm9vdC4kcGFyZW50Lmdsb2JhbERhdGEubmF2SGVpZ2h0ICsgJ3B4JztcbiAgICB0aGlzLm1hcmdpbkhlaWdodCA9IHRoaXMuJHJvb3QuJHBhcmVudC5nbG9iYWxEYXRhLm5hdkhlaWdodCArIDQ2O1xuICB9XG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLmdldEhlaWdodCgpO1xuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH1cbn1cbiJdfQ==