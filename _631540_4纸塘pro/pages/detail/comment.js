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

var _commentList = require("./comment-list.js");

var _commentList2 = _interopRequireDefault(_commentList);

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

var CommentPage = function(_wepy$page) {
    _inherits(CommentPage, _wepy$page);
    function CommentPage() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, CommentPage);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CommentPage.__proto__ || Object.getPrototypeOf(CommentPage)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {
            backgroundColor: "#101010"
        }, _this.data = {
            totalPages: 1,
            index: 0,
            size: 20,
            type: "wallpaper",
            comments: [],
            loading: false,
            user: null,
            autoFocus: false,
            initValue: ""
        }, _this.$repeat = {}, _this.$props = {
            commentList: {
                "xmlns:v-bind": "",
                "v-bind:comments.sync": "comments",
                "xmlns:v-on": ""
            },
            navbar: {
                padding: "true",
                title: "全部说说"
            }
        }, _this.$events = {
            commentList: {
                "v-on:fresh": "fresh"
            }
        }, _this.components = {
            commentList: _commentList2.default,
            navbar: _navbar2.default
        }, _this.methods = {
            fresh: function fresh() {
                _wepy2.default.setStorageSync(this.type, "true");
                this.init();
            },
            submit: function submit() {
                var _this2 = this;
                // let value = event.detail.value.trim();
                // this.initValue = value;
                                if (!this.user) {
                    _wepy2.default.showToast({
                        title: "登录后才能评价",
                        // 提示的内容,
                        icon: "none",
                        // 图标,
                        duration: 2e3,
                        // 延迟时间,
                        mask: false
                    });
                } else if (this.initValue) {
                    _wallpaperApi2.default.comment(this.type, this.id, this.initValue).then(function() {
                        _this2.init();
                        _wepy2.default.setStorageSync(_this2.type, "true");
                    }, function(err) {
                        console.error(err);
                    });
                }
            },
            input: function input(event) {
                var value = event.detail.value.trim();
                this.initValue = value;
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(CommentPage, [ {
        key: "init",
        value: function init() {
            this.totalPages = 1;
            this.index = 0;
            this.comments = [];
            this.loading = false;
            this.fetchComments();
            this.initValue = "";
            this.$apply();
        }
    }, {
        key: "fetchComments",
        value: function fetchComments() {
            var _this3 = this;
            if (this.totalPages <= this.index || this.loading) return;
            this.loading = true;
            _wallpaperApi2.default.fetchComments(this.id, this.type, this.index, this.size, this.user ? this.user.id : -1).then(function(res) {
                var _comments;
                _this3.totalPages = res.totalPages;
                _this3.index++;
                (_comments = _this3.comments).push.apply(_comments, _toConsumableArray(res.comments));
                _this3.loading = false;
                _this3.$apply();
            }, function(err) {
                _this3.loading = false;
                console.error(err);
            });
        }
    }, {
        key: "onLoad",
        value: function onLoad(options) {
            this.id = options.id;
            this.autoFocus = options.focus === "true";
            this.type = options.type || "wallpaper";
            console.log(this.autoFocus);
        }
    }, {
        key: "onReady",
        value: function onReady() {
            var _this4 = this;
            this.$parent.getUserInfo(function(user) {
                _this4.user = user;
                _this4.fetchComments();
                _this4.$apply();
            });
        }
    }, {
        key: "onReachBottom",
        value: function onReachBottom() {
            this.fetchComments();
        }
    } ]);
    return CommentPage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(CommentPage, "pages/detail/comment"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1lbnQuanMiXSwibmFtZXMiOlsiQ29tbWVudFBhZ2UiLCJjb25maWciLCJiYWNrZ3JvdW5kQ29sb3IiLCJkYXRhIiwidG90YWxQYWdlcyIsImluZGV4Iiwic2l6ZSIsInR5cGUiLCJjb21tZW50cyIsImxvYWRpbmciLCJ1c2VyIiwiYXV0b0ZvY3VzIiwiaW5pdFZhbHVlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiY29tbWVudExpc3QiLCJuYXZiYXIiLCJtZXRob2RzIiwiZnJlc2giLCJ3ZXB5Iiwic2V0U3RvcmFnZVN5bmMiLCJpbml0Iiwic3VibWl0Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJtYXNrIiwiYXBpIiwiY29tbWVudCIsImlkIiwidGhlbiIsImNvbnNvbGUiLCJlcnJvciIsImVyciIsImlucHV0IiwiZXZlbnQiLCJ2YWx1ZSIsImRldGFpbCIsInRyaW0iLCJldmVudHMiLCJ3YXRjaCIsImNvbXB1dGVkIiwiZmV0Y2hDb21tZW50cyIsIiRhcHBseSIsInJlcyIsInB1c2giLCJvcHRpb25zIiwiZm9jdXMiLCJsb2ciLCIkcGFyZW50IiwiZ2V0VXNlckluZm8iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsTSxHQUFTO0FBQ1BDLHVCQUFpQjtBQURWLEssUUFJVEMsSSxHQUFPO0FBQ0xDLGtCQUFZLENBRFA7QUFFTEMsYUFBTyxDQUZGO0FBR0xDLFlBQU0sRUFIRDtBQUlMQyxZQUFNLFdBSkQ7QUFLTEMsZ0JBQVUsRUFMTDtBQU1MQyxlQUFTLEtBTko7QUFPTEMsWUFBTSxJQVBEO0FBUUxDLGlCQUFXLEtBUk47QUFTTEMsaUJBQVc7QUFUTixLLFFBWVJDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLGVBQWMsRUFBQyxnQkFBZSxFQUFo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UWlCLEdBQVIsQ0FBWSxLQUFLeEMsU0FBakI7QUFDRDs7OzhCQUVTO0FBQUE7O0FBQ1IsV0FBS3lDLE9BQUwsQ0FBYUMsV0FBYixDQUF5QixnQkFBUTtBQUMvQixlQUFLM0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsZUFBS21DLGFBQUw7QUFDQSxlQUFLQyxNQUFMO0FBQ0QsT0FKRDtBQUtEOzs7b0NBRWU7QUFDZCxXQUFLRCxhQUFMO0FBQ0Q7Ozs7RUF2R3NDeEIsZUFBS2lDLEk7O2tCQUF6QnRELFciLCJmaWxlIjoiY29tbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgY29tbWVudExpc3QgZnJvbSAnLi9jb21tZW50LWxpc3QnO1xuaW1wb3J0IG5hdmJhciBmcm9tICcuLi8uLi9jb21wb25lbnRzL25hdmJhcic7XG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL2FwaS93YWxscGFwZXItYXBpJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWVudFBhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gICAgYmFja2dyb3VuZENvbG9yOiAnIzEwMTAxMCdcbiAgfTtcblxuICBkYXRhID0ge1xuICAgIHRvdGFsUGFnZXM6IDEsXG4gICAgaW5kZXg6IDAsXG4gICAgc2l6ZTogMjAsXG4gICAgdHlwZTogJ3dhbGxwYXBlcicsXG4gICAgY29tbWVudHM6IFtdLFxuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIHVzZXI6IG51bGwsXG4gICAgYXV0b0ZvY3VzOiBmYWxzZSxcbiAgICBpbml0VmFsdWU6ICcnXG4gIH07XG5cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImNvbW1lbnRMaXN0XCI6e1wieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpjb21tZW50cy5zeW5jXCI6XCJjb21tZW50c1wiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwibmF2YmFyXCI6e1wicGFkZGluZ1wiOlwidHJ1ZVwiLFwidGl0bGVcIjpcIuWFqOmDqOivtOivtFwifX07XHJcbiRldmVudHMgPSB7XCJjb21tZW50TGlzdFwiOntcInYtb246ZnJlc2hcIjpcImZyZXNoXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgY29tbWVudExpc3QsXG4gICAgbmF2YmFyXG4gIH07XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnRvdGFsUGFnZXMgPSAxO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIHRoaXMuY29tbWVudHMgPSBbXTtcbiAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmZldGNoQ29tbWVudHMoKTtcbiAgICB0aGlzLmluaXRWYWx1ZSA9ICcnO1xuICAgIHRoaXMuJGFwcGx5KCk7XG4gIH1cblxuICBmZXRjaENvbW1lbnRzKCkge1xuICAgIGlmICh0aGlzLnRvdGFsUGFnZXMgPD0gdGhpcy5pbmRleCB8fCB0aGlzLmxvYWRpbmcpIHJldHVybjtcbiAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgIGFwaS5mZXRjaENvbW1lbnRzKHRoaXMuaWQsIHRoaXMudHlwZSwgdGhpcy5pbmRleCwgdGhpcy5zaXplLCB0aGlzLnVzZXIgPyB0aGlzLnVzZXIuaWQgOiAtMSkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy50b3RhbFBhZ2VzID0gcmVzLnRvdGFsUGFnZXM7XG4gICAgICB0aGlzLmluZGV4Kys7XG4gICAgICB0aGlzLmNvbW1lbnRzLnB1c2goLi4ucmVzLmNvbW1lbnRzKTtcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSk7XG4gIH1cblxuICBtZXRob2RzID0ge1xuICAgIGZyZXNoKCkge1xuICAgICAgd2VweS5zZXRTdG9yYWdlU3luYyh0aGlzLnR5cGUsICd0cnVlJyk7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9LFxuICAgIHN1Ym1pdCgpIHtcbiAgICAgIC8vIGxldCB2YWx1ZSA9IGV2ZW50LmRldGFpbC52YWx1ZS50cmltKCk7XG4gICAgICAvLyB0aGlzLmluaXRWYWx1ZSA9IHZhbHVlO1xuICAgICAgaWYgKCF0aGlzLnVzZXIpIHtcbiAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn55m75b2V5ZCO5omN6IO96K+E5Lu3JywgLy8g5o+Q56S655qE5YaF5a65LFxuICAgICAgICAgIGljb246ICdub25lJywgLy8g5Zu+5qCHLFxuICAgICAgICAgIGR1cmF0aW9uOiAyMDAwLCAvLyDlu7bov5/ml7bpl7QsXG4gICAgICAgICAgbWFzazogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaW5pdFZhbHVlKSB7XG4gICAgICAgIGFwaS5jb21tZW50KHRoaXMudHlwZSwgdGhpcy5pZCwgdGhpcy5pbml0VmFsdWUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmModGhpcy50eXBlLCAndHJ1ZScpO1xuICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpbnB1dChldmVudCkge1xuICAgICAgbGV0IHZhbHVlID0gZXZlbnQuZGV0YWlsLnZhbHVlLnRyaW0oKTtcbiAgICAgIHRoaXMuaW5pdFZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9O1xuXG4gIGV2ZW50cyA9IHt9O1xuXG4gIHdhdGNoID0ge307XG5cbiAgY29tcHV0ZWQgPSB7fTtcblxuICBvbkxvYWQob3B0aW9ucykge1xuICAgIHRoaXMuaWQgPSBvcHRpb25zLmlkO1xuICAgIHRoaXMuYXV0b0ZvY3VzID0gb3B0aW9ucy5mb2N1cyA9PT0gJ3RydWUnO1xuICAgIHRoaXMudHlwZSA9IG9wdGlvbnMudHlwZSB8fCAnd2FsbHBhcGVyJztcbiAgICBjb25zb2xlLmxvZyh0aGlzLmF1dG9Gb2N1cyk7XG4gIH07XG5cbiAgb25SZWFkeSgpIHtcbiAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8odXNlciA9PiB7XG4gICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgdGhpcy5mZXRjaENvbW1lbnRzKCk7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgdGhpcy5mZXRjaENvbW1lbnRzKCk7XG4gIH07XG59XG4iXX0=