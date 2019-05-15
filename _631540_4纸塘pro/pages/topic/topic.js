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

var _commentList = require("./../detail/comment-list.js");

var _commentList2 = _interopRequireDefault(_commentList);

var _wallpaperApi = require("./../../api/wallpaper-api.js");

var _wallpaperApi2 = _interopRequireDefault(_wallpaperApi);

var _back = require("./../../mixins/back.js");

var _back2 = _interopRequireDefault(_back);

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
        _this), _this.config = {}, _this.data = {
            id: null,
            topic: null,
            imgs: [],
            navHeight: 261,
            comments: []
        }, _this.$repeat = {}, _this.$props = {
            "comment-list": {
                "xmlns:v-bind": "",
                "v-bind:comments.sync": "comments",
                "xmlns:v-on": ""
            },
            loading: {
                "xmlns:wx": ""
            }
        }, _this.$events = {
            "comment-list": {
                "v-on:fresh": "fresh"
            }
        }, _this.components = {
            "comment-list": _commentList2.default,
            loading: _loading2.default
        }, _this.mixins = [ _back2.default ], _this.methods = {
            timeline: function timeline() {
                _wepy2.default.showToast({
                    title: "该功能即将开放",
                    // 提示的内容,
                    icon: "none",
                    duration: 2e3
                });
            },
            fresh: function fresh() {
                this.loadComments();
            },
            goPicDetail: function goPicDetail(id) {
                _wepy2.default.navigateTo({
                    url: "/pages/detail/detail?id=" + id
                });
            },
            lookDetail: function lookDetail(focus) {
                _wepy2.default.navigateTo({
                    url: "/pages/detail/comment?id=" + this.id + "&type=topic&focus=" + focus
                });
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {
            marginHeight: function marginHeight() {
                return _this.$parent.globalData.navHeight;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Example, [ {
        key: "onShow",
        value: function onShow() {
            if (_wepy2.default.getStorageSync("topic") === "true") {
                _wepy2.default.removeStorageSync("topic");
                this.loadComments();
            }
        }
    }, {
        key: "onLoad",
        value: function onLoad(options) {
            this.id = options.id;
        }
    }, {
        key: "fetchTopic",
        value: function fetchTopic() {
            var _this2 = this;
            _wallpaperApi2.default.fetchTopicById(this.id).then(function(res) {
                _this2.topic = res.topic;
                _this2.imgs = res.imgs;
                _this2.$apply();
            });
        }
    }, {
        key: "loadComments",
        value: function loadComments() {
          return
            var _this3 = this;
            _wallpaperApi2.default.fetchComments(this.id, "topic", 0, 2, this.user ? this.user.id : -1).then(function(res) {
                _this3.comments = res.comments;
                _this3.topic.commentNum = res.totalItem;
                _this3.$apply();
            }, function(err) {
                console.error(err);
            });
        }
    }, {
        key: "onReady",
        value: function onReady() {
            var _this4 = this;
            this.fetchTopic();
            this.$parent.getUserInfo(function(user) {
                _this4.user = user;
                _this4.loadComments();
                _this4.$apply();
            });
        }
    }, {
        key: "onShareAppMessage",
        value: function onShareAppMessage() {
            return {
                title: this.topic.title,
                path: "/pages/topic/topic?id=" + this.id
            };
        }
    } ]);
    return Example;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Example, "pages/topic/topic"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvcGljLmpzIl0sIm5hbWVzIjpbIkV4YW1wbGUiLCJjb25maWciLCJkYXRhIiwiaWQiLCJ0b3BpYyIsImltZ3MiLCJuYXZIZWlnaHQiLCJjb21tZW50cyIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsImNvbW1lbnRMaXN0IiwibG9hZGluZyIsIm1peGlucyIsIkJhY2tNaXhpbiIsIm1ldGhvZHMiLCJ0aW1lbGluZSIsIndlcHkiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImZyZXNoIiwibG9hZENvbW1lbnRzIiwiZ29QaWNEZXRhaWwiLCJuYXZpZ2F0ZVRvIiwidXJsIiwibG9va0RldGFpbCIsImZvY3VzIiwiZXZlbnRzIiwid2F0Y2giLCJjb21wdXRlZCIsIm1hcmdpbkhlaWdodCIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiZ2V0U3RvcmFnZVN5bmMiLCJyZW1vdmVTdG9yYWdlU3luYyIsIm9wdGlvbnMiLCJhcGkiLCJmZXRjaFRvcGljQnlJZCIsInRoZW4iLCJyZXMiLCIkYXBwbHkiLCJmZXRjaENvbW1lbnRzIiwidXNlciIsImNvbW1lbnROdW0iLCJ0b3RhbEl0ZW0iLCJjb25zb2xlIiwiZXJyb3IiLCJlcnIiLCJmZXRjaFRvcGljIiwiZ2V0VXNlckluZm8iLCJwYXRoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLE0sR0FBUyxFLFFBQ1RDLEksR0FBTztBQUNMQyxVQUFJLElBREM7QUFFTEMsYUFBTyxJQUZGO0FBR0xDLFlBQU0sRUFIRDtBQUlMQyxpQkFBVyxHQUpOO0FBS0xDLGdCQUFVO0FBTEwsSyxRQU9SQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxnQkFBZSxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHdCQUF1QixVQUExQyxFQUFxRCxjQUFhLEVBQWxFLEVBQWhCLEVBQXNGLFdBQVUsRUFBQyxZQUFXLEVBQVosRUFBaEcsRSxRQUNUQyxPLEdBQVUsRUFBQyxnQkFBZSxFQUFDLGNBQWEsT0FBZCxFQUFoQixFLFFBQ1RDLFUsR0FBYTtBQUNWLHNCQUFnQkMscUJBRE47QUFFVkM7QUFGVSxLLFFBSVpDLE0sR0FBUyxDQUFDQyxjQUFELEMsUUFDVEMsTyxHQUFVO0FBQ1JDLGNBRFEsc0JBQ0c7QUFDVEMsdUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxpQkFBTyxTQURNLEVBQ0s7QUFDbEJDLGdCQUFNLE1BRk87QUFHYkMsb0JBQVU7QUFIRyxTQUFmO0FBS0QsT0FQTztBQVFSQyxXQVJRLG1CQVFBO0FBQ04sYUFBS0MsWUFBTDtBQUNELE9BVk87QUFXUkMsaUJBWFEsdUJBV0l0QixFQVhKLEVBV1E7QUFDZGUsdUJBQUtRLFVBQUwsQ0FBZ0I7QUFDZEMsNENBQWdDeEI7QUFEbEIsU0FBaEI7QUFHRCxPQWZPO0FBZ0JSeUIsZ0JBaEJRLHNCQWdCR0MsS0FoQkgsRUFnQlU7QUFDaEJYLHVCQUFLUSxVQUFMLENBQWdCO0FBQ2RDLDZDQUFpQyxLQUFLeEIsRUFBdEMsMEJBQTZEMEI7QUFEL0MsU0FBaEI7QUFHRDtBQXBCTyxLLFFBc0JWQyxNLEdBQVMsRSxRQUNUQyxLLEdBQVEsRSxRQUNSQyxRLEdBQVc7QUFDVEMsb0JBQWMsd0JBQU07QUFDbEIsZUFBTyxNQUFLQyxPQUFMLENBQWFDLFVBQWIsQ0FBd0I3QixTQUEvQjtBQUNEO0FBSFEsSzs7Ozs7NkJBS0Y7QUFDUCxVQUFJWSxlQUFLa0IsY0FBTCxDQUFvQixPQUFwQixNQUFpQyxNQUFyQyxFQUE2QztBQUMzQ2xCLHVCQUFLbUIsaUJBQUwsQ0FBdUIsT0FBdkI7QUFDQSxhQUFLYixZQUFMO0FBQ0Q7QUFDRjs7OzJCQUNNYyxPLEVBQVM7QUFDZCxXQUFLbkMsRUFBTCxHQUFVbUMsUUFBUW5DLEVBQWxCO0FBQ0Q7OztpQ0FDWTtBQUFBOztBQUNYb0MsNkJBQUlDLGNBQUosQ0FBbUIsS0FBS3JDLEVBQXhCLEVBQTRCc0MsSUFBNUIsQ0FBaUMsZUFBTztBQUN0QyxlQUFLckMsS0FBTCxHQUFhc0MsSUFBSXRDLEtBQWpCO0FBQ0EsZUFBS0MsSUFBTCxHQUFZcUMsSUFBSXJDLElBQWhCO0FBQ0EsZUFBS3NDLE1BQUw7QUFDRCxPQUpEO0FBS0Q7OzttQ0FDYztBQUFBOztBQUNiSiw2QkFBSUssYUFBSixDQUFrQixLQUFLekMsRUFBdkIsRUFBMkIsT0FBM0IsRUFBb0MsQ0FBcEMsRUFBdUMsQ0FBdkMsRUFBMEMsS0FBSzBDLElBQUwsR0FBWSxLQUFLQSxJQUFMLENBQVUxQyxFQUF0QixHQUEyQixDQUFDLENBQXRFLEVBQXlFc0MsSUFBekUsQ0FBOEUsZUFBTztBQUNuRixlQUFLbEMsUUFBTCxHQUFnQm1DLElBQUluQyxRQUFwQjtBQUNBLGVBQUtILEtBQUwsQ0FBVzBDLFVBQVgsR0FBd0JKLElBQUlLLFNBQTVCO0FBQ0EsZUFBS0osTUFBTDtBQUNELE9BSkQsRUFJRyxlQUFPO0FBQ1JLLGdCQUFRQyxLQUFSLENBQWNDLEdBQWQ7QUFDRCxPQU5EO0FBT0Q7Ozs4QkFDUztBQUFBOztBQUNSLFdBQUtDLFVBQUw7QUFDQSxXQUFLakIsT0FBTCxDQUFha0IsV0FBYixDQUF5QixnQkFBUTtBQUMvQixlQUFLUCxJQUFMLEdBQVlBLElBQVo7QUFDQSxlQUFLckIsWUFBTDtBQUNBLGVBQUttQixNQUFMO0FBQ0QsT0FKRDtBQUtEOzs7d0NBQ21CO0FBQ2xCLGFBQU87QUFDTHZCLGVBQU8sS0FBS2hCLEtBQUwsQ0FBV2dCLEtBRGI7QUFFTGlDLHlDQUErQixLQUFLbEQ7QUFGL0IsT0FBUDtBQUlEOzs7O0VBcEZrQ2UsZUFBS29DLEk7O2tCQUFyQnRELE8iLCJmaWxlIjoidG9waWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IGNvbW1lbnRMaXN0IGZyb20gJy4uL2RldGFpbC9jb21tZW50LWxpc3QnO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvd2FsbHBhcGVyLWFwaSc7XG5pbXBvcnQgQmFja01peGluIGZyb20gJy4uLy4uL21peGlucy9iYWNrJztcbmltcG9ydCBsb2FkaW5nIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbG9hZGluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4YW1wbGUgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7fTtcbiAgZGF0YSA9IHtcbiAgICBpZDogbnVsbCxcbiAgICB0b3BpYzogbnVsbCxcbiAgICBpbWdzOiBbXSxcbiAgICBuYXZIZWlnaHQ6IDI2MSxcbiAgICBjb21tZW50czogW11cbiAgfTtcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImNvbW1lbnQtbGlzdFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Y29tbWVudHMuc3luY1wiOlwiY29tbWVudHNcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImxvYWRpbmdcIjp7XCJ4bWxuczp3eFwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcImNvbW1lbnQtbGlzdFwiOntcInYtb246ZnJlc2hcIjpcImZyZXNoXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgJ2NvbW1lbnQtbGlzdCc6IGNvbW1lbnRMaXN0LFxuICAgIGxvYWRpbmdcbiAgfTtcbiAgbWl4aW5zID0gW0JhY2tNaXhpbl07XG4gIG1ldGhvZHMgPSB7XG4gICAgdGltZWxpbmUoKSB7XG4gICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgIHRpdGxlOiAn6K+l5Yqf6IO95Y2z5bCG5byA5pS+JywgLy8g5o+Q56S655qE5YaF5a65LFxuICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGZyZXNoKCkge1xuICAgICAgdGhpcy5sb2FkQ29tbWVudHMoKTtcbiAgICB9LFxuICAgIGdvUGljRGV0YWlsKGlkKSB7XG4gICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IGAvcGFnZXMvZGV0YWlsL2RldGFpbD9pZD0ke2lkfWBcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgbG9va0RldGFpbChmb2N1cykge1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiBgL3BhZ2VzL2RldGFpbC9jb21tZW50P2lkPSR7dGhpcy5pZH0mdHlwZT10b3BpYyZmb2N1cz0ke2ZvY3VzfWBcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgZXZlbnRzID0ge307XG4gIHdhdGNoID0ge307XG4gIGNvbXB1dGVkID0ge1xuICAgIG1hcmdpbkhlaWdodDogKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLm5hdkhlaWdodDtcbiAgICB9XG4gIH07XG4gIG9uU2hvdygpIHtcbiAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygndG9waWMnKSA9PT0gJ3RydWUnKSB7XG4gICAgICB3ZXB5LnJlbW92ZVN0b3JhZ2VTeW5jKCd0b3BpYycpO1xuICAgICAgdGhpcy5sb2FkQ29tbWVudHMoKTtcbiAgICB9XG4gIH1cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLmlkID0gb3B0aW9ucy5pZDtcbiAgfTtcbiAgZmV0Y2hUb3BpYygpIHtcbiAgICBhcGkuZmV0Y2hUb3BpY0J5SWQodGhpcy5pZCkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy50b3BpYyA9IHJlcy50b3BpYztcbiAgICAgIHRoaXMuaW1ncyA9IHJlcy5pbWdzO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9KTtcbiAgfVxuICBsb2FkQ29tbWVudHMoKSB7XG4gICAgYXBpLmZldGNoQ29tbWVudHModGhpcy5pZCwgJ3RvcGljJywgMCwgMiwgdGhpcy51c2VyID8gdGhpcy51c2VyLmlkIDogLTEpLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuY29tbWVudHMgPSByZXMuY29tbWVudHM7XG4gICAgICB0aGlzLnRvcGljLmNvbW1lbnROdW0gPSByZXMudG90YWxJdGVtO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xuICB9XG4gIG9uUmVhZHkoKSB7XG4gICAgdGhpcy5mZXRjaFRvcGljKCk7XG4gICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKHVzZXIgPT4ge1xuICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICAgIHRoaXMubG9hZENvbW1lbnRzKCk7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0pO1xuICB9O1xuICBvblNoYXJlQXBwTWVzc2FnZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMudG9waWMudGl0bGUsXG4gICAgICBwYXRoOiBgL3BhZ2VzL3RvcGljL3RvcGljP2lkPSR7dGhpcy5pZH1gXG4gICAgfTtcbiAgfVxufVxuIl19