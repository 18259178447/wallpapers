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

var CommentView = function(_wepy$component) {
    _inherits(CommentView, _wepy$component);
    function CommentView() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, CommentView);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CommentView.__proto__ || Object.getPrototypeOf(CommentView)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            comments: Array
        }, _this.data = {}, _this.components = {}, _this.methods = {
            delete: function _delete(index, event) {
                var _this2 = this;
                _wepy2.default.showModal({
                    title: "提示",
                    content: "确定删除说说吗",
                    showCancel: true,
                    cancelText: "取消",
                    cancelColor: "#000000",
                    confirmText: "确定",
                    confirmColor: "#ffe600",
                    success: function success(res) {
                        // todo 删除
                        if (res.confirm) {
                            _wallpaperApi2.default.deleteComment(_this2.comments[index].id).then(function(res) {
                                _this2.$emit("fresh");
                            }, function(err) {
                                console.error(err);
                            });
                        }
                    }
                });
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(CommentView, [ {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "onShow",
        value: function onShow() {}
    } ]);
    return CommentView;
}(_wepy2.default.component);

exports.default = CommentView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1lbnQtbGlzdC5qcyJdLCJuYW1lcyI6WyJDb21tZW50VmlldyIsInByb3BzIiwiY29tbWVudHMiLCJBcnJheSIsImRhdGEiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsImRlbGV0ZSIsImluZGV4IiwiZXZlbnQiLCJ3ZXB5Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsImNhbmNlbFRleHQiLCJjYW5jZWxDb2xvciIsImNvbmZpcm1UZXh0IiwiY29uZmlybUNvbG9yIiwic3VjY2VzcyIsInJlcyIsImNvbmZpcm0iLCJhcGkiLCJkZWxldGVDb21tZW50IiwiaWQiLCJ0aGVuIiwiJGVtaXQiLCJjb25zb2xlIiwiZXJyb3IiLCJlcnIiLCJldmVudHMiLCJ3YXRjaCIsImNvbXB1dGVkIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsSyxHQUFRO0FBQ05DLGdCQUFVQztBQURKLEssUUFHUkMsSSxHQUFPLEUsUUFDUEMsVSxHQUFhLEUsUUFFYkMsTyxHQUFVO0FBQ1JDLFlBRFEsbUJBQ0RDLEtBREMsRUFDTUMsS0FETixFQUNhO0FBQUE7O0FBQ25CQyx1QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLGlCQUFPLElBRE07QUFFYkMsbUJBQVMsU0FGSTtBQUdiQyxzQkFBWSxJQUhDO0FBSWJDLHNCQUFZLElBSkM7QUFLYkMsdUJBQWEsU0FMQTtBQU1iQyx1QkFBYSxJQU5BO0FBT2JDLHdCQUFjLFNBUEQ7QUFRYkMsbUJBQVMsc0JBQU87QUFDZDtBQUNBLGdCQUFJQyxJQUFJQyxPQUFSLEVBQWlCO0FBQ2ZDLHFDQUFJQyxhQUFKLENBQWtCLE9BQUtyQixRQUFMLENBQWNNLEtBQWQsRUFBcUJnQixFQUF2QyxFQUEyQ0MsSUFBM0MsQ0FBZ0QsZUFBTztBQUNyRCx1QkFBS0MsS0FBTCxDQUFXLE9BQVg7QUFDRCxlQUZELEVBRUcsZUFBTztBQUNSQyx3QkFBUUMsS0FBUixDQUFjQyxHQUFkO0FBQ0QsZUFKRDtBQUtEO0FBQ0Y7QUFqQlksU0FBZjtBQW1CRDtBQXJCTyxLLFFBdUJWQyxNLEdBQVMsRSxRQUNUQyxLLEdBQVEsRSxRQUNSQyxRLEdBQVcsRTs7Ozs7NkJBQ0YsQ0FBRzs7OzZCQUNILENBQUc7Ozs7RUFsQzJCdEIsZUFBS3VCLFM7O2tCQUF6QmpDLFciLCJmaWxlIjoiY29tbWVudC1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL3dhbGxwYXBlci1hcGknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbWVudFZpZXcgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIGNvbW1lbnRzOiBBcnJheVxuICB9O1xuICBkYXRhID0ge307XG4gIGNvbXBvbmVudHMgPSB7XG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgZGVsZXRlKGluZGV4LCBldmVudCkge1xuICAgICAgd2VweS5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgIGNvbnRlbnQ6ICfnoa7lrprliKDpmaTor7Tor7TlkJcnLFxuICAgICAgICBzaG93Q2FuY2VsOiB0cnVlLFxuICAgICAgICBjYW5jZWxUZXh0OiAn5Y+W5raIJyxcbiAgICAgICAgY2FuY2VsQ29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgY29uZmlybVRleHQ6ICfnoa7lrponLFxuICAgICAgICBjb25maXJtQ29sb3I6ICcjZmZlNjAwJyxcbiAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAvLyB0b2RvIOWIoOmZpFxuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgYXBpLmRlbGV0ZUNvbW1lbnQodGhpcy5jb21tZW50c1tpbmRleF0uaWQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnZnJlc2gnKTtcbiAgICAgICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBldmVudHMgPSB7fTtcbiAgd2F0Y2ggPSB7fTtcbiAgY29tcHV0ZWQgPSB7fTtcbiAgb25Mb2FkKCkgeyB9O1xuICBvblNob3coKSB7IH07XG59XG4iXX0=