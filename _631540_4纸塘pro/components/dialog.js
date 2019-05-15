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

var _wepy = require("./../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

var _dialogMask = require("./dialog-mask.js");

var _dialogMask2 = _interopRequireDefault(_dialogMask);

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

var AlDialog = function(_wepy$component) {
    _inherits(AlDialog, _wepy$component);
    function AlDialog() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, AlDialog);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AlDialog.__proto__ || Object.getPrototypeOf(AlDialog)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.$repeat = {}, _this.$props = {
            "al-mask": {
                "xmlns:v-bind": "",
                "v-bind:status.sync": "maskStatus",
                "v-bind:locked.sync": "locked"
            }
        }, _this.$events = {}, _this.components = {
            "al-mask": _dialogMask2.default
        }, _this.props = {
            locked: {
                type: String,
                default: "hide"
            },
            animationMode: {
                type: String,
                default: "none"
            },
            align: {
                type: String,
                default: "center"
            },
            status: {
                type: String,
                default: "hide"
            }
        }, _this.data = {
            maskStatus: "hide"
        }, _this.computed = {
            zIndex: function zIndex() {
                if (this.status === "show") {
                    var app = this.$root.$parent;
                    if (!app.globalData) {
                        Object.assign(app, {
                            globalData: {}
                        });
                    }
                    var globalData = app.globalData;
                    var zIndex = (globalData._zIndex || 1e3) + 1;
                    globalData._zIndex = zIndex;
                    return zIndex;
                }
                return 0;
            }
        }, _this.methods = {
            popupTap: function popupTap() {
                if (this.data.locked !== "true") {
                    this.hide();
                }
            },
            stop: function stop() {
                return true;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(AlDialog, [ {
        key: "showMask",
        value: function showMask() {
            this.maskStatus = "show";
        }
    }, {
        key: "hideMask",
        value: function hideMask() {
            this.maskStatus = "hide";
        }
    }, {
        key: "show",
        value: function show() {
            var _this2 = this;
            if (this.animationMode !== "none") {
                this.showMask();
                this.status = "fadeIn";
                setTimeout(function() {
                    _this2.status = "show";
                    _this2.$apply();
                }, 50);
            } else {
                this.showMask();
                this.status = "show";
            }
            this.$apply();
        }
    }, {
        key: "forceHide",
        value: function forceHide() {
            this.status = "hide";
            this.hideMask();
        }
    }, {
        key: "popupTap",
        value: function popupTap() {
            if (this.data.locked !== "true") {
                this.hide();
            }
        }
    }, {
        key: "hide",
        value: function hide() {
            var _this3 = this;
            console.log(this.data.locked);
            if (this.data.animationMode !== "none") {
                this.status = "fadeOut";
                clearTimeout(this._timer);
                this._timer = setTimeout(function() {
                    _this3.forceHide();
                    _this3.$apply();
                }, 300);
            } else {
                // 没有动画
                this.forceHide();
            }
            this.$apply();
        }
    } ]);
    return AlDialog;
}(_wepy2.default.component);

exports.default = AlDialog;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpYWxvZy5qcyJdLCJuYW1lcyI6WyJBbERpYWxvZyIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkFsTWFzayIsInByb3BzIiwibG9ja2VkIiwidHlwZSIsIlN0cmluZyIsImRlZmF1bHQiLCJhbmltYXRpb25Nb2RlIiwiYWxpZ24iLCJzdGF0dXMiLCJkYXRhIiwibWFza1N0YXR1cyIsImNvbXB1dGVkIiwiekluZGV4IiwiYXBwIiwiJHJvb3QiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIk9iamVjdCIsImFzc2lnbiIsIl96SW5kZXgiLCJtZXRob2RzIiwicG9wdXBUYXAiLCJoaWRlIiwic3RvcCIsInNob3dNYXNrIiwic2V0VGltZW91dCIsIiRhcHBseSIsImhpZGVNYXNrIiwiY29uc29sZSIsImxvZyIsImNsZWFyVGltZW91dCIsIl90aW1lciIsImZvcmNlSGlkZSIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUTs7Ozs7Ozs7Ozs7Ozs7MExBQ3BCQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxXQUFVLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIsc0JBQXFCLFlBQXhDLEVBQXFELHNCQUFxQixRQUExRSxFQUFYLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1YsaUJBQVdDO0FBREQsSyxRQUdaQyxLLEdBQVE7QUFDTkMsY0FBUTtBQUNOQyxjQUFNQyxNQURBO0FBRU5DLGlCQUFTO0FBRkgsT0FERjtBQUtOQyxxQkFBZTtBQUNiSCxjQUFNQyxNQURPO0FBRWJDLGlCQUFTO0FBRkksT0FMVDtBQVNORSxhQUFPO0FBQ0xKLGNBQU1DLE1BREQ7QUFFTEMsaUJBQVM7QUFGSixPQVREO0FBYU5HLGNBQVE7QUFDTkwsY0FBTUMsTUFEQTtBQUVOQyxpQkFBUztBQUZIO0FBYkYsSyxRQW1CUkksSSxHQUFPO0FBQ0xDLGtCQUFZO0FBRFAsSyxRQUlQQyxRLEdBQVc7QUFDVEMsWUFEUyxvQkFDQTtBQUNQLFlBQUksS0FBS0osTUFBTCxLQUFnQixNQUFwQixFQUE0QjtBQUMxQixjQUFJSyxNQUFNLEtBQUtDLEtBQUwsQ0FBV0MsT0FBckI7QUFDQSxjQUFJLENBQUNGLElBQUlHLFVBQVQsRUFBcUI7QUFDbkJDLG1CQUFPQyxNQUFQLENBQWNMLEdBQWQsRUFBbUIsRUFBRUcsWUFBWSxFQUFkLEVBQW5CO0FBQ0Q7QUFDRCxjQUFJQSxhQUFhSCxJQUFJRyxVQUFyQjtBQUNBLGNBQUlKLFNBQVMsQ0FBQ0ksV0FBV0csT0FBWCxJQUFzQixJQUF2QixJQUErQixDQUE1QztBQUNBSCxxQkFBV0csT0FBWCxHQUFxQlAsTUFBckI7QUFDQSxpQkFBT0EsTUFBUDtBQUNEO0FBQ0QsZUFBTyxDQUFQO0FBQ0Q7QUFiUSxLLFFBZVhRLE8sR0FBVTtBQUNSQyxjQURRLHNCQUNHO0FBQ1QsWUFBSSxLQUFLWixJQUFMLENBQVVQLE1BQVYsS0FBcUIsTUFBekIsRUFBaUM7QUFDL0IsZUFBS29CLElBQUw7QUFDRDtBQUNGLE9BTE87QUFNUkMsVUFOUSxrQkFNRDtBQUNMLGVBQU8sSUFBUDtBQUNEO0FBUk8sSzs7Ozs7K0JBV0M7QUFDVCxXQUFLYixVQUFMLEdBQWtCLE1BQWxCO0FBQ0Q7OzsrQkFDVTtBQUNULFdBQUtBLFVBQUwsR0FBa0IsTUFBbEI7QUFDRDs7OzJCQUNNO0FBQUE7O0FBQ0wsVUFBSSxLQUFLSixhQUFMLEtBQXVCLE1BQTNCLEVBQW1DO0FBQ2pDLGFBQUtrQixRQUFMO0FBQ0EsYUFBS2hCLE1BQUwsR0FBYyxRQUFkO0FBQ0FpQixtQkFBVyxZQUFNO0FBQ2YsaUJBQUtqQixNQUFMLEdBQWMsTUFBZDtBQUNBLGlCQUFLa0IsTUFBTDtBQUNELFNBSEQsRUFHRyxFQUhIO0FBSUQsT0FQRCxNQU9PO0FBQ0wsYUFBS0YsUUFBTDtBQUNBLGFBQUtoQixNQUFMLEdBQWMsTUFBZDtBQUNEO0FBQ0QsV0FBS2tCLE1BQUw7QUFDRDs7O2dDQUNXO0FBQ1YsV0FBS2xCLE1BQUwsR0FBYyxNQUFkO0FBQ0EsV0FBS21CLFFBQUw7QUFDRDs7OytCQUNVO0FBQ1QsVUFBSSxLQUFLbEIsSUFBTCxDQUFVUCxNQUFWLEtBQXFCLE1BQXpCLEVBQWlDO0FBQy9CLGFBQUtvQixJQUFMO0FBQ0Q7QUFDRjs7OzJCQUNNO0FBQUE7O0FBQ0xNLGNBQVFDLEdBQVIsQ0FBWSxLQUFLcEIsSUFBTCxDQUFVUCxNQUF0QjtBQUNBLFVBQUksS0FBS08sSUFBTCxDQUFVSCxhQUFWLEtBQTRCLE1BQWhDLEVBQXdDO0FBQ3RDLGFBQUtFLE1BQUwsR0FBYyxTQUFkO0FBQ0FzQixxQkFBYSxLQUFLQyxNQUFsQjs7QUFFQSxhQUFLQSxNQUFMLEdBQWNOLFdBQVcsWUFBTTtBQUM3QixpQkFBS08sU0FBTDtBQUNBLGlCQUFLTixNQUFMO0FBQ0QsU0FIYSxFQUdYLEdBSFcsQ0FBZDtBQUlELE9BUkQsTUFRTztBQUNMO0FBQ0EsYUFBS00sU0FBTDtBQUNEO0FBQ0QsV0FBS04sTUFBTDtBQUNEOzs7O0VBcEdtQ08sZUFBS0MsUzs7a0JBQXRCdkMsUSIsImZpbGUiOiJkaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IEFsTWFzayBmcm9tICcuL2RpYWxvZy1tYXNrJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsRGlhbG9nIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wiYWwtbWFza1wiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c3RhdHVzLnN5bmNcIjpcIm1hc2tTdGF0dXNcIixcInYtYmluZDpsb2NrZWQuc3luY1wiOlwibG9ja2VkXCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAnYWwtbWFzayc6IEFsTWFza1xuICB9XG4gIHByb3BzID0ge1xuICAgIGxvY2tlZDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2hpZGUnXG4gICAgfSxcbiAgICBhbmltYXRpb25Nb2RlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnbm9uZSdcbiAgICB9LFxuICAgIGFsaWduOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnY2VudGVyJ1xuICAgIH0sXG4gICAgc3RhdHVzOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnaGlkZSdcbiAgICB9XG4gIH1cblxuICBkYXRhID0ge1xuICAgIG1hc2tTdGF0dXM6ICdoaWRlJ1xuICB9XG5cbiAgY29tcHV0ZWQgPSB7XG4gICAgekluZGV4KCkge1xuICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSAnc2hvdycpIHtcbiAgICAgICAgbGV0IGFwcCA9IHRoaXMuJHJvb3QuJHBhcmVudDtcbiAgICAgICAgaWYgKCFhcHAuZ2xvYmFsRGF0YSkge1xuICAgICAgICAgIE9iamVjdC5hc3NpZ24oYXBwLCB7IGdsb2JhbERhdGE6IHt9IH0pO1xuICAgICAgICB9XG4gICAgICAgIGxldCBnbG9iYWxEYXRhID0gYXBwLmdsb2JhbERhdGE7XG4gICAgICAgIGxldCB6SW5kZXggPSAoZ2xvYmFsRGF0YS5fekluZGV4IHx8IDEwMDApICsgMTtcbiAgICAgICAgZ2xvYmFsRGF0YS5fekluZGV4ID0gekluZGV4O1xuICAgICAgICByZXR1cm4gekluZGV4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgcG9wdXBUYXAoKSB7XG4gICAgICBpZiAodGhpcy5kYXRhLmxvY2tlZCAhPT0gJ3RydWUnKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc3RvcCgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHNob3dNYXNrKCkge1xuICAgIHRoaXMubWFza1N0YXR1cyA9ICdzaG93JztcbiAgfVxuICBoaWRlTWFzaygpIHtcbiAgICB0aGlzLm1hc2tTdGF0dXMgPSAnaGlkZSc7XG4gIH1cbiAgc2hvdygpIHtcbiAgICBpZiAodGhpcy5hbmltYXRpb25Nb2RlICE9PSAnbm9uZScpIHtcbiAgICAgIHRoaXMuc2hvd01hc2soKTtcbiAgICAgIHRoaXMuc3RhdHVzID0gJ2ZhZGVJbic7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSAnc2hvdyc7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9LCA1MCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvd01hc2soKTtcbiAgICAgIHRoaXMuc3RhdHVzID0gJ3Nob3cnO1xuICAgIH1cbiAgICB0aGlzLiRhcHBseSgpO1xuICB9XG4gIGZvcmNlSGlkZSgpIHtcbiAgICB0aGlzLnN0YXR1cyA9ICdoaWRlJztcbiAgICB0aGlzLmhpZGVNYXNrKCk7XG4gIH1cbiAgcG9wdXBUYXAoKSB7XG4gICAgaWYgKHRoaXMuZGF0YS5sb2NrZWQgIT09ICd0cnVlJykge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICB9XG4gIGhpZGUoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5kYXRhLmxvY2tlZCk7XG4gICAgaWYgKHRoaXMuZGF0YS5hbmltYXRpb25Nb2RlICE9PSAnbm9uZScpIHtcbiAgICAgIHRoaXMuc3RhdHVzID0gJ2ZhZGVPdXQnO1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcblxuICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5mb3JjZUhpZGUoKTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOayoeacieWKqOeUu1xuICAgICAgdGhpcy5mb3JjZUhpZGUoKTtcbiAgICB9XG4gICAgdGhpcy4kYXBwbHkoKTtcbiAgfVxufVxuIl19