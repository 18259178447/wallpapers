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

var PagerView = function(_wepy$component) {
    _inherits(PagerView, _wepy$component);
    function PagerView() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, PagerView);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PagerView.__proto__ || Object.getPrototypeOf(PagerView)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            total: {
                type: Number,
                default: 0
            },
            currentIndex: {
                type: Number,
                default: 1,
                twoWay: true
            }
        }, _this.data = {}, _this.components = {}, _this.methods = {
            last: function last() {
                if (parseInt(this.currentIndex) === 1) {
                    _wepy2.default.showToast({
                        title: "已经是第1页了",
                        // 提示的内容,
                        icon: "none",
                        // 图标,
                        duration: 1500
                    });
                } else {
                    this.change(this.currentIndex - 1);
                }
            },
            next: function next() {
                if (parseInt(this.currentIndex) === parseInt(this.total)) {
                    _wepy2.default.showToast({
                        title: "已经是最后1页了",
                        // 提示的内容,
                        icon: "none",
                        // 图标,
                        duration: 1500
                    });
                } else {
                    this.change(this.currentIndex + 1);
                }
            },
            inputChange: function inputChange(evt) {
                var index = evt.detail.value;
                if (/^[1-9][0-9]*$/.test(index.toString())) {
                    this.change(index);
                } else {
                    _wepy2.default.showToast({
                        title: "请输入有效数字",
                        // 提示的内容,
                        icon: "none",
                        // 图标,
                        duration: 2e3
                    });
                }
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(PagerView, [ {
        key: "change",
        value: function change(index) {
            if (index > 0 && index <= this.total) {
                this.currentIndex = index;
                this.$emit("change", index);
            }
        }
    }, {
        key: "onLoad",
        value: function onLoad() {
            console.log(this.total);
        }
    } ]);
    return PagerView;
}(_wepy2.default.component);

exports.default = PagerView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VyLmpzIl0sIm5hbWVzIjpbIlBhZ2VyVmlldyIsInByb3BzIiwidG90YWwiLCJ0eXBlIiwiTnVtYmVyIiwiZGVmYXVsdCIsImN1cnJlbnRJbmRleCIsInR3b1dheSIsImRhdGEiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsImxhc3QiLCJwYXJzZUludCIsIndlcHkiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImNoYW5nZSIsIm5leHQiLCJpbnB1dENoYW5nZSIsImV2dCIsImluZGV4IiwiZGV0YWlsIiwidmFsdWUiLCJ0ZXN0IiwidG9TdHJpbmciLCJldmVudHMiLCJ3YXRjaCIsImNvbXB1dGVkIiwiJGVtaXQiLCJjb25zb2xlIiwibG9nIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLEssR0FBUTtBQUNOQyxhQUFPO0FBQ0xDLGNBQU1DLE1BREQ7QUFFTEMsaUJBQVM7QUFGSixPQUREO0FBS05DLG9CQUFjO0FBQ1pILGNBQU1DLE1BRE07QUFFWkMsaUJBQVMsQ0FGRztBQUdaRSxnQkFBUTtBQUhJO0FBTFIsSyxRQVlSQyxJLEdBQU8sRSxRQUVQQyxVLEdBQWEsRSxRQUViQyxPLEdBQVU7QUFDUkMsVUFEUSxrQkFDRDtBQUNMLFlBQUlDLFNBQVMsS0FBS04sWUFBZCxNQUFnQyxDQUFwQyxFQUF1QztBQUNyQ08seUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxtQkFBTyxTQURNLEVBQ0s7QUFDbEJDLGtCQUFNLE1BRk8sRUFFQztBQUNkQyxzQkFBVTtBQUhHLFdBQWY7QUFLRCxTQU5ELE1BTU87QUFDTCxlQUFLQyxNQUFMLENBQVksS0FBS1osWUFBTCxHQUFvQixDQUFoQztBQUNEO0FBQ0YsT0FYTztBQVlSYSxVQVpRLGtCQVlEO0FBQ0wsWUFBSVAsU0FBUyxLQUFLTixZQUFkLE1BQWdDTSxTQUFTLEtBQUtWLEtBQWQsQ0FBcEMsRUFBMEQ7QUFDeERXLHlCQUFLQyxTQUFMLENBQWU7QUFDYkMsbUJBQU8sVUFETSxFQUNNO0FBQ25CQyxrQkFBTSxNQUZPLEVBRUM7QUFDZEMsc0JBQVU7QUFIRyxXQUFmO0FBS0QsU0FORCxNQU1PO0FBQ0wsZUFBS0MsTUFBTCxDQUFZLEtBQUtaLFlBQUwsR0FBb0IsQ0FBaEM7QUFDRDtBQUNGLE9BdEJPO0FBdUJSYyxpQkF2QlEsdUJBdUJJQyxHQXZCSixFQXVCUztBQUNmLFlBQUlDLFFBQVFELElBQUlFLE1BQUosQ0FBV0MsS0FBdkI7QUFDQSxZQUFJLGdCQUFnQkMsSUFBaEIsQ0FBcUJILE1BQU1JLFFBQU4sRUFBckIsQ0FBSixFQUE0QztBQUMxQyxlQUFLUixNQUFMLENBQVlJLEtBQVo7QUFDRCxTQUZELE1BRU87QUFDTFQseUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxtQkFBTyxTQURNLEVBQ0s7QUFDbEJDLGtCQUFNLE1BRk8sRUFFQztBQUNkQyxzQkFBVTtBQUhHLFdBQWY7QUFLRDtBQUNGO0FBbENPLEssUUE0Q1ZVLE0sR0FBUyxFLFFBRVRDLEssR0FBUSxFLFFBRVJDLFEsR0FBVyxFOzs7OzsyQkFYSlAsSyxFQUFPO0FBQ1osVUFBSUEsUUFBUSxDQUFSLElBQWFBLFNBQVMsS0FBS3BCLEtBQS9CLEVBQXNDO0FBQ3BDLGFBQUtJLFlBQUwsR0FBb0JnQixLQUFwQjtBQUNBLGFBQUtRLEtBQUwsQ0FBVyxRQUFYLEVBQXFCUixLQUFyQjtBQUNEO0FBQ0Y7Ozs2QkFRUTtBQUNQUyxjQUFRQyxHQUFSLENBQVksS0FBSzlCLEtBQWpCO0FBQ0Q7Ozs7RUFyRW9DVyxlQUFLb0IsUzs7a0JBQXZCakMsUyIsImZpbGUiOiJwYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlclZpZXcgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gIHByb3BzID0ge1xuICAgIHRvdGFsOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcbiAgICBjdXJyZW50SW5kZXg6IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIGRlZmF1bHQ6IDEsXG4gICAgICB0d29XYXk6IHRydWVcbiAgICB9XG4gIH07XG5cbiAgZGF0YSA9IHt9O1xuXG4gIGNvbXBvbmVudHMgPSB7fTtcblxuICBtZXRob2RzID0ge1xuICAgIGxhc3QoKSB7XG4gICAgICBpZiAocGFyc2VJbnQodGhpcy5jdXJyZW50SW5kZXgpID09PSAxKSB7XG4gICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+W3sue7j+aYr+esrDHpobXkuoYnLCAvLyDmj5DnpLrnmoTlhoXlrrksXG4gICAgICAgICAgaWNvbjogJ25vbmUnLCAvLyDlm77moIcsXG4gICAgICAgICAgZHVyYXRpb246IDE1MDBcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoYW5nZSh0aGlzLmN1cnJlbnRJbmRleCAtIDEpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbmV4dCgpIHtcbiAgICAgIGlmIChwYXJzZUludCh0aGlzLmN1cnJlbnRJbmRleCkgPT09IHBhcnNlSW50KHRoaXMudG90YWwpKSB7XG4gICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+W3sue7j+aYr+acgOWQjjHpobXkuoYnLCAvLyDmj5DnpLrnmoTlhoXlrrksXG4gICAgICAgICAgaWNvbjogJ25vbmUnLCAvLyDlm77moIcsXG4gICAgICAgICAgZHVyYXRpb246IDE1MDBcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNoYW5nZSh0aGlzLmN1cnJlbnRJbmRleCArIDEpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaW5wdXRDaGFuZ2UoZXZ0KSB7XG4gICAgICBsZXQgaW5kZXggPSBldnQuZGV0YWlsLnZhbHVlO1xuICAgICAgaWYgKC9eWzEtOV1bMC05XSokLy50ZXN0KGluZGV4LnRvU3RyaW5nKCkpKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlKGluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeacieaViOaVsOWtlycsIC8vIOaPkOekuueahOWGheWuuSxcbiAgICAgICAgICBpY29uOiAnbm9uZScsIC8vIOWbvuaghyxcbiAgICAgICAgICBkdXJhdGlvbjogMjAwMFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY2hhbmdlKGluZGV4KSB7XG4gICAgaWYgKGluZGV4ID4gMCAmJiBpbmRleCA8PSB0aGlzLnRvdGFsKSB7XG4gICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGV2ZW50cyA9IHt9O1xuXG4gIHdhdGNoID0ge307XG5cbiAgY29tcHV0ZWQgPSB7fTtcblxuICBvbkxvYWQoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy50b3RhbCk7XG4gIH07XG59XG4iXX0=