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

var AllPicturePage = function(_wepy$page) {
    _inherits(AllPicturePage, _wepy$page);
    function AllPicturePage() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, AllPicturePage);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AllPicturePage.__proto__ || Object.getPrototypeOf(AllPicturePage)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {}, _this.data = {
            selectedTab: 0,
            allTotalPages: 1,
            allScrollTop: 0,
            allCurrentIndex: 1,
            hotScrollTop: 0,
            hotTotalPages: 1,
            hotCurrentIndex: 1,
            randomScrollTop: 0,
            size: 20,
            allImgs: [],
            hotImgs: [],
            randomImgs: [],
            page1Left: "0",
            page2Left: "100%",
            page3Left: "200%"
        }, _this.$repeat = {}, _this.$props = {
            "all-pager": {
                "xmlns:wx": "",
                "xmlns:v-bind": "",
                "v-bind:total.sync": "allTotalPages",
                "v-bind:currentIndex.sync": "allCurrentIndex",
                "xmlns:v-on": ""
            },
            "hot-pager": {
                "v-bind:total.sync": "hotTotalPages",
                bindcurrentIndex: "hotCurrentIndex"
            },
            "all-picture-list": {
                "xmlns:v-bind": "",
                "v-bind:pics.sync": "allImgs"
            },
            "hot-picture-list": {
                "v-bind:pics.sync": "hotImgs"
            },
            "random-picture-list": {
                "v-bind:pics.sync": "randomImgs"
            }
        }, _this.$events = {
            "all-pager": {
                "v-on:change": "allPageChange"
            },
            "hot-pager": {
                "v-on:change": "hotPageChange"
            }
        }, _this.components = {
            navbar: _navbar2.default,
            "all-pager": _pager2.default,
            "hot-pager": _pager2.default,
            "all-picture-list": _pictureList2.default,
            "hot-picture-list": _pictureList2.default,
            "random-picture-list": _pictureList2.default
        }, _this.computed = {
            marginHeight: function marginHeight() {
                return _this.$parent.globalData.navHeight + 46;
            }
        }, _this.methods = {
            back: function back() {
                _wepy2.default.navigateBack({
                    delta: 1
                });
            },
            scroll: function scroll(event) {
                // console.log(event.detail.scrollTop);
                // this.allScrollTop = event.detail.scrollTop;
                if (parseInt(this.selectedTab) === 0) {
                    this.allScrollTop = 1;
                } else if (parseInt(this.selectedTab) === 1) {
                    this.hotScrollTop = 1;
                } else {
                    this.randomScrollTop = 1;
                }
            },
            choose: function choose(tab) {
                if (tab !== this.selectedTab) {
                    switch (tab.toString()) {
                      case "0":
                        this.page1Left = 0;
                        this.page2Left = "100%";
                        this.page3Left = "200%";
                        break;

                      case "1":
                        this.page1Left = "-100%";
                        this.page2Left = "0";
                        this.page3Left = "100%";
                        break;

                      case "2":
                        this.page1Left = "-200%";
                        this.page2Left = "-100%";
                        this.page3Left = "0";
                        break;
                    }
                    this.selectedTab = tab;
                }
            },
            allPageChange: function allPageChange(index, event) {
                this.allCurrentIndex = index;
                this.fetchAllPage();
            },
            hotPageChange: function hotPageChange(index, event) {
                this.hotCurrentIndex = index;
                this.fetchHotPage();
            },
            random: function random() {
                this.fetchRandomPage();
            }
        }, _this.events = {}, _this.watch = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(AllPicturePage, [ {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "fetchAllPage",
        value: function fetchAllPage() {
            var _this2 = this;
            if (this.allTotalPages >= this.allCurrentIndex) {
                this.allScrollTop = 0;
                _wallpaperApi2.default.fetchWallpaperList("all", this.allCurrentIndex - 1, this.size).then(function(res) {
                    _this2.allImgs = res.imgs;
                    _this2.allTotalPages = res.totalPages;
                    _this2.$apply();
                }, function(err) {
                    console.log(err);
                });
            }
        }
    }, {
        key: "fetchHotPage",
        value: function fetchHotPage() {
            var _this3 = this;
            if (this.hotTotalPages >= this.hotCurrentIndex) {
                this.hotScrollTop = 0;
                _wallpaperApi2.default.fetchWallpaperList("hot", this.hotCurrentIndex - 1, this.size).then(function(res) {
                    _this3.hotImgs = res.imgs;
                    _this3.hotTotalPages = res.totalPages;
                    _this3.$apply();
                }, function(err) {
                    console.log(err);
                });
            }
        }
    }, {
        key: "fetchRandomPage",
        value: function fetchRandomPage() {
            var _this4 = this;
            this.randomScrollTop = 0;
            _wallpaperApi2.default.fetchWallpaperList("random", 0, this.size).then(function(res) {
                _this4.randomImgs = res.imgs;
                _this4.$apply();
            }, function(err) {
                console.log(err);
            });
        }
    }, {
        key: "onReady",
        value: function onReady() {
            this.fetchAllPage();
            this.fetchHotPage();
            this.fetchRandomPage();
        }
    } ]);
    return AllPicturePage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(AllPicturePage, "pages/picture/all"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsbC5qcyJdLCJuYW1lcyI6WyJBbGxQaWN0dXJlUGFnZSIsImNvbmZpZyIsImRhdGEiLCJzZWxlY3RlZFRhYiIsImFsbFRvdGFsUGFnZXMiLCJhbGxTY3JvbGxUb3AiLCJhbGxDdXJyZW50SW5kZXgiLCJob3RTY3JvbGxUb3AiLCJob3RUb3RhbFBhZ2VzIiwiaG90Q3VycmVudEluZGV4IiwicmFuZG9tU2Nyb2xsVG9wIiwic2l6ZSIsImFsbEltZ3MiLCJob3RJbWdzIiwicmFuZG9tSW1ncyIsInBhZ2UxTGVmdCIsInBhZ2UyTGVmdCIsInBhZ2UzTGVmdCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hdmJhciIsInBhZ2VyIiwicGljdHVyZUxpc3QiLCJjb21wdXRlZCIsIm1hcmdpbkhlaWdodCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwibmF2SGVpZ2h0IiwibWV0aG9kcyIsImJhY2siLCJ3ZXB5IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJzY3JvbGwiLCJldmVudCIsInBhcnNlSW50IiwiY2hvb3NlIiwidGFiIiwidG9TdHJpbmciLCJhbGxQYWdlQ2hhbmdlIiwiaW5kZXgiLCJmZXRjaEFsbFBhZ2UiLCJob3RQYWdlQ2hhbmdlIiwiZmV0Y2hIb3RQYWdlIiwicmFuZG9tIiwiZmV0Y2hSYW5kb21QYWdlIiwiZXZlbnRzIiwid2F0Y2giLCJhcGkiLCJmZXRjaFdhbGxwYXBlckxpc3QiLCJ0aGVuIiwicmVzIiwiaW1ncyIsInRvdGFsUGFnZXMiLCIkYXBwbHkiLCJjb25zb2xlIiwibG9nIiwiZXJyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxjOzs7Ozs7Ozs7Ozs7OztzTUFDbkJDLE0sR0FBUyxFLFFBQ1RDLEksR0FBTztBQUNMQyxtQkFBYSxDQURSO0FBRUxDLHFCQUFlLENBRlY7QUFHTEMsb0JBQWMsQ0FI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dUIsQ0FBdkI7QUFDQXdDLDZCQUFJQyxrQkFBSixDQUF1QixRQUF2QixFQUFpQyxDQUFqQyxFQUFvQyxLQUFLeEMsSUFBekMsRUFBK0N5QyxJQUEvQyxDQUFvRCxlQUFPO0FBQ3pELGVBQUt0QyxVQUFMLEdBQWtCdUMsSUFBSUMsSUFBdEI7QUFDQSxlQUFLRSxNQUFMO0FBQ0QsT0FIRCxFQUdHLGVBQU87QUFDUkMsZ0JBQVFDLEdBQVIsQ0FBWUMsR0FBWjtBQUNELE9BTEQ7QUFNRDs7OzhCQUNTO0FBQ1IsV0FBS2hCLFlBQUw7QUFDQSxXQUFLRSxZQUFMO0FBQ0EsV0FBS0UsZUFBTDtBQUNEOzs7O0VBOUh5Q2YsZUFBSzRCLEk7O2tCQUE1QjVELGMiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9uYXZiYXInO1xuaW1wb3J0IHBpY3R1cmVMaXN0IGZyb20gJy4vcGljdHVyZS1saXN0JztcbmltcG9ydCBwYWdlciBmcm9tICcuL3BhZ2VyJztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL3dhbGxwYXBlci1hcGknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxsUGljdHVyZVBhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7fTtcbiAgZGF0YSA9IHtcbiAgICBzZWxlY3RlZFRhYjogMCxcbiAgICBhbGxUb3RhbFBhZ2VzOiAxLFxuICAgIGFsbFNjcm9sbFRvcDogMCxcbiAgICBhbGxDdXJyZW50SW5kZXg6IDEsXG4gICAgaG90U2Nyb2xsVG9wOiAwLFxuICAgIGhvdFRvdGFsUGFnZXM6IDEsXG4gICAgaG90Q3VycmVudEluZGV4OiAxLFxuICAgIHJhbmRvbVNjcm9sbFRvcDogMCxcbiAgICBzaXplOiAyMCxcbiAgICBhbGxJbWdzOiBbXSxcbiAgICBob3RJbWdzOiBbXSxcbiAgICByYW5kb21JbWdzOiBbXSxcbiAgICBwYWdlMUxlZnQ6ICcwJyxcbiAgICBwYWdlMkxlZnQ6ICcxMDAlJyxcbiAgICBwYWdlM0xlZnQ6ICcyMDAlJ1xuICB9O1xuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYWxsLXBhZ2VyXCI6e1wieG1sbnM6d3hcIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDp0b3RhbC5zeW5jXCI6XCJhbGxUb3RhbFBhZ2VzXCIsXCJ2LWJpbmQ6Y3VycmVudEluZGV4LnN5bmNcIjpcImFsbEN1cnJlbnRJbmRleFwiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiaG90LXBhZ2VyXCI6e1widi1iaW5kOnRvdGFsLnN5bmNcIjpcImhvdFRvdGFsUGFnZXNcIixcImJpbmRjdXJyZW50SW5kZXhcIjpcImhvdEN1cnJlbnRJbmRleFwifSxcImFsbC1waWN0dXJlLWxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBpY3Muc3luY1wiOlwiYWxsSW1nc1wifSxcImhvdC1waWN0dXJlLWxpc3RcIjp7XCJ2LWJpbmQ6cGljcy5zeW5jXCI6XCJob3RJbWdzXCJ9LFwicmFuZG9tLXBpY3R1cmUtbGlzdFwiOntcInYtYmluZDpwaWNzLnN5bmNcIjpcInJhbmRvbUltZ3NcIn19O1xyXG4kZXZlbnRzID0ge1wiYWxsLXBhZ2VyXCI6e1widi1vbjpjaGFuZ2VcIjpcImFsbFBhZ2VDaGFuZ2VcIn0sXCJob3QtcGFnZXJcIjp7XCJ2LW9uOmNoYW5nZVwiOlwiaG90UGFnZUNoYW5nZVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIG5hdmJhcixcbiAgICAnYWxsLXBhZ2VyJzogcGFnZXIsXG4gICAgJ2hvdC1wYWdlcic6IHBhZ2VyLFxuICAgICdhbGwtcGljdHVyZS1saXN0JzogcGljdHVyZUxpc3QsXG4gICAgJ2hvdC1waWN0dXJlLWxpc3QnOiBwaWN0dXJlTGlzdCxcbiAgICAncmFuZG9tLXBpY3R1cmUtbGlzdCc6IHBpY3R1cmVMaXN0XG4gIH07XG4gIGNvbXB1dGVkID0ge1xuICAgIG1hcmdpbkhlaWdodDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLm5hdkhlaWdodCArIDQ2O1xuICAgIH1cbiAgfVxuICBtZXRob2RzID0ge1xuICAgIGJhY2soKSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgIGRlbHRhOiAxXG4gICAgICB9KTtcbiAgICB9LFxuICAgIHNjcm9sbChldmVudCkge1xuICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQuZGV0YWlsLnNjcm9sbFRvcCk7XG4gICAgICAvLyB0aGlzLmFsbFNjcm9sbFRvcCA9IGV2ZW50LmRldGFpbC5zY3JvbGxUb3A7XG4gICAgICBpZiAocGFyc2VJbnQodGhpcy5zZWxlY3RlZFRhYikgPT09IDApIHtcbiAgICAgICAgdGhpcy5hbGxTY3JvbGxUb3AgPSAxO1xuICAgICAgfSBlbHNlIGlmIChwYXJzZUludCh0aGlzLnNlbGVjdGVkVGFiKSA9PT0gMSkge1xuICAgICAgICB0aGlzLmhvdFNjcm9sbFRvcCA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJhbmRvbVNjcm9sbFRvcCA9IDE7XG4gICAgICB9XG4gICAgfSxcbiAgICBjaG9vc2UodGFiKSB7XG4gICAgICBpZiAodGFiICE9PSB0aGlzLnNlbGVjdGVkVGFiKSB7XG4gICAgICAgIHN3aXRjaCAodGFiLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICAgIHRoaXMucGFnZTFMZWZ0ID0gMDtcbiAgICAgICAgICAgIHRoaXMucGFnZTJMZWZ0ID0gJzEwMCUnO1xuICAgICAgICAgICAgdGhpcy5wYWdlM0xlZnQgPSAnMjAwJSc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgIHRoaXMucGFnZTFMZWZ0ID0gJy0xMDAlJztcbiAgICAgICAgICAgIHRoaXMucGFnZTJMZWZ0ID0gJzAnO1xuICAgICAgICAgICAgdGhpcy5wYWdlM0xlZnQgPSAnMTAwJSc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgIHRoaXMucGFnZTFMZWZ0ID0gJy0yMDAlJztcbiAgICAgICAgICAgIHRoaXMucGFnZTJMZWZ0ID0gJy0xMDAlJztcbiAgICAgICAgICAgIHRoaXMucGFnZTNMZWZ0ID0gJzAnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGFsbFBhZ2VDaGFuZ2UoaW5kZXgsIGV2ZW50KSB7XG4gICAgICB0aGlzLmFsbEN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgdGhpcy5mZXRjaEFsbFBhZ2UoKTtcbiAgICB9LFxuICAgIGhvdFBhZ2VDaGFuZ2UoaW5kZXgsIGV2ZW50KSB7XG4gICAgICB0aGlzLmhvdEN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgdGhpcy5mZXRjaEhvdFBhZ2UoKTtcbiAgICB9LFxuICAgIHJhbmRvbSgpIHtcbiAgICAgIHRoaXMuZmV0Y2hSYW5kb21QYWdlKCk7XG4gICAgfVxuICB9O1xuICBldmVudHMgPSB7fTtcbiAgd2F0Y2ggPSB7fTtcbiAgb25Mb2FkKCkgeyB9O1xuICBmZXRjaEFsbFBhZ2UoKSB7XG4gICAgaWYgKHRoaXMuYWxsVG90YWxQYWdlcyA+PSB0aGlzLmFsbEN1cnJlbnRJbmRleCkge1xuICAgICAgdGhpcy5hbGxTY3JvbGxUb3AgPSAwO1xuICAgICAgYXBpLmZldGNoV2FsbHBhcGVyTGlzdCgnYWxsJywgdGhpcy5hbGxDdXJyZW50SW5kZXggLSAxLCB0aGlzLnNpemUpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5hbGxJbWdzID0gcmVzLmltZ3M7XG4gICAgICAgIHRoaXMuYWxsVG90YWxQYWdlcyA9IHJlcy50b3RhbFBhZ2VzO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBmZXRjaEhvdFBhZ2UoKSB7XG4gICAgaWYgKHRoaXMuaG90VG90YWxQYWdlcyA+PSB0aGlzLmhvdEN1cnJlbnRJbmRleCkge1xuICAgICAgdGhpcy5ob3RTY3JvbGxUb3AgPSAwO1xuICAgICAgYXBpLmZldGNoV2FsbHBhcGVyTGlzdCgnaG90JywgdGhpcy5ob3RDdXJyZW50SW5kZXggLSAxLCB0aGlzLnNpemUpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5ob3RJbWdzID0gcmVzLmltZ3M7XG4gICAgICAgIHRoaXMuaG90VG90YWxQYWdlcyA9IHJlcy50b3RhbFBhZ2VzO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBmZXRjaFJhbmRvbVBhZ2UoKSB7XG4gICAgdGhpcy5yYW5kb21TY3JvbGxUb3AgPSAwO1xuICAgIGFwaS5mZXRjaFdhbGxwYXBlckxpc3QoJ3JhbmRvbScsIDAsIHRoaXMuc2l6ZSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5yYW5kb21JbWdzID0gcmVzLmltZ3M7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0sIGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICB9XG4gIG9uUmVhZHkoKSB7XG4gICAgdGhpcy5mZXRjaEFsbFBhZ2UoKTtcbiAgICB0aGlzLmZldGNoSG90UGFnZSgpO1xuICAgIHRoaXMuZmV0Y2hSYW5kb21QYWdlKCk7XG4gIH07XG59XG4iXX0=