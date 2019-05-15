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

var _countdown = require("./../../components/countdown.js");

var _countdown2 = _interopRequireDefault(_countdown);

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

var DownloadProcess = function(_wepy$component) {
    _inherits(DownloadProcess, _wepy$component);
    function DownloadProcess() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, DownloadProcess);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DownloadProcess.__proto__ || Object.getPrototypeOf(DownloadProcess)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            url: String,
            state: {
                type: String,
                default: "none"
            }
        }, _this.data = {
            process: 0
        }, _this.components = {
            countdown: _countdown2.default
        }, _this.methods = {
            download: function download() {
                var _this2 = this;
                // 根据地址下载
                                this.$invoke("countdown", "draw");
                var task = _wepy2.default.downloadFile({
                    url: this.url,
                    // 下载资源的 url
                    success: function success(res) {
                        _this2.state = "success";
                        _wepy2.default.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath
                        });
                        _this2.$apply();
                    },
                    fail: function fail() {
                        _this2.state = "fail";
                        _this2.$apply();
                    },
                    complete: function complete() {}
                });
                if (task) {
                    task.onProgressUpdate(function(res) {
                        _this2.process = res.progress;
                        _this2.$invoke("countdown", "setProcess", _this2.process);
                        _this2.$apply();
                    });
                }
            },
            share: function share() {},
            close: function close() {
                this.$emit("close");
            },
            reDownload: function reDownload() {
                this.$emit("reDownload");
            },
            upload: function upload() {
                this.$emit("close");
                this.$emit("upload");
            },
            pay: function pay() {
                this.$emit("close");
                this.$emit("pay");
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(DownloadProcess, [ {
        key: "onLoad",
        value: function onLoad() {}
    } ]);
    return DownloadProcess;
}(_wepy2.default.component);

