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

var _discovery = require("./discovery.js");

var _discovery2 = _interopRequireDefault(_discovery);

var _recommend = require("./recommend.js");

var _recommend2 = _interopRequireDefault(_recommend);

var _navbar = require("./../../components/navbar.js");

var _navbar2 = _interopRequireDefault(_navbar);

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

var Index = function(_wepy$page) {
    _inherits(Index, _wepy$page);
    function Index() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Index);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {
            enablePullDownRefresh: true
        }, _this.data = {
            selectedTab: 0,
            user: null,
            page1X: 0,
            page2X: 0,
            changing: false,
            needRefresh: false
        }, _this.$repeat = {}, _this.$props = {
            discovery: {
                "xmlns:v-bind": "",
                "v-bind:user.sync": "user"
            }
        }, _this.$events = {}, _this.components = {
            recommend: _recommend2.default,
            discovery: _discovery2.default,
            navbar: _navbar2.default
        }, _this.computed = {
            height: function height() {
                return _this.$parent.globalData.navHeight + 46;
            },
            isIpx: function isIpx() {
                return !!_this.$parent.globalData.isIpx;
            }
        }, _this.methods = {
            goUpload: function goUpload() {
                if (!this.user || !wx.getStorageSync("firstIn")) {
                    this.needRefresh = !this.user;
                    this.$navigate("/pages/upload/index");
                } else {
                    this.choosePicture();
                }
            },
            goMy: function goMy() {
                if (this.user) {
                    this.$navigate("/pages/my/index");
                } else {
                    this.needRefresh = true;
                    this.$navigate("/pages/login/login");
                }
            },
            chooseTab: function chooseTab(tab) {
                if (tab !== this.selectedTab) {
                    this.changing = true;
                    this.selectedTab = parseInt(tab);
                    if (this.selectedTab === 0) {
                        wx.pageScrollTo({
                            scrollTop: this.page1X,
                            // 滚动到页面的目标位置（单位px）,
                            duration: 0
                        });
                    } else {
                        wx.pageScrollTo({
                            scrollTop: this.page2X,
                            // 滚动到页面的目标位置（单位px）,
                            duration: 0
                        });
                    }
                    this.changing = false;
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Index, [ {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "onReady",
        value: function onReady() {
            this.loadData();
        }
    }, {
        key: "choosePicture",
        value: function choosePicture() {
            var _this2 = this;
            _wepy2.default.chooseImage({
                count: "9",
                // 最多可以选择的图片张数,
                sizeType: [ "original" ],
                sourceType: [ "album" ],
                success: function success(res) {
                    _this2.tempFiles = res.tempFiles;
                    _this2.tempFiles.forEach(function(item) {
                        _wepy2.default.getImageInfo({
                            src: item.path,
                            // 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径,
                            success: function success(res) {
                                item.width = res.width;
                                item.height = res.height;
                                item.size = (item.size / 1024 / 1024).toFixed(2);
                                item.owner = false;
                                item.ok = res.width * res.height >= 1280 * 720;
                                _this2.$apply();
                            }
                        });
                    });
                    _this2.$preload("tempFiles", _this2.tempFiles);
                    _this2.$navigate("/pages/upload/upload");
                }
            });
        }
    }, {
        key: "loadData",
        value: function loadData() {
            this.$invoke("recommend", "reload");
            this.$invoke("discovery", "reload");
        }
    }, {
        key: "onShow",
        value: function onShow() {
            var _this3 = this;
            this.$parent.getUserInfo(function(user) {
                _this3.user = user;
                if (_this3.needRefresh && _this3.user) {
                    _this3.needRefresh = false;
                    _this3.$invoke("discovery", "reload");
                }
                _this3.$apply();
            }, false);
        }
    }, {
        key: "onPageScroll",
        value: function onPageScroll(e) {
            if (!this.changing) {
                if (this.selectedTab === 0) {
                    this.page1X = e.scrollTop;
                } else {
                    this.page2X = e.scrollTop;
                }
            }
        }
    }, {
        key: "onPullDownRefresh",
        value: function onPullDownRefresh() {
            this.refresh();
        }
    }, {
        key: "refresh",
        value: function refresh() {
            if (this.selectedTab === 0) {
                this.$invoke("recommend", "reload");
            } else {
                this.$invoke("discovery", "reload");
            }
            // this.scrollStatus = 0;
                        _wepy2.default.stopPullDownRefresh();
        }
    }, {
        key: "onShareAppMessage",
        value: function onShareAppMessage() {
            return {
                title: "纸塘壁纸",
                path: "/pages/home/index"
            };
        }
    } ]);
    return Index;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Index, "pages/home/index"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwiZGF0YSIsInNlbGVjdGVkVGFiIiwidXNlciIsInBhZ2UxWCIsInBhZ2UyWCIsImNoYW5naW5nIiwibmVlZFJlZnJlc2giLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJyZWNvbW1lbmQiLCJkaXNjb3ZlcnkiLCJuYXZiYXIiLCJjb21wdXRlZCIsImhlaWdodCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwibmF2SGVpZ2h0IiwiaXNJcHgiLCJtZXRob2RzIiwiZ29VcGxvYWQiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiJG5hdmlnYXRlIiwiY2hvb3NlUGljdHVyZSIsImdvTXkiLCJjaG9vc2VUYWIiLCJ0YWIiLCJwYXJzZUludCIsInBhZ2VTY3JvbGxUbyIsInNjcm9sbFRvcCIsImR1cmF0aW9uIiwibG9hZERhdGEiLCJ3ZXB5IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJ0ZW1wRmlsZXMiLCJyZXMiLCJmb3JFYWNoIiwiZ2V0SW1hZ2VJbmZvIiwic3JjIiwiaXRlbSIsInBhdGgiLCJ3aWR0aCIsInNpemUiLCJ0b0ZpeGVkIiwib3duZXIiLCJvayIsIiRhcHBseSIsIiRwcmVsb2FkIiwiJGludm9rZSIsImdldFVzZXJJbmZvIiwiZSIsInJlZnJlc2giLCJzdG9wUHVsbERvd25SZWZyZXNoIiwidGl0bGUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw2QkFBdUI7QUFEaEIsSyxRQUdUQyxJLEdBQU87QUFDTEMsbUJBQWEsQ0FEUjtBQUVMQyxZQUFNLElBRkQ7QUFHTEMsY0FBUSxDQUhIO0FBSUxDLGNB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MEIsSTs7a0JBQW5CL0QsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgZGlzY292ZXJ5IGZyb20gJy4vZGlzY292ZXJ5JztcbmltcG9ydCByZWNvbW1lbmQgZnJvbSAnLi9yZWNvbW1lbmQnO1xuaW1wb3J0IG5hdmJhciBmcm9tICcuLi8uLi9jb21wb25lbnRzL25hdmJhcic7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWVcbiAgfTtcbiAgZGF0YSA9IHtcbiAgICBzZWxlY3RlZFRhYjogMCxcbiAgICB1c2VyOiBudWxsLFxuICAgIHBhZ2UxWDogMCxcbiAgICBwYWdlMlg6IDAsXG4gICAgY2hhbmdpbmc6IGZhbHNlLFxuICAgIG5lZWRSZWZyZXNoOiBmYWxzZVxuICB9O1xuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiZGlzY292ZXJ5XCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDp1c2VyLnN5bmNcIjpcInVzZXJcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIHJlY29tbWVuZCxcbiAgICBkaXNjb3ZlcnksXG4gICAgbmF2YmFyXG4gIH07XG4gIGNvbXB1dGVkID0ge1xuICAgIGhlaWdodDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLm5hdkhlaWdodCArIDQ2O1xuICAgIH0sXG4gICAgaXNJcHg6ICgpID0+IHtcbiAgICAgIHJldHVybiAhIXRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmlzSXB4O1xuICAgIH1cbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBnb1VwbG9hZCgpIHtcbiAgICAgIGlmICghdGhpcy51c2VyIHx8ICF3eC5nZXRTdG9yYWdlU3luYygnZmlyc3RJbicpKSB7XG4gICAgICAgIHRoaXMubmVlZFJlZnJlc2ggPSAhdGhpcy51c2VyO1xuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL3VwbG9hZC9pbmRleCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jaG9vc2VQaWN0dXJlKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnb015KCkge1xuICAgICAgaWYgKHRoaXMudXNlcikge1xuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL215L2luZGV4Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm5lZWRSZWZyZXNoID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9sb2dpbi9sb2dpbicpO1xuICAgICAgfVxuICAgIH0sXG4gICAgY2hvb3NlVGFiKHRhYikge1xuICAgICAgaWYgKHRhYiAhPT0gdGhpcy5zZWxlY3RlZFRhYikge1xuICAgICAgICB0aGlzLmNoYW5naW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHBhcnNlSW50KHRhYik7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFiID09PSAwKSB7XG4gICAgICAgICAgd3gucGFnZVNjcm9sbFRvKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogdGhpcy5wYWdlMVgsIC8vIOa7muWKqOWIsOmhtemdoueahOebruagh+S9jee9ru+8iOWNleS9jXB477yJLFxuICAgICAgICAgICAgZHVyYXRpb246IDBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3eC5wYWdlU2Nyb2xsVG8oe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiB0aGlzLnBhZ2UyWCwgLy8g5rua5Yqo5Yiw6aG16Z2i55qE55uu5qCH5L2N572u77yI5Y2V5L2NcHjvvIksXG4gICAgICAgICAgICBkdXJhdGlvbjogMFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIG9uTG9hZCgpIHsgfTtcbiAgb25SZWFkeSgpIHtcbiAgICB0aGlzLmxvYWREYXRhKCk7XG4gIH07XG5cbiAgY2hvb3NlUGljdHVyZSgpIHtcbiAgICB3ZXB5LmNob29zZUltYWdlKHtcbiAgICAgIGNvdW50OiAnOScsIC8vIOacgOWkmuWPr+S7pemAieaLqeeahOWbvueJh+W8oOaVsCxcbiAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJ10sXG4gICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJ10sXG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xuICAgICAgICB0aGlzLnRlbXBGaWxlcyA9IHJlcy50ZW1wRmlsZXM7XG4gICAgICAgIHRoaXMudGVtcEZpbGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgd2VweS5nZXRJbWFnZUluZm8oe1xuICAgICAgICAgICAgc3JjOiBpdGVtLnBhdGgsIC8vIOWbvueJh+eahOi3r+W+hO+8jOWPr+S7peaYr+ebuOWvuei3r+W+hO+8jOS4tOaXtuaWh+S7tui3r+W+hO+8jOWtmOWCqOaWh+S7tui3r+W+hO+8jOe9kee7nOWbvueJh+i3r+W+hCxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgIGl0ZW0ud2lkdGggPSByZXMud2lkdGg7XG4gICAgICAgICAgICAgIGl0ZW0uaGVpZ2h0ID0gcmVzLmhlaWdodDtcbiAgICAgICAgICAgICAgaXRlbS5zaXplID0gKGl0ZW0uc2l6ZSAvIDEwMjQgLyAxMDI0KS50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgICBpdGVtLm93bmVyID0gZmFsc2U7XG4gICAgICAgICAgICAgIGl0ZW0ub2sgPSByZXMud2lkdGggKiByZXMuaGVpZ2h0ID49IDEyODAgKiA3MjA7XG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRwcmVsb2FkKCd0ZW1wRmlsZXMnLCB0aGlzLnRlbXBGaWxlcyk7XG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKCcvcGFnZXMvdXBsb2FkL3VwbG9hZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbG9hZERhdGEoKSB7XG4gICAgdGhpcy4kaW52b2tlKCdyZWNvbW1lbmQnLCAncmVsb2FkJyk7XG4gICAgdGhpcy4kaW52b2tlKCdkaXNjb3ZlcnknLCAncmVsb2FkJyk7XG4gIH1cbiAgb25TaG93KCkge1xuICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyh1c2VyID0+IHtcbiAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgICBpZiAodGhpcy5uZWVkUmVmcmVzaCAmJiB0aGlzLnVzZXIpIHtcbiAgICAgICAgdGhpcy5uZWVkUmVmcmVzaCA9IGZhbHNlO1xuICAgICAgICB0aGlzLiRpbnZva2UoJ2Rpc2NvdmVyeScsICdyZWxvYWQnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgb25QYWdlU2Nyb2xsKGUpIHtcbiAgICBpZiAoIXRoaXMuY2hhbmdpbmcpIHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGFiID09PSAwKSB7XG4gICAgICAgIHRoaXMucGFnZTFYID0gZS5zY3JvbGxUb3A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhZ2UyWCA9IGUuc2Nyb2xsVG9wO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgcmVmcmVzaCgpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRhYiA9PT0gMCkge1xuICAgICAgdGhpcy4kaW52b2tlKCdyZWNvbW1lbmQnLCAncmVsb2FkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGludm9rZSgnZGlzY292ZXJ5JywgJ3JlbG9hZCcpO1xuICAgIH1cbiAgICAvLyB0aGlzLnNjcm9sbFN0YXR1cyA9IDA7XG4gICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG4gIH1cbiAgb25TaGFyZUFwcE1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiAn57q45aGY5aOB57q4JyxcbiAgICAgIHBhdGg6ICcvcGFnZXMvaG9tZS9pbmRleCdcbiAgICB9O1xuICB9XG59XG4iXX0=