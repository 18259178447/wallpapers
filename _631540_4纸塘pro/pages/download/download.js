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

var _dialog = require("./../../components/dialog.js");

var _dialog2 = _interopRequireDefault(_dialog);

var _countdown = require("./../../components/countdown.js");

var _countdown2 = _interopRequireDefault(_countdown);

var _downloadProcess = require("./download-process.js");

var _downloadProcess2 = _interopRequireDefault(_downloadProcess);

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

var Download = function(_wepy$component) {
    _inherits(Download, _wepy$component);
    function Download() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Download);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Download.__proto__ || Object.getPrototypeOf(Download)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            picture: Object,
            id: String,
            // 图片id
            user: Object
        }, _this.data = {
            download: false,
            downloadUrl: null,
            downloadState: "none",
            isShow: false
        }, _this.$repeat = {}, _this.$props = {
            dialog: {
                "xmlns:v-bind": "",
                "v-bind:locked.sync": "status",
                animationMode: "bottom",
                "v-bind:align.sync": "align"
            },
            "download-process": {
                "v-bind:url.sync": "downloadUrl",
                "xmlns:v-on": "",
                "v-bind:state.sync": "downloadState"
            }
        }, _this.$events = {
            "download-process": {
                "v-on:close": "hide",
                "v-on:reDownload": "reDownload",
                "v-on:upload": "upload",
                "v-on:pay": "pay"
            }
        }, _this.components = {
            dialog: _dialog2.default,
            countdown: _countdown2.default,
            "download-process": _downloadProcess2.default
        }, _this.methods = {
            login: function login() {
                _wepy2.default.navigateTo({
                    url: "/pages/login/login"
                });
            },
            tapBg: function tapBg() {
                return true;
            },
            show: function show(isShow) {
                this.isShow = isShow === "true";
                this.$invoke("dialog", "show");
                if (!this.isShow) {
                    this.download = true;
                    this.downloadPic("2k");
                }
            },
            download: function download(type) {
                this.download = true;
                // let system = wepy.getSystemInfoSync();
                // console.log(system);
                // let pixelRatio = system.pixelRatio;
                // let width = pixelRatio * system.windowWidth;
                // let height = pixelRatio * system.windowHeight;
                // this.$invoke('dialog', 'hide');
                                this.downloadPic(type);
            },
            hide: function hide(event) {
                this.isShow = false;
                this.download = false;
                this.downloadState = "none";
                this.$invoke("dialog", "hide");
            },
            reDownload: function reDownload(event) {
                this.download = false;
            },
            upload: function upload() {
                _wepy2.default.navigateTo({
                    url: "/pages/upload/index"
                });
            },
            pay: function pay() {
                this.$emit("pay");
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {
            downloadTips: function downloadTips() {
                if (!_this.user) return;
                var tips = void 0;
                if (_this.user.downloadFreeTimes > 0) {
                    tips = "本月您还可以下载" + _this.user.downloadFreeTimes + "次原图";
                } else {
                    tips = "本月下载原图次数已用完，下载将消耗1积分（共" + _this.user.score + "积分）";
                }
                return tips;
            },
            align: function align() {
                return _this.download ? "center" : "bottom";
            },
            status: function status() {
                return _this.download ? "true" : "hide";
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Download, [ {
        key: "downloadPic",
        value: function downloadPic(type) {
            var _this2 = this;
            var system = _wepy2.default.getSystemInfoSync();
            _wallpaperApi2.default.download(this.id, type, system.windowWidth / system.windowHeight).then(function(url) {
                _this2.downloadUrl = url;
                console.log(_this2.downloadUrl);
                _this2.$apply();
                _this2.$invoke("download-process", "download");
            }, function(err) {
                if (err.code === 10001) {
                    _this2.downloadState = "score";
                    _this2.$apply();
                }
                console.log(err);
            });
        }
    }, {
        key: "onLoad",
        value: function onLoad() {}
    } ]);
    return Download;
}(_wepy2.default.component);

exports.default = Download;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvd25sb2FkLmpzIl0sIm5hbWVzIjpbIkRvd25sb2FkIiwicHJvcHMiLCJwaWN0dXJlIiwiT2JqZWN0IiwiaWQiLCJTdHJpbmciLCJ1c2VyIiwiZGF0YSIsImRvd25sb2FkIiwiZG93bmxvYWRVcmwiLCJkb3dubG9hZFN0YXRlIiwiaXNTaG93IiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiZGlhbG9nIiwiY291bnRkb3duIiwiZG93bmxvYWRQcm9jZXNzIiwibWV0aG9kcyIsImxvZ2luIiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ0YXBCZyIsInNob3ciLCIkaW52b2tlIiwiZG93bmxvYWRQaWMiLCJ0eXBlIiwiaGlkZSIsImV2ZW50IiwicmVEb3dubG9hZCIsInVwbG9hZCIsInBheSIsIiRlbWl0IiwiZXZlbnRzIiwid2F0Y2giLCJjb21wdXRlZCIsImRvd25sb2FkVGlwcyIsInRpcHMiLCJkb3dubG9hZEZyZWVUaW1lcyIsInNjb3JlIiwiYWxpZ24iLCJzdGF0dXMiLCJzeXN0ZW0iLCJnZXRTeXN0ZW1JbmZvU3luYyIsImFwaSIsIndpbmRvd1dpZHRoIiwid2luZG93SGVpZ2h0IiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCIkYXBwbHkiLCJlcnIiLCJjb2RlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsSyxHQUFRO0FBQ05DLGVBQVNDLE1BREg7QUFFTkMsVUFBSUMsTUFGRSxFQUVNO0FBQ1pDLFlBQU1IO0FBSEEsSyxRQUtSSSxJLEdBQU87QUFDTEMsZ0JBQVUsS0FETDtBQUVMQyxtQkFBYSxJQUZSO0FBR0xDLHFCQUFlLE1BSFY7QUFJTEMsY0FBUTtBQUpILEssUUFNUkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLHNCQUFxQixRQUF4QyxFQUFpRCxpQkFBZ0IsUUFBakUsRUFBMEUscUJBQW9CLE9BQTlGLEVBQVYsRUFBaUgsb0JBQW1CLEVBQUMsbUJBQWtCLGFBQW5CLEVBQWlDLGNBQWEsRUFBOUMsRUFBaUQscUJBQW9CLGVBQXJFLEVBQXBJLEUsUUFDVEMsTyxHQUFVLEVBQUMsb0JBQW1CLEVBQUMsY0FBYSxNQUFkLEVBQXFCLG1CQUFrQixZQUF2QyxFQUFvRCxlQUFjLFFBQWxFLEVBQTJFLFlBQVcsS0FBdEYsRUFBcEIsRSxRQUNUQyxVLEdBQWE7QUFDVkMsOEJBRFU7QUFFVkMsb0NBRlU7QUFHViwwQkFBb0JDO0FBSFYsSyxRQUtaQyxPLEdBQVU7QUFDUkMsV0FEUSxtQkFDQTtBQUNOQyx1QkFBS0MsVUFBTCxDQUFnQjtBQUNkQyxlQUFLO0FBRFMsU0FBaEI7QUFHRCxPQUxPO0FBTVJDLFdBTlEsbUJBTUE7QUFDTixlQUFPLElBQVA7QUFDRCxPQVJPO0FBU1JDLFVBVFEsZ0JBU0hkLE1BVEcsRUFTSztBQUNYLGFBQUtBLE1BQUwsR0FBY0EsV0FBVyxNQUF6QjtBQUNBLGFBQUtlLE9BQUwsQ0FBYSxRQUFiLEVBQXVCLE1BQXZCO0FBQ0EsWUFBSSxDQUFDLEtBQUtmLE1BQVYsRUFBa0I7QUFDaEIsZUFBS0gsUUFBTCxHQUFnQixJQUFoQjtBQUNBLGVBQUttQixXQUFMLENBQWlCLElBQWpCO0FBQ0Q7QUFDRixPQWhCTztBQWlCUm5CLGNBakJRLG9CQWlCQ29CLElBakJELEVBaUJPO0FBQ2IsYUFBS3BCLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLbUIsV0FBTCxDQUFpQkMsSUFBakI7QUFDRCxPQTFCTztBQTJCUkMsVUEzQlEsZ0JBMkJIQyxLQTNCRyxFQTJCSTtBQUNWLGFBQUtuQixNQUFMLEdBQWMsS0FBZDtBQUNBLGFBQUtILFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxhQUFLRSxhQUFMLEdBQXFCLE1BQXJCO0FBQ0EsYUFBS2dCLE9BQUwsQ0FBYSxRQUFiLEVBQXVCLE1BQXZCO0FBQ0QsT0FoQ087QUFpQ1JLLGdCQWpDUSxzQkFpQ0dELEtBakNILEVBaUNVO0FBQ2hCLGFBQUt0QixRQUFMLEdBQWdCLEtBQWhCO0FBQ0QsT0FuQ087QUFvQ1J3QixZQXBDUSxvQkFvQ0M7QUFDUFgsdUJBQUtDLFVBQUwsQ0FBZ0IsRUFBRUMsS0FBSyxxQkFBUCxFQUFoQjtBQUNELE9BdENPO0FBdUNSVSxTQXZDUSxpQkF1Q0Y7QUFDSixhQUFLQyxLQUFMLENBQVcsS0FBWDtBQUNEO0FBekNPLEssUUEwRFZDLE0sR0FBUyxFLFFBQ1RDLEssR0FBUSxFLFFBQ1JDLFEsR0FBVztBQUNUQyxvQkFBYyx3QkFBTTtBQUNsQixZQUFJLENBQUMsTUFBS2hDLElBQVYsRUFBZ0I7QUFDaEIsWUFBSWlDLGFBQUo7QUFDQSxZQUFJLE1BQUtqQyxJQUFMLENBQVVrQyxpQkFBVixHQUE4QixDQUFsQyxFQUFxQztBQUNuQ0Qsc0VBQWtCLE1BQUtqQyxJQUFMLENBQVVrQyxpQkFBNUI7QUFDRCxTQUZELE1BRU87QUFDTEQscUpBQWdDLE1BQUtqQyxJQUFMLENBQVVtQyxLQUExQztBQUNEO0FBQ0QsZUFBT0YsSUFBUDtBQUNELE9BVlE7QUFXVEcsYUFBTyxpQkFBTTtBQUNYLGVBQU8sTUFBS2xDLFFBQUwsR0FBZ0IsUUFBaEIsR0FBMkIsUUFBbEM7QUFDRCxPQWJRO0FBY1RtQyxjQUFRLGtCQUFNO0FBQ1osZUFBTyxNQUFLbkMsUUFBTCxHQUFnQixNQUFoQixHQUF5QixNQUFoQztBQUNEO0FBaEJRLEs7Ozs7O2dDQWpCQ29CLEksRUFBTTtBQUFBOztBQUNoQixVQUFJZ0IsU0FBU3ZCLGVBQUt3QixpQkFBTCxFQUFiO0FBQ0FDLDZCQUFJdEMsUUFBSixDQUFhLEtBQUtKLEVBQWxCLEVBQXNCd0IsSUFBdEIsRUFBNEJnQixPQUFPRyxXQUFQLEdBQXFCSCxPQUFPSSxZQUF4RCxFQUFzRUMsSUFBdEUsQ0FBMkUsZUFBTztBQUNoRixlQUFLeEMsV0FBTCxHQUFtQmMsR0FBbkI7QUFDQTJCLGdCQUFRQyxHQUFSLENBQVksT0FBSzFDLFdBQWpCO0FBQ0EsZUFBSzJDLE1BQUw7QUFDQSxlQUFLMUIsT0FBTCxDQUFhLGtCQUFiLEVBQWlDLFVBQWpDO0FBQ0QsT0FMRCxFQUtHLGVBQU87QUFDUixZQUFJMkIsSUFBSUMsSUFBSixLQUFhLEtBQWpCLEVBQXdCO0FBQ3RCLGlCQUFLNUMsYUFBTCxHQUFxQixPQUFyQjtBQUNBLGlCQUFLMEMsTUFBTDtBQUNEO0FBQ0RGLGdCQUFRQyxHQUFSLENBQVlFLEdBQVo7QUFDRCxPQVhEO0FBWUQ7Ozs2QkFxQlEsQ0FBRzs7OztFQWxHd0JoQyxlQUFLa0MsUzs7a0JBQXRCdkQsUSIsImZpbGUiOiJkb3dubG9hZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgZGlhbG9nIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvZGlhbG9nJztcbmltcG9ydCBjb3VudGRvd24gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb3VudGRvd24nO1xuaW1wb3J0IGRvd25sb2FkUHJvY2VzcyBmcm9tICcuL2Rvd25sb2FkLXByb2Nlc3MnO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvd2FsbHBhcGVyLWFwaSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb3dubG9hZCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgcGljdHVyZTogT2JqZWN0LFxuICAgIGlkOiBTdHJpbmcsIC8vIOWbvueJh2lkXG4gICAgdXNlcjogT2JqZWN0XG4gIH07XG4gIGRhdGEgPSB7XG4gICAgZG93bmxvYWQ6IGZhbHNlLFxuICAgIGRvd25sb2FkVXJsOiBudWxsLFxuICAgIGRvd25sb2FkU3RhdGU6ICdub25lJyxcbiAgICBpc1Nob3c6IGZhbHNlXG4gIH07XG4gJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJkaWFsb2dcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOmxvY2tlZC5zeW5jXCI6XCJzdGF0dXNcIixcImFuaW1hdGlvbk1vZGVcIjpcImJvdHRvbVwiLFwidi1iaW5kOmFsaWduLnN5bmNcIjpcImFsaWduXCJ9LFwiZG93bmxvYWQtcHJvY2Vzc1wiOntcInYtYmluZDp1cmwuc3luY1wiOlwiZG93bmxvYWRVcmxcIixcInhtbG5zOnYtb25cIjpcIlwiLFwidi1iaW5kOnN0YXRlLnN5bmNcIjpcImRvd25sb2FkU3RhdGVcIn19O1xyXG4kZXZlbnRzID0ge1wiZG93bmxvYWQtcHJvY2Vzc1wiOntcInYtb246Y2xvc2VcIjpcImhpZGVcIixcInYtb246cmVEb3dubG9hZFwiOlwicmVEb3dubG9hZFwiLFwidi1vbjp1cGxvYWRcIjpcInVwbG9hZFwiLFwidi1vbjpwYXlcIjpcInBheVwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgIGRpYWxvZyxcbiAgICBjb3VudGRvd24sXG4gICAgJ2Rvd25sb2FkLXByb2Nlc3MnOiBkb3dubG9hZFByb2Nlc3NcbiAgfTtcbiAgbWV0aG9kcyA9IHtcbiAgICBsb2dpbigpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgIHVybDogJy9wYWdlcy9sb2dpbi9sb2dpbidcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdGFwQmcoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIHNob3coaXNTaG93KSB7XG4gICAgICB0aGlzLmlzU2hvdyA9IGlzU2hvdyA9PT0gJ3RydWUnO1xuICAgICAgdGhpcy4kaW52b2tlKCdkaWFsb2cnLCAnc2hvdycpO1xuICAgICAgaWYgKCF0aGlzLmlzU2hvdykge1xuICAgICAgICB0aGlzLmRvd25sb2FkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kb3dubG9hZFBpYygnMmsnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRvd25sb2FkKHR5cGUpIHtcbiAgICAgIHRoaXMuZG93bmxvYWQgPSB0cnVlO1xuICAgICAgLy8gbGV0IHN5c3RlbSA9IHdlcHkuZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHN5c3RlbSk7XG4gICAgICAvLyBsZXQgcGl4ZWxSYXRpbyA9IHN5c3RlbS5waXhlbFJhdGlvO1xuICAgICAgLy8gbGV0IHdpZHRoID0gcGl4ZWxSYXRpbyAqIHN5c3RlbS53aW5kb3dXaWR0aDtcbiAgICAgIC8vIGxldCBoZWlnaHQgPSBwaXhlbFJhdGlvICogc3lzdGVtLndpbmRvd0hlaWdodDtcbiAgICAgIC8vIHRoaXMuJGludm9rZSgnZGlhbG9nJywgJ2hpZGUnKTtcbiAgICAgIHRoaXMuZG93bmxvYWRQaWModHlwZSk7XG4gICAgfSxcbiAgICBoaWRlKGV2ZW50KSB7XG4gICAgICB0aGlzLmlzU2hvdyA9IGZhbHNlO1xuICAgICAgdGhpcy5kb3dubG9hZCA9IGZhbHNlO1xuICAgICAgdGhpcy5kb3dubG9hZFN0YXRlID0gJ25vbmUnO1xuICAgICAgdGhpcy4kaW52b2tlKCdkaWFsb2cnLCAnaGlkZScpO1xuICAgIH0sXG4gICAgcmVEb3dubG9hZChldmVudCkge1xuICAgICAgdGhpcy5kb3dubG9hZCA9IGZhbHNlO1xuICAgIH0sXG4gICAgdXBsb2FkKCkge1xuICAgICAgd2VweS5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL3VwbG9hZC9pbmRleCcgfSk7XG4gICAgfSxcbiAgICBwYXkoKSB7XG4gICAgICB0aGlzLiRlbWl0KCdwYXknKTtcbiAgICB9XG4gIH07XG4gIGRvd25sb2FkUGljKHR5cGUpIHtcbiAgICBsZXQgc3lzdGVtID0gd2VweS5nZXRTeXN0ZW1JbmZvU3luYygpO1xuICAgIGFwaS5kb3dubG9hZCh0aGlzLmlkLCB0eXBlLCBzeXN0ZW0ud2luZG93V2lkdGggLyBzeXN0ZW0ud2luZG93SGVpZ2h0KS50aGVuKHVybCA9PiB7XG4gICAgICB0aGlzLmRvd25sb2FkVXJsID0gdXJsO1xuICAgICAgY29uc29sZS5sb2codGhpcy5kb3dubG9hZFVybCk7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgdGhpcy4kaW52b2tlKCdkb3dubG9hZC1wcm9jZXNzJywgJ2Rvd25sb2FkJyk7XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIGlmIChlcnIuY29kZSA9PT0gMTAwMDEpIHtcbiAgICAgICAgdGhpcy5kb3dubG9hZFN0YXRlID0gJ3Njb3JlJztcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG4gIH07XG4gIGV2ZW50cyA9IHt9O1xuICB3YXRjaCA9IHt9O1xuICBjb21wdXRlZCA9IHtcbiAgICBkb3dubG9hZFRpcHM6ICgpID0+IHtcbiAgICAgIGlmICghdGhpcy51c2VyKSByZXR1cm47XG4gICAgICBsZXQgdGlwcztcbiAgICAgIGlmICh0aGlzLnVzZXIuZG93bmxvYWRGcmVlVGltZXMgPiAwKSB7XG4gICAgICAgIHRpcHMgPSBg5pys5pyI5oKo6L+Y5Y+v5Lul5LiL6L29JHt0aGlzLnVzZXIuZG93bmxvYWRGcmVlVGltZXN95qyh5Y6f5Zu+YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpcHMgPSBg5pys5pyI5LiL6L295Y6f5Zu+5qyh5pWw5bey55So5a6M77yM5LiL6L295bCG5raI6ICXMeenr+WIhu+8iOWFsSR7dGhpcy51c2VyLnNjb3Jlfeenr+WIhu+8iWA7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGlwcztcbiAgICB9LFxuICAgIGFsaWduOiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5kb3dubG9hZCA/ICdjZW50ZXInIDogJ2JvdHRvbSc7XG4gICAgfSxcbiAgICBzdGF0dXM6ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmRvd25sb2FkID8gJ3RydWUnIDogJ2hpZGUnO1xuICAgIH1cbiAgfTtcbiAgb25Mb2FkKCkgeyB9O1xufVxuIl19