exports.default = DownloadProcess;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvd25sb2FkLXByb2Nlc3MuanMiXSwibmFtZXMiOlsiRG93bmxvYWRQcm9jZXNzIiwicHJvcHMiLCJ1cmwiLCJTdHJpbmciLCJzdGF0ZSIsInR5cGUiLCJkZWZhdWx0IiwiZGF0YSIsInByb2Nlc3MiLCJjb21wb25lbnRzIiwiY291bnRkb3duIiwibWV0aG9kcyIsImRvd25sb2FkIiwiJGludm9rZSIsInRhc2siLCJ3ZXB5IiwiZG93bmxvYWRGaWxlIiwic3VjY2VzcyIsInNhdmVJbWFnZVRvUGhvdG9zQWxidW0iLCJmaWxlUGF0aCIsInJlcyIsInRlbXBGaWxlUGF0aCIsIiRhcHBseSIsImZhaWwiLCJjb21wbGV0ZSIsIm9uUHJvZ3Jlc3NVcGRhdGUiLCJwcm9ncmVzcyIsInNoYXJlIiwiY2xvc2UiLCIkZW1pdCIsInJlRG93bmxvYWQiLCJ1cGxvYWQiLCJwYXkiLCJldmVudHMiLCJ3YXRjaCIsImNvbXB1dGVkIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLGU7Ozs7Ozs7Ozs7Ozs7O3dNQUNuQkMsSyxHQUFRO0FBQ05DLFdBQUtDLE1BREM7QUFFTkMsYUFBTztBQUNMQyxjQUFNRixNQUREO0FBRUxHLGlCQUFTO0FBRko7QUFGRCxLLFFBT1JDLEksR0FBTztBQUNMQyxlQUFTO0FBREosSyxRQUdQQyxVLEdBQWE7QUFDWEM7QUFEVyxLLFFBR2JDLE8sR0FBVTtBQUNSQyxjQURRLHNCQUNHO0FBQUE7O0FBQ1Q7QUFDQSxhQUFLQyxPQUFMLENBQWEsV0FBYixFQUEwQixNQUExQjtBQUNBLFlBQUlDLE9BQU9DLGVBQUtDLFlBQUwsQ0FBa0I7QUFDM0JkLGVBQUssS0FBS0EsR0FEaUIsRUFDWjtBQUNmZSxtQkFBUyxzQkFBTztBQUNkLG1CQUFLYixLQUFMLEdBQWEsU0FBYjtBQUNBVywyQkFBS0csc0JBQUwsQ0FBNEI7QUFDMUJDLHdCQUFVQyxJQUFJQztBQURZLGFBQTVCO0FBR0EsbUJBQUtDLE1BQUw7QUFDRCxXQVIwQjtBQVMzQkMsZ0JBQU0sZ0JBQU07QUFDVixtQkFBS25CLEtBQUwsR0FBYSxNQUFiO0FBQ0EsbUJBQUtrQixNQUFMO0FBQ0QsV0FaMEI7QUFhM0JFLG9CQUFVLG9CQUFNLENBQUc7QUFiUSxTQUFsQixDQUFYO0FBZUEsWUFBSVYsSUFBSixFQUFVO0FBQ1JBLGVBQUtXLGdCQUFMLENBQXNCLFVBQUNMLEdBQUQsRUFBUztBQUM3QixtQkFBS1osT0FBTCxHQUFlWSxJQUFJTSxRQUFuQjtBQUNBLG1CQUFLYixPQUFMLENBQWEsV0FBYixFQUEwQixZQUExQixFQUF3QyxPQUFLTCxPQUE3QztBQUNBLG1CQUFLYyxNQUFMO0FBQ0QsV0FKRDtBQUtEO0FBQ0YsT0ExQk87QUEyQlJLLFdBM0JRLG1CQTJCQSxDQUNQLENBNUJPO0FBNkJSQyxXQTdCUSxtQkE2QkE7QUFDTixhQUFLQyxLQUFMLENBQVcsT0FBWDtBQUNELE9BL0JPO0FBZ0NSQyxnQkFoQ1Esd0JBZ0NLO0FBQ1gsYUFBS0QsS0FBTCxDQUFXLFlBQVg7QUFDRCxPQWxDTztBQW1DUkUsWUFuQ1Esb0JBbUNDO0FBQ1AsYUFBS0YsS0FBTCxDQUFXLE9BQVg7QUFDQSxhQUFLQSxLQUFMLENBQVcsUUFBWDtBQUNELE9BdENPO0FBdUNSRyxTQXZDUSxpQkF1Q0Y7QUFDSixhQUFLSCxLQUFMLENBQVcsT0FBWDtBQUNBLGFBQUtBLEtBQUwsQ0FBVyxLQUFYO0FBQ0Q7QUExQ08sSyxRQTRDVkksTSxHQUFTLEUsUUFDVEMsSyxHQUFRLEUsUUFDUkMsUSxHQUFXLEU7Ozs7OzZCQUNGLENBQUc7Ozs7RUE3RCtCcEIsZUFBS3FCLFM7O2tCQUE3QnBDLGUiLCJmaWxlIjoiZG93bmxvYWQtcHJvY2Vzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgY291bnRkb3duIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY291bnRkb3duJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvd25sb2FkUHJvY2VzcyBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgdXJsOiBTdHJpbmcsXG4gICAgc3RhdGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdub25lJ1xuICAgIH1cbiAgfTtcbiAgZGF0YSA9IHtcbiAgICBwcm9jZXNzOiAwXG4gIH07XG4gIGNvbXBvbmVudHMgPSB7XG4gICAgY291bnRkb3duXG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgZG93bmxvYWQoKSB7XG4gICAgICAvLyDmoLnmja7lnLDlnYDkuIvovb1cbiAgICAgIHRoaXMuJGludm9rZSgnY291bnRkb3duJywgJ2RyYXcnKTtcbiAgICAgIGxldCB0YXNrID0gd2VweS5kb3dubG9hZEZpbGUoe1xuICAgICAgICB1cmw6IHRoaXMudXJsLCAvLyDkuIvovb3otYTmupDnmoQgdXJsXG4gICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5zdGF0ZSA9ICdzdWNjZXNzJztcbiAgICAgICAgICB3ZXB5LnNhdmVJbWFnZVRvUGhvdG9zQWxidW0oe1xuICAgICAgICAgICAgZmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9LFxuICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zdGF0ZSA9ICdmYWlsJztcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogKCkgPT4geyB9XG4gICAgICB9KTtcbiAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgIHRhc2sub25Qcm9ncmVzc1VwZGF0ZSgocmVzKSA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzID0gcmVzLnByb2dyZXNzO1xuICAgICAgICAgIHRoaXMuJGludm9rZSgnY291bnRkb3duJywgJ3NldFByb2Nlc3MnLCB0aGlzLnByb2Nlc3MpO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2hhcmUoKSB7XG4gICAgfSxcbiAgICBjbG9zZSgpIHtcbiAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlJyk7XG4gICAgfSxcbiAgICByZURvd25sb2FkKCkge1xuICAgICAgdGhpcy4kZW1pdCgncmVEb3dubG9hZCcpO1xuICAgIH0sXG4gICAgdXBsb2FkKCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2xvc2UnKTtcbiAgICAgIHRoaXMuJGVtaXQoJ3VwbG9hZCcpO1xuICAgIH0sXG4gICAgcGF5KCkge1xuICAgICAgdGhpcy4kZW1pdCgnY2xvc2UnKTtcbiAgICAgIHRoaXMuJGVtaXQoJ3BheScpO1xuICAgIH1cbiAgfTtcbiAgZXZlbnRzID0ge307XG4gIHdhdGNoID0ge307XG4gIGNvbXB1dGVkID0ge307XG4gIG9uTG9hZCgpIHsgfTtcbn1cbiJdfQ==