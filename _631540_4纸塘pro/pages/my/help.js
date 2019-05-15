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
        _this), _this.config = {
            navigationBarTitleText: "帮助中心",
            navigationStyle: "default"
        }, _this.data = {
            src: "https://ztwp.ninefrost.com/static/help.html"
        }, _this.components = {}, _this.methods = {}, _this.events = {}, _this.watch = {}, 
        _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Example, [ {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "onShow",
        value: function onShow() {}
    } ]);
    return Example;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Example, "pages/my/help"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlbHAuanMiXSwibmFtZXMiOlsiRXhhbXBsZSIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uU3R5bGUiLCJkYXRhIiwic3JjIiwiY29tcG9uZW50cyIsIm1ldGhvZHMiLCJldmVudHMiLCJ3YXRjaCIsImNvbXB1dGVkIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyx1QkFBaUI7QUFGVixLLFFBS1RDLEksR0FBTztBQUNMQyxXQUFLO0FBREEsSyxRQUlQQyxVLEdBQWEsRSxRQUViQyxPLEdBQVUsRSxRQUVWQyxNLEdBQVMsRSxRQUVUQyxLLEdBQVEsRSxRQUVSQyxRLEdBQVcsRTs7Ozs7NkJBRUYsQ0FBRzs7OzZCQUVILENBQUc7Ozs7RUF0QnVCQyxlQUFLQyxJOztrQkFBckJaLE8iLCJmaWxlIjoiaGVscC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeGFtcGxlIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgY29uZmlnID0ge1xuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfluK7liqnkuK3lv4MnLFxuICAgIG5hdmlnYXRpb25TdHlsZTogJ2RlZmF1bHQnXG4gIH07XG5cbiAgZGF0YSA9IHtcbiAgICBzcmM6ICdodHRwczovL3p0d3AubmluZWZyb3N0LmNvbS9zdGF0aWMvaGVscC5odG1sJ1xuICB9O1xuXG4gIGNvbXBvbmVudHMgPSB7fTtcblxuICBtZXRob2RzID0ge307XG5cbiAgZXZlbnRzID0ge307XG5cbiAgd2F0Y2ggPSB7fTtcblxuICBjb21wdXRlZCA9IHt9O1xuXG4gIG9uTG9hZCgpIHsgfTtcblxuICBvblNob3coKSB7IH07XG59XG4iXX0=