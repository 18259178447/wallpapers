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

var Example = function(_wepy$component) {
    _inherits(Example, _wepy$component);
    function Example() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, Example);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Example.__proto__ || Object.getPrototypeOf(Example)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.props = {
            imgs: Array
        }, _this.data = {}, _this.components = {}, _this.methods = {
            error: function error(index) {
                this.imgs[index].loaded = true;
            },
            detail: function detail(id) {
                this.$root.$navigate("/pages/detail/detail", {
                    id: id
                });
            },
            itemTap: function itemTap(index) {
                this.$root.$navigate("/pages/picture/category", {
                    id: this.imgs[index].id,
                    name: this.imgs[index].name
                });
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Example, [ {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "onShow",
        value: function onShow() {}
    } ]);
    return Example;
}(_wepy2.default.component);

exports.default = Example;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LWxpc3QuanMiXSwibmFtZXMiOlsiRXhhbXBsZSIsInByb3BzIiwiaW1ncyIsIkFycmF5IiwiZGF0YSIsImNvbXBvbmVudHMiLCJtZXRob2RzIiwiZXJyb3IiLCJpbmRleCIsImxvYWRlZCIsImRldGFpbCIsImlkIiwiJHJvb3QiLCIkbmF2aWdhdGUiLCJpdGVtVGFwIiwibmFtZSIsImV2ZW50cyIsIndhdGNoIiwiY29tcHV0ZWQiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxPOzs7Ozs7Ozs7Ozs7Ozt3TEFDbkJDLEssR0FBUTtBQUNOQyxZQUFNQztBQURBLEssUUFHUkMsSSxHQUFPLEUsUUFDUEMsVSxHQUFhLEUsUUFDYkMsTyxHQUFVO0FBQ1JDLFdBRFEsaUJBQ0ZDLEtBREUsRUFDSztBQUNYLGFBQUtOLElBQUwsQ0FBVU0sS0FBVixFQUFpQkMsTUFBakIsR0FBMEIsSUFBMUI7QUFDRCxPQUhPO0FBSVJDLFlBSlEsa0JBSURDLEVBSkMsRUFJRztBQUNULGFBQUtDLEtBQUwsQ0FBV0MsU0FBWCx5QkFBNkMsRUFBRUYsTUFBRixFQUE3QztBQUNELE9BTk87QUFPUkcsYUFQUSxtQkFPQU4sS0FQQSxFQU9PO0FBQ2IsYUFBS0ksS0FBTCxDQUFXQyxTQUFYLDRCQUFnRCxFQUFFRixJQUFJLEtBQUtULElBQUwsQ0FBVU0sS0FBVixFQUFpQkcsRUFBdkIsRUFBMkJJLE1BQU0sS0FBS2IsSUFBTCxDQUFVTSxLQUFWLEVBQWlCTyxJQUFsRCxFQUFoRDtBQUNEO0FBVE8sSyxRQVdWQyxNLEdBQVMsRSxRQUNUQyxLLEdBQVEsRSxRQUNSQyxRLEdBQVcsRTs7Ozs7NkJBQ0YsQ0FBRzs7OzZCQUNILENBQUc7Ozs7RUFyQnVCQyxlQUFLQyxTOztrQkFBckJwQixPIiwiZmlsZSI6ImNhdGVnb3J5LWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhhbXBsZSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgcHJvcHMgPSB7XG4gICAgaW1nczogQXJyYXlcbiAgfTtcbiAgZGF0YSA9IHt9O1xuICBjb21wb25lbnRzID0ge307XG4gIG1ldGhvZHMgPSB7XG4gICAgZXJyb3IoaW5kZXgpIHtcbiAgICAgIHRoaXMuaW1nc1tpbmRleF0ubG9hZGVkID0gdHJ1ZTtcbiAgICB9LFxuICAgIGRldGFpbChpZCkge1xuICAgICAgdGhpcy4kcm9vdC4kbmF2aWdhdGUoYC9wYWdlcy9kZXRhaWwvZGV0YWlsYCwgeyBpZCB9KTtcbiAgICB9LFxuICAgIGl0ZW1UYXAoaW5kZXgpIHtcbiAgICAgIHRoaXMuJHJvb3QuJG5hdmlnYXRlKGAvcGFnZXMvcGljdHVyZS9jYXRlZ29yeWAsIHsgaWQ6IHRoaXMuaW1nc1tpbmRleF0uaWQsIG5hbWU6IHRoaXMuaW1nc1tpbmRleF0ubmFtZSB9KTtcbiAgICB9XG4gIH07XG4gIGV2ZW50cyA9IHt9O1xuICB3YXRjaCA9IHt9O1xuICBjb21wdXRlZCA9IHt9O1xuICBvbkxvYWQoKSB7IH07XG4gIG9uU2hvdygpIHsgfTtcbn1cbiJdfQ==