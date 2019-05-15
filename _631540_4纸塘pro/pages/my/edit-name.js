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

var _navbar = require("./../../components/navbar.js");

var _navbar2 = _interopRequireDefault(_navbar);

var _api = require("./../../api/api.js");

var _api2 = _interopRequireDefault(_api);

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

var MyInfoPage = function(_wepy$page) {
    _inherits(MyInfoPage, _wepy$page);
    function MyInfoPage() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, MyInfoPage);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MyInfoPage.__proto__ || Object.getPrototypeOf(MyInfoPage)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {}, _this.data = {
            user: null
        }, _this.$repeat = {}, _this.$props = {
            navbar: {
                padding: "true",
                title: "编辑昵称"
            }
        }, _this.$events = {}, _this.components = {
            navbar: _navbar2.default
        }, _this.methods = {
            submit: function submit(evt) {
                var value = evt.detail.value;
                if (value && value.trim) {
                    _api2.default.updateInfo(this.user.avatar, value).then(function() {
                        _wepy2.default.navigateBack({
                            delta: 1
                        });
                    }, function(err) {
                        console.log(err);
                    });
                }
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(MyInfoPage, [ {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "onShow",
        value: function onShow() {
            var _this2 = this;
            this.$parent.getUserInfo(function(user) {
                _this2.user = user;
                _this2.$apply();
            });
        }
    } ]);
    return MyInfoPage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(MyInfoPage, "pages/my/edit-name"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXQtbmFtZS5qcyJdLCJuYW1lcyI6WyJNeUluZm9QYWdlIiwiY29uZmlnIiwiZGF0YSIsInVzZXIiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJuYXZiYXIiLCJtZXRob2RzIiwic3VibWl0IiwiZXZ0IiwidmFsdWUiLCJkZXRhaWwiLCJ0cmltIiwiYXBpIiwidXBkYXRlSW5mbyIsImF2YXRhciIsInRoZW4iLCJ3ZXB5IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJjb25zb2xlIiwibG9nIiwiZXJyIiwiZXZlbnRzIiwid2F0Y2giLCJjb21wdXRlZCIsIiRwYXJlbnQiLCJnZXRVc2VySW5mbyIsIiRhcHBseSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxVOzs7Ozs7Ozs7Ozs7Ozs4TEFDbkJDLE0sR0FBUyxFLFFBR1RDLEksR0FBTztBQUNMQyxZQUFNO0FBREQsSyxRQUlSQyxPLEdBQVUsRSxRQUNYQyxNLEdBQVMsRUFBQyxVQUFTLEVBQUMsV0FBVSxNQUFYLEVBQWtCLFNBQVEsTUFBMUIsRUFBVixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQztBQURVLEssUUFJWkMsTyxHQUFVO0FBQ1JDLFlBRFEsa0JBQ0RDLEdBREMsRUFDSTtBQUNWLFlBQUlDLFFBQVFELElBQUlFLE1BQUosQ0FBV0QsS0FBdkI7QUFDQSxZQUFJQSxTQUFTQSxNQUFNRSxJQUFuQixFQUF5QjtBQUN2QkMsd0JBQUlDLFVBQUosQ0FBZSxLQUFLYixJQUFMLENBQVVjLE1BQXpCLEVBQWlDTCxLQUFqQyxFQUF3Q00sSUFBeEMsQ0FBNkMsWUFBTTtBQUNqREMsMkJBQUtDLFlBQUwsQ0FBa0I7QUFDaEJDLHFCQUFPLENBRFMsQ0FDUDtBQURPLGFBQWxCO0FBR0QsV0FKRCxFQUlHLGVBQU87QUFDUkMsb0JBQVFDLEdBQVIsQ0FBWUMsR0FBWjtBQUNELFdBTkQ7QUFPRDtBQUNGO0FBWk8sSyxRQWVWQyxNLEdBQVMsRSxRQUVUQyxLLEdBQVEsRSxRQUVSQyxRLEdBQVcsRTs7Ozs7NkJBRUYsQ0FBRzs7OzZCQUVIO0FBQUE7O0FBQ1AsV0FBS0MsT0FBTCxDQUFhQyxXQUFiLENBQXlCLGdCQUFRO0FBQy9CLGVBQUsxQixJQUFMLEdBQVlBLElBQVo7QUFDQSxlQUFLMkIsTUFBTDtBQUNELE9BSEQ7QUFJRDs7OztFQTNDcUNYLGVBQUtZLEk7O2tCQUF4Qi9CLFUiLCJmaWxlIjoiZWRpdC1uYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9uYXZiYXInO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE15SW5mb1BhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7XG4gIH07XG5cbiAgZGF0YSA9IHtcbiAgICB1c2VyOiBudWxsXG4gIH07XG5cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIm5hdmJhclwiOntcInBhZGRpbmdcIjpcInRydWVcIixcInRpdGxlXCI6XCLnvJbovpHmmLXnp7BcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIG5hdmJhclxuICB9O1xuXG4gIG1ldGhvZHMgPSB7XG4gICAgc3VibWl0KGV2dCkge1xuICAgICAgbGV0IHZhbHVlID0gZXZ0LmRldGFpbC52YWx1ZTtcbiAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS50cmltKSB7XG4gICAgICAgIGFwaS51cGRhdGVJbmZvKHRoaXMudXNlci5hdmF0YXIsIHZhbHVlKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjayh7XG4gICAgICAgICAgICBkZWx0YTogMSAvLyDov5Tlm57nmoTpobXpnaLmlbDvvIzlpoLmnpwgZGVsdGEg5aSn5LqO546w5pyJ6aG16Z2i5pWw77yM5YiZ6L+U5Zue5Yiw6aaW6aG1LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBldmVudHMgPSB7fTtcblxuICB3YXRjaCA9IHt9O1xuXG4gIGNvbXB1dGVkID0ge307XG5cbiAgb25Mb2FkKCkgeyB9O1xuXG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8odXNlciA9PiB7XG4gICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==