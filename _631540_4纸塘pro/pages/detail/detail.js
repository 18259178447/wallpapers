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

var _download = require("./../download/download.js");

var _download2 = _interopRequireDefault(_download);

var _wallpaperApi = require("./../../api/wallpaper-api.js");

var _wallpaperApi2 = _interopRequireDefault(_wallpaperApi);

var _back = require("./../../mixins/back.js");

var _back2 = _interopRequireDefault(_back);

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

var Detail = function(_wepy$page) {
    _inherits(Detail, _wepy$page);
    function Detail() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Detail);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Detail.__proto__ || Object.getPrototypeOf(Detail)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {
            enablePullDownRefresh: true,
            backgroundColor: "#101010"
        }, _this.data = {
            id: null,
            statusHeight: 22,
            picture: null,
            isBig: false,
            author: null,
            comments: [],
            totalItem: 0,
            user: null,
            bottomHeight: 0,
            needLogin: false
        }, _this.mixins = [ _back2.default ], _this.$repeat = {}, _this.$props = {
            commentList: {
                "xmlns:v-bind": "",
                "v-bind:comments.sync": "comments",
                "xmlns:v-on": ""
            },
            download: {
                "v-bind:picture.sync": "picture",
                "v-bind:id.sync": "id",
                "v-bind:user.sync": "user"
            }
        }, _this.$events = {
            commentList: {
                "v-on:fresh": "fetchComments"
            },
            download: {
                "v-on:pay": "pay"
            }
        }, _this.components = {
            commentList: _commentList2.default,
            download: _download2.default
        }, _this.methods = {
            copyCode: function copyCode() {
                _wepy2.default.setClipboardData({
                    data: this.picture.code,
                    // 需要设置的内容,
                    success: function success(res) {
                        _wepy2.default.showToast({
                            title: "壁纸码复制成功",
                            // 提示的内容,
                            icon: "success",
                            // 图标,
                            duration: 2e3
                        });
                    }
                });
            },
            lookAuthor: function lookAuthor() {
                var routes = this.getCurrentPages();
                if (routes.length > 1 && routes[routes.length - 2].route === "pages/person/index") {
                    _wepy2.default.navigateBack();
                } else {
                    this.$navigate("/pages/person/index", {
                        id: this.author.id
                    });
                }
                // console.log(this.getCurrentPages());
                        },
            zan: function zan() {
                var _this2 = this;
                if (this.user) {
                    if (this.picture.zan) {
                        _wepy2.default.showModal({
                            content: "确定要取消点赞吗?",
                            // 提示的内容,
                            showCancel: true,
                            // 是否显示取消按钮,
                            cancelText: "取消",
                            // 取消按钮的文字，默认为取消，最多 4 个字符,
                            cancelColor: "#000000",
                            // 取消按钮的文字颜色,
                            confirmText: "确定",
                            // 确定按钮的文字，默认为取消，最多 4 个字符,
                            confirmColor: "#ffe725",
                            // 确定按钮的文字颜色,
                            success: function success(res) {
                                if (res.confirm) {
                                    _this2.likePicture();
                                }
                            }
                        });
                    } else {
                        this.likePicture();
                    }
                } else {
                    _wepy2.default.navigateTo({
                        url: "/pages/login/login"
                    });
                }
            },
            download: function download() {
                var _this3 = this;
                wx.getSetting({
                    success: function success(res) {
                        if (!res.authSetting["scope.writePhotosAlbum"]) {
                            wx.authorize({
                                scope: "scope.writePhotosAlbum",
                                success: function success(res) {
                                    _this3.downloadPic();
                                },
                                fail: function fail(res) {
                                    _wepy2.default.showModal({
                                        content: "下载需要保存到相册的权限",
                                        // 提示的内容,
                                        showCancel: true,
                                        // 是否显示取消按钮,
                                        cancelText: "取消",
                                        // 取消按钮的文字，默认为取消，最多 4 个字符,
                                        cancelColor: "#000000",
                                        // 取消按钮的文字颜色,
                                        confirmText: "去设置",
                                        // 确定按钮的文字，默认为取消，最多 4 个字符,
                                        confirmColor: "#ffe725",
                                        // 确定按钮的文字颜色,
                                        success: function success(res) {
                                            if (res.confirm) {
                                                _wepy2.default.openSetting();
                                            }
                                        }
                                    });
                                }
                            });
                        } else {
                            _this3.downloadPic();
                        }
                    }
                });
            },
            collect: function collect() {
                var _this4 = this;
                if (this.user) {
                    if (this.picture.collected) {
                        _wepy2.default.showModal({
                            content: "确定要取消收藏吗?",
                            // 提示的内容,
                            showCancel: true,
                            // 是否显示取消按钮,
                            cancelText: "取消",
                            // 取消按钮的文字，默认为取消，最多 4 个字符,
                            cancelColor: "#000000",
                            // 取消按钮的文字颜色,
                            confirmText: "确定",
                            // 确定按钮的文字，默认为取消，最多 4 个字符,
                            confirmColor: "#ffe725",
                            // 确定按钮的文字颜色,
                            success: function success(res) {
                                if (res.confirm) {
                                    _this4.collectPicture();
                                }
                            }
                        });
                    } else {
                        this.collectPicture();
                    }
                } else {
                    _wepy2.default.navigateTo({
                        url: "/pages/login/login"
                    });
                }
            },
            lookDetail: function lookDetail(focus) {
                _wepy2.default.navigateTo({
                    url: "/pages/detail/comment?id=" + this.id + "&focus=" + focus
                });
            },
            pay: function pay() {
                if (this.author.payUrl) {
                    _wepy2.default.previewImage({
                        urls: [ this.author.payUrl ]
                    });
                } else {
                    _wepy2.default.showToast({
                        title: "作者还未开通赞赏",
                        // 提示的内容,
                        icon: "none",
                        // 图标,
                        duration: 2e3
                    });
                }
            },
            fetchComments: function fetchComments() {
                this.loadComments();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Detail, [ {
        key: "downloadPic",
        value: function downloadPic() {
            this.getUserInfo(true);
            var show = "true";
            if (this.user && !this.picture.isBig) {
                show = "false";
            }
            if (!this.user && !this.picture.isBig) {
                _wepy2.default.navigateTo({
                    url: "/pages/login/login"
                });
            } else {
                this.needLogin = true;
                this.$invoke("download", "show", show);
            }
        }
    }, {
        key: "onShareAppMessage",
        value: function onShareAppMessage() {
            return {
                title: "这么好看的壁纸一定适合你",
                path: "/pages/detail/detail?id=" + this.picture.id,
                imageUrl: this.picture.url,
                success: function success(res) {},
                fail: function fail() {},
                complete: function complete() {}
            };
        }
    }, {
        key: "likePicture",
        value: function likePicture() {
            var _this5 = this;
            _wallpaperApi2.default.zan(this.id, !this.picture.zan).then(function(res) {
                _this5.picture.zan = !_this5.picture.zan;
                if (_this5.picture.zan) {
                    _this5.picture.zanNum++;
                } else {
                    _this5.picture.zanNum--;
                }
                _this5.$apply();
            }, function(err) {
                console.error(err);
            });
        }
    }, {
        key: "collectPicture",
        value: function collectPicture() {
            var _this6 = this;
            _wallpaperApi2.default.collection(this.id, !this.picture.collected).then(function(res) {
                _this6.picture.collected = !_this6.picture.collected;
                _this6.$apply();
            }, function(err) {
                console.error(err);
            });
        }
    }, {
        key: "onShow",
        value: function onShow() {
            if (_wepy2.default.getStorageSync("wallpaper") === "true") {
                _wepy2.default.removeStorageSync("wallpaper");
                this.loadComments();
            }
            if (this.needLogin) {
                this.needLogin = false;
                this.getUserInfo(true);
            } else {
                this.getUserInfo(false);
            }
        }
    }, {
        key: "onLoad",
        value: function onLoad(options) {
            this.id = options.id;
            this.statusHeight = this.$parent.globalData.navHeight;
            this.bottomHeight = this.$parent.globalData.isIpx ? 24 : 0;
        }
    }, {
        key: "loadImage",
        value: function loadImage() {
            var _this7 = this;
            _wallpaperApi2.default.fetchWallpaper(this.id).then(function(res) {
                _this7.picture = res.picture;
                _this7.author = res.author;
                _this7.totalItem = res.picture.commentNum;
                _this7.getUserInfo(false);
                _wepy2.default.hideLoading();
                _this7.$apply();
            }, function(err) {
                console.error(err);
            });
        }
    }, {
        key: "loadComments",
        value: function loadComments() {
            var _this8 = this;
            _wallpaperApi2.default.fetchComments(this.id, "wallpaper", 0, 2, this.user ? this.user.id : -1).then(function(res) {
                _this8.comments = res.comments;
                _this8.totalItem = res.totalItem;
                _this8.$apply();
            }, function(err) {
                console.error(err);
            });
        }
    }, {
        key: "getUserInfo",
        value: function getUserInfo(detail) {
            var _this9 = this;
            this.$parent.getUserInfo(function(user) {
                _this9.user = user;
                if (!detail && _this9.totalItem > 0) {
                    _this9.loadComments();
                }
                _this9.$apply();
            }, !!detail);
        }
    }, {
        key: "onPullDownRefresh",
        value: function onPullDownRefresh() {
            _wepy2.default.navigateBack({
                delta: 1
            });
        }
    }, {
        key: "onReady",
        value: function onReady() {
            _wepy2.default.showLoading({
                title: "加载中...",
                // 提示的内容,
                mask: true
            });
            this.loadImage();
        }
    } ]);
    return Detail;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Detail, "pages/detail/detail"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC5qcyJdLCJuYW1lcyI6WyJEZXRhaWwiLCJjb25maWciLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJiYWNrZ3JvdW5kQ29sb3IiLCJkYXRhIiwiaWQiLCJzdGF0dXNIZWlnaHQiLCJwaWN0dXJlIiwiaXNCaWciLCJhdXRob3IiLCJjb21tZW50cyIsInRvdGFsSXRlbSIsInVzZXIiLCJib3R0b21IZWlnaHQiLCJuZWVkTG9naW4iLCJtaXhpbnMiLCJCYWNrTWl4aW4iLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJjb21tZW50TGlzdCIsImRvd25sb2FkIiwibWV0aG9kcyIsImNvcHlDb2RlIiwid2VweSIsInNldENsaXBib2FyZERhdGEiLCJjb2RlIiwic3VjY2VzcyIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwibG9va0F1dGhvciIsInJvdXRlcyIsImdldEN1cnJlbnRQYWdlcyIsImxlbmd0aCIsInJvdXRlIiwibmF2aWdhdGVCYWNrIiwiJG5hdmlnYXRlIiwiemFuIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJjYW5jZWxUZXh0IiwiY2FuY2VsQ29sb3IiLCJjb25maXJtVGV4dCIsImNvbmZpcm1Db2xvciIsInJlcyIsImNvbmZpcm0iLCJsaWtlUGljdHVyZSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ3eCIsImdldFNldHRpbmciLCJhdXRoU2V0dGluZyIsImF1dGhvcml6ZSIsInNjb3BlIiwiZG93bmxvYWRQaWMiLCJmYWlsIiwib3BlblNldHRpbmciLCJjb2xsZWN0IiwiY29sbGVjdGVkIiwiY29sbGVjdFBpY3R1cmUiLCJsb29rRGV0YWlsIiwiZm9jdXMiLCJwYXkiLCJwYXlVcmwiLCJwcmV2aWV3SW1hZ2UiLCJ1cmxzIiwiZmV0Y2hDb21tZW50cyIsImxvYWRDb21tZW50cyIsImdldFVzZXJJbmZvIiwic2hvdyIsIiRpbnZva2UiLCJwYXRoIiwiaW1hZ2VVcmwiLCJjb21wbGV0ZSIsImFwaSIsInRoZW4iLCJ6YW5OdW0iLCIkYXBwbHkiLCJjb25zb2xlIiwiZXJyb3IiLCJlcnIiLCJjb2xsZWN0aW9uIiwiZ2V0U3RvcmFnZVN5bmMiLCJyZW1vdmVTdG9yYWdlU3luYyIsIm9wdGlvbnMiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIm5hdkhlaWdodCIsImlzSXB4IiwiZmV0Y2hXYWxscGFwZXIiLCJjb21tZW50TnVtIiwiaGlkZUxvYWRpbmciLCJkZXRhaWwiLCJkZWx0YSIsInNob3dMb2FkaW5nIiwibWFzayIsImxvYWRJbWFnZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7Ozs7c0xBQ25CQyxNLEdBQVM7QUFDUEMsNkJBQXVCLElBRGhCO0FBRVBDLHVCQUFpQjtBQUZWLEssUUFLVEMsSSxHQUFPO0FBQ0xDLFVBQUksSUFEQztBQUVMQyxvQkFBYyxFQUZUO0FBR0xDLGVBQVMsSUFISjtBQUlMQyxhQUFPLEtBSkY7QUFLTEMsY0FBUSxJQUxIO0FBTUxDLGdCQUFVLEVBTkw7QUFPTEMsaUJBQVcsQ0FQTjtBQVFMQyxZQUFNLElBUkQ7QUFTTEMsb0JBQWMsQ0FUVDtBQVVMQyxpQkFBVztBQVZOLEssUUFhUEMsTSxHQUFTLENBQUNDLGNBQUQsQyxRQUVWQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxlQUFjLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsd0JBQXVCLFVBQTFDLEVBQXFELGNBQWEsRUFBbEUsRUFBZixFQUFxRixZQUFXLEVBQUMsdUJBQXNCLFNBQXZCLEVBQWlDLGtCQUFpQixJQUFsRCxFQUF1RCxvQkFBbUIsTUFBMUUsRUFBaEcsRSxRQUNUQyxPLEdBQVUsRUFBQyxlQUFjLEVBQUMsY0FBYSxlQUFkLEVBQWYsRUFBOEMsWUFBVyxFQUFDLFlBQVcsS0FBWixFQUF6RCxFLFFBQ1RDLFUsR0FBYTtBQUNWQyx3Q0FEVTtBQUVW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Q0FFYztBQUFBOztBQUNiTiw2QkFBSVIsYUFBSixDQUFrQixLQUFLakUsRUFBdkIsRUFBMkIsV0FBM0IsRUFBd0MsQ0FBeEMsRUFBMkMsQ0FBM0MsRUFBOEMsS0FBS08sSUFBTCxHQUFZLEtBQUtBLElBQUwsQ0FBVVAsRUFBdEIsR0FBMkIsQ0FBQyxDQUExRSxFQUE2RTBFLElBQTdFLENBQWtGLGVBQU87QUFDdkYsZUFBS3JFLFFBQUwsR0FBZ0JzQyxJQUFJdEMsUUFBcEI7QUFDQSxlQUFLQyxTQUFMLEdBQWlCcUMsSUFBSXJDLFNBQXJCO0FBQ0EsZUFBS3NFLE1BQUw7QUFDRCxPQUpELEVBSUcsZUFBTztBQUNSQyxnQkFBUUMsS0FBUixDQUFjQyxHQUFkO0FBQ0QsT0FORDtBQU9EOzs7Z0NBRVdZLE0sRUFBUTtBQUFBOztBQUNsQixXQUFLUCxPQUFMLENBQWFqQixXQUFiLENBQXlCLGdCQUFRO0FBQy9CLGVBQUs1RCxJQUFMLEdBQVlBLElBQVo7QUFDQSxZQUFJLENBQUNvRixNQUFELElBQVcsT0FBS3JGLFNBQUwsR0FBaUIsQ0FBaEMsRUFBbUM7QUFDakMsaUJBQUs0RCxZQUFMO0FBQ0Q7QUFDRCxlQUFLVSxNQUFMO0FBQ0QsT0FORCxFQU1HLENBQUMsQ0FBQ2UsTUFOTDtBQU9EOzs7d0NBRW1CO0FBQ2xCdkUscUJBQUthLFlBQUwsQ0FBa0I7QUFDaEIyRCxlQUFPO0FBRFMsT0FBbEI7QUFHRDs7OzhCQUVTO0FBQ1J4RSxxQkFBS3lFLFdBQUwsQ0FBaUI7QUFDZnBFLGVBQU8sUUFEUSxFQUNFO0FBQ2pCcUUsY0FBTTtBQUZTLE9BQWpCO0FBSUEsV0FBS0MsU0FBTDtBQUNEOzs7O0VBcFFpQzNFLGVBQUs0RSxJOztrQkFBcEJyRyxNIiwiZmlsZSI6ImRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgY29tbWVudExpc3QgZnJvbSAnLi9jb21tZW50LWxpc3QnO1xuaW1wb3J0IGRvd25sb2FkIGZyb20gJy4uL2Rvd25sb2FkL2Rvd25sb2FkJztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL3dhbGxwYXBlci1hcGknO1xuaW1wb3J0IEJhY2tNaXhpbiBmcm9tICcuLi8uLi9taXhpbnMvYmFjayc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IHRydWUsXG4gICAgYmFja2dyb3VuZENvbG9yOiAnIzEwMTAxMCdcbiAgfTtcblxuICBkYXRhID0ge1xuICAgIGlkOiBudWxsLFxuICAgIHN0YXR1c0hlaWdodDogMjIsXG4gICAgcGljdHVyZTogbnVsbCxcbiAgICBpc0JpZzogZmFsc2UsXG4gICAgYXV0aG9yOiBudWxsLFxuICAgIGNvbW1lbnRzOiBbXSxcbiAgICB0b3RhbEl0ZW06IDAsXG4gICAgdXNlcjogbnVsbCxcbiAgICBib3R0b21IZWlnaHQ6IDAsXG4gICAgbmVlZExvZ2luOiBmYWxzZVxuICB9O1xuXG4gIG1peGlucyA9IFtCYWNrTWl4aW5dO1xuXG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJjb21tZW50TGlzdFwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6Y29tbWVudHMuc3luY1wiOlwiY29tbWVudHNcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImRvd25sb2FkXCI6e1widi1iaW5kOnBpY3R1cmUuc3luY1wiOlwicGljdHVyZVwiLFwidi1iaW5kOmlkLnN5bmNcIjpcImlkXCIsXCJ2LWJpbmQ6dXNlci5zeW5jXCI6XCJ1c2VyXCJ9fTtcclxuJGV2ZW50cyA9IHtcImNvbW1lbnRMaXN0XCI6e1widi1vbjpmcmVzaFwiOlwiZmV0Y2hDb21tZW50c1wifSxcImRvd25sb2FkXCI6e1widi1vbjpwYXlcIjpcInBheVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIGNvbW1lbnRMaXN0LFxuICAgIGRvd25sb2FkXG4gIH07XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBjb3B5Q29kZSgpIHtcbiAgICAgIHdlcHkuc2V0Q2xpcGJvYXJkRGF0YSh7XG4gICAgICAgIGRhdGE6IHRoaXMucGljdHVyZS5jb2RlLCAvLyDpnIDopoHorr7nva7nmoTlhoXlrrksXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICflo4HnurjnoIHlpI3liLbmiJDlip8nLCAvLyDmj5DnpLrnmoTlhoXlrrksXG4gICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsIC8vIOWbvuaghyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG4gICAgbG9va0F1dGhvcigpIHtcbiAgICAgIGxldCByb3V0ZXMgPSB0aGlzLmdldEN1cnJlbnRQYWdlcygpO1xuICAgICAgaWYgKHJvdXRlcy5sZW5ndGggPiAxICYmIHJvdXRlc1tyb3V0ZXMubGVuZ3RoIC0gMl0ucm91dGUgPT09ICdwYWdlcy9wZXJzb24vaW5kZXgnKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVCYWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL3BlcnNvbi9pbmRleCcsIHsgaWQ6IHRoaXMuYXV0aG9yLmlkIH0pO1xuICAgICAgfVxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5nZXRDdXJyZW50UGFnZXMoKSk7XG4gICAgfSxcbiAgICB6YW4oKSB7XG4gICAgICBpZiAodGhpcy51c2VyKSB7XG4gICAgICAgIGlmICh0aGlzLnBpY3R1cmUuemFuKSB7XG4gICAgICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICAgICAgY29udGVudDogJ+ehruWumuimgeWPlua2iOeCuei1nuWQlz8nLCAvLyDmj5DnpLrnmoTlhoXlrrksXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiB0cnVlLCAvLyDmmK/lkKbmmL7npLrlj5bmtojmjInpkq4sXG4gICAgICAgICAgICBjYW5jZWxUZXh0OiAn5Y+W5raIJywgLy8g5Y+W5raI5oyJ6ZKu55qE5paH5a2X77yM6buY6K6k5Li65Y+W5raI77yM5pyA5aSaIDQg5Liq5a2X56ymLFxuICAgICAgICAgICAgY2FuY2VsQ29sb3I6ICcjMDAwMDAwJywgLy8g5Y+W5raI5oyJ6ZKu55qE5paH5a2X6aKc6ImyLFxuICAgICAgICAgICAgY29uZmlybVRleHQ6ICfnoa7lrponLCAvLyDnoa7lrprmjInpkq7nmoTmloflrZfvvIzpu5jorqTkuLrlj5bmtojvvIzmnIDlpJogNCDkuKrlrZfnrKYsXG4gICAgICAgICAgICBjb25maXJtQ29sb3I6ICcjZmZlNzI1JywgLy8g56Gu5a6a5oyJ6ZKu55qE5paH5a2X6aKc6ImyLFxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5jb25maXJtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saWtlUGljdHVyZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5saWtlUGljdHVyZSgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oeyB1cmw6ICcvcGFnZXMvbG9naW4vbG9naW4nIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgZG93bmxvYWQoKSB7XG4gICAgICB3eC5nZXRTZXR0aW5nKHtcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgIGlmICghcmVzLmF1dGhTZXR0aW5nWydzY29wZS53cml0ZVBob3Rvc0FsYnVtJ10pIHtcbiAgICAgICAgICAgIHd4LmF1dGhvcml6ZSh7XG4gICAgICAgICAgICAgIHNjb3BlOiAnc2NvcGUud3JpdGVQaG90b3NBbGJ1bScsXG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRvd25sb2FkUGljKCk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGZhaWw6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICB3ZXB5LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgICBjb250ZW50OiAn5LiL6L296ZyA6KaB5L+d5a2Y5Yiw55u45YaM55qE5p2D6ZmQJywgLy8g5o+Q56S655qE5YaF5a65LFxuICAgICAgICAgICAgICAgICAgc2hvd0NhbmNlbDogdHJ1ZSwgLy8g5piv5ZCm5pi+56S65Y+W5raI5oyJ6ZKuLFxuICAgICAgICAgICAgICAgICAgY2FuY2VsVGV4dDogJ+WPlua2iCcsIC8vIOWPlua2iOaMiemSrueahOaWh+Wtl++8jOm7mOiupOS4uuWPlua2iO+8jOacgOWkmiA0IOS4quWtl+espixcbiAgICAgICAgICAgICAgICAgIGNhbmNlbENvbG9yOiAnIzAwMDAwMCcsIC8vIOWPlua2iOaMiemSrueahOaWh+Wtl+minOiJsixcbiAgICAgICAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn5Y676K6+572uJywgLy8g56Gu5a6a5oyJ6ZKu55qE5paH5a2X77yM6buY6K6k5Li65Y+W5raI77yM5pyA5aSaIDQg5Liq5a2X56ymLFxuICAgICAgICAgICAgICAgICAgY29uZmlybUNvbG9yOiAnI2ZmZTcyNScsIC8vIOehruWumuaMiemSrueahOaWh+Wtl+minOiJsixcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgICAgICAgIHdlcHkub3BlblNldHRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kb3dubG9hZFBpYygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBjb2xsZWN0KCkge1xuICAgICAgaWYgKHRoaXMudXNlcikge1xuICAgICAgICBpZiAodGhpcy5waWN0dXJlLmNvbGxlY3RlZCkge1xuICAgICAgICAgIHdlcHkuc2hvd01vZGFsKHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfnoa7lrpropoHlj5bmtojmlLbol4/lkJc/JywgLy8g5o+Q56S655qE5YaF5a65LFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogdHJ1ZSwgLy8g5piv5ZCm5pi+56S65Y+W5raI5oyJ6ZKuLFxuICAgICAgICAgICAgY2FuY2VsVGV4dDogJ+WPlua2iCcsIC8vIOWPlua2iOaMiemSrueahOaWh+Wtl++8jOm7mOiupOS4uuWPlua2iO+8jOacgOWkmiA0IOS4quWtl+espixcbiAgICAgICAgICAgIGNhbmNlbENvbG9yOiAnIzAwMDAwMCcsIC8vIOWPlua2iOaMiemSrueahOaWh+Wtl+minOiJsixcbiAgICAgICAgICAgIGNvbmZpcm1UZXh0OiAn56Gu5a6aJywgLy8g56Gu5a6a5oyJ6ZKu55qE5paH5a2X77yM6buY6K6k5Li65Y+W5raI77yM5pyA5aSaIDQg5Liq5a2X56ymLFxuICAgICAgICAgICAgY29uZmlybUNvbG9yOiAnI2ZmZTcyNScsIC8vIOehruWumuaMiemSrueahOaWh+Wtl+minOiJsixcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdFBpY3R1cmUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY29sbGVjdFBpY3R1cmUoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2xvZ2luL2xvZ2luJyB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGxvb2tEZXRhaWwoZm9jdXMpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7IHVybDogYC9wYWdlcy9kZXRhaWwvY29tbWVudD9pZD0ke3RoaXMuaWR9JmZvY3VzPSR7Zm9jdXN9YCB9KTtcbiAgICB9LFxuICAgIHBheSgpIHtcbiAgICAgIGlmICh0aGlzLmF1dGhvci5wYXlVcmwpIHtcbiAgICAgICAgd2VweS5wcmV2aWV3SW1hZ2Uoe1xuICAgICAgICAgIHVybHM6IFt0aGlzLmF1dGhvci5wYXlVcmxdIC8vIOmcgOimgemihOiniOeahOWbvueJh+mTvuaOpeWIl+ihqCxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfkvZzogIXov5jmnKrlvIDpgJrotZ7otY8nLCAvLyDmj5DnpLrnmoTlhoXlrrksXG4gICAgICAgICAgaWNvbjogJ25vbmUnLCAvLyDlm77moIcsXG4gICAgICAgICAgZHVyYXRpb246IDIwMDAgLy8g5bu26L+f5pe26Ze0LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGZldGNoQ29tbWVudHMoKSB7XG4gICAgICB0aGlzLmxvYWRDb21tZW50cygpO1xuICAgIH1cbiAgfTtcblxuICBkb3dubG9hZFBpYygpIHtcbiAgICB0aGlzLmdldFVzZXJJbmZvKHRydWUpO1xuICAgIGxldCBzaG93ID0gJ3RydWUnO1xuICAgIGlmICh0aGlzLnVzZXIgJiYgIXRoaXMucGljdHVyZS5pc0JpZykge1xuICAgICAgc2hvdyA9ICdmYWxzZSc7XG4gICAgfVxuICAgIGlmICghdGhpcy51c2VyICYmICF0aGlzLnBpY3R1cmUuaXNCaWcpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7IHVybDogJy9wYWdlcy9sb2dpbi9sb2dpbicgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubmVlZExvZ2luID0gdHJ1ZTtcbiAgICAgIHRoaXMuJGludm9rZSgnZG93bmxvYWQnLCAnc2hvdycsIHNob3cpO1xuICAgIH1cbiAgfVxuXG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogJ+i/meS5iOWlveeci+eahOWjgee6uOS4gOWumumAguWQiOS9oCcsXG4gICAgICBwYXRoOiBgL3BhZ2VzL2RldGFpbC9kZXRhaWw/aWQ9JHt0aGlzLnBpY3R1cmUuaWR9YCxcbiAgICAgIGltYWdlVXJsOiB0aGlzLnBpY3R1cmUudXJsLFxuICAgICAgc3VjY2VzczogcmVzID0+IHsgfSxcbiAgICAgIGZhaWw6ICgpID0+IHsgfSxcbiAgICAgIGNvbXBsZXRlOiAoKSA9PiB7IH1cbiAgICB9O1xuICB9XG5cbiAgbGlrZVBpY3R1cmUoKSB7XG4gICAgYXBpLnphbih0aGlzLmlkLCAhdGhpcy5waWN0dXJlLnphbikudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5waWN0dXJlLnphbiA9ICF0aGlzLnBpY3R1cmUuemFuO1xuICAgICAgaWYgKHRoaXMucGljdHVyZS56YW4pIHtcbiAgICAgICAgdGhpcy5waWN0dXJlLnphbk51bSsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5waWN0dXJlLnphbk51bS0tO1xuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgY29sbGVjdFBpY3R1cmUoKSB7XG4gICAgYXBpLmNvbGxlY3Rpb24odGhpcy5pZCwgIXRoaXMucGljdHVyZS5jb2xsZWN0ZWQpLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMucGljdHVyZS5jb2xsZWN0ZWQgPSAhdGhpcy5waWN0dXJlLmNvbGxlY3RlZDtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9uU2hvdygpIHtcbiAgICBpZiAod2VweS5nZXRTdG9yYWdlU3luYygnd2FsbHBhcGVyJykgPT09ICd0cnVlJykge1xuICAgICAgd2VweS5yZW1vdmVTdG9yYWdlU3luYygnd2FsbHBhcGVyJyk7XG4gICAgICB0aGlzLmxvYWRDb21tZW50cygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5uZWVkTG9naW4pIHtcbiAgICAgIHRoaXMubmVlZExvZ2luID0gZmFsc2U7XG4gICAgICB0aGlzLmdldFVzZXJJbmZvKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdldFVzZXJJbmZvKGZhbHNlKTtcbiAgICB9XG4gIH1cbiAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICB0aGlzLmlkID0gb3B0aW9ucy5pZDtcbiAgICB0aGlzLnN0YXR1c0hlaWdodCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLm5hdkhlaWdodDtcbiAgICB0aGlzLmJvdHRvbUhlaWdodCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLmlzSXB4ID8gMjQgOiAwO1xuICB9O1xuXG4gIGxvYWRJbWFnZSgpIHtcbiAgICBhcGkuZmV0Y2hXYWxscGFwZXIodGhpcy5pZCkudGhlbihyZXMgPT4ge1xuICAgICAgdGhpcy5waWN0dXJlID0gcmVzLnBpY3R1cmU7XG4gICAgICB0aGlzLmF1dGhvciA9IHJlcy5hdXRob3I7XG4gICAgICB0aGlzLnRvdGFsSXRlbSA9IHJlcy5waWN0dXJlLmNvbW1lbnROdW07XG4gICAgICB0aGlzLmdldFVzZXJJbmZvKGZhbHNlKTtcbiAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRDb21tZW50cygpIHtcbiAgICBhcGkuZmV0Y2hDb21tZW50cyh0aGlzLmlkLCAnd2FsbHBhcGVyJywgMCwgMiwgdGhpcy51c2VyID8gdGhpcy51c2VyLmlkIDogLTEpLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMuY29tbWVudHMgPSByZXMuY29tbWVudHM7XG4gICAgICB0aGlzLnRvdGFsSXRlbSA9IHJlcy50b3RhbEl0ZW07XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0sIGVyciA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSk7XG4gIH1cblxuICBnZXRVc2VySW5mbyhkZXRhaWwpIHtcbiAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8odXNlciA9PiB7XG4gICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgaWYgKCFkZXRhaWwgJiYgdGhpcy50b3RhbEl0ZW0gPiAwKSB7XG4gICAgICAgIHRoaXMubG9hZENvbW1lbnRzKCk7XG4gICAgICB9XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0sICEhZGV0YWlsKTtcbiAgfVxuXG4gIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcbiAgICAgIGRlbHRhOiAxXG4gICAgfSk7XG4gIH1cblxuICBvblJlYWR5KCkge1xuICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgdGl0bGU6ICfliqDovb3kuK0uLi4nLCAvLyDmj5DnpLrnmoTlhoXlrrksXG4gICAgICBtYXNrOiB0cnVlXG4gICAgfSk7XG4gICAgdGhpcy5sb2FkSW1hZ2UoKTtcbiAgfTtcbn1cbiJdfQ==