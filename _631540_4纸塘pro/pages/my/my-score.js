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

var _listHeader = require("./../../components/list-header.js");

var _listHeader2 = _interopRequireDefault(_listHeader);

var _api = require("./../../api/api.js");

var _api2 = _interopRequireDefault(_api);

var _empty = require("./../../components/empty.js");

var _empty2 = _interopRequireDefault(_empty);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
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

var MyScorePage = function(_wepy$page) {
    _inherits(MyScorePage, _wepy$page);
    function MyScorePage() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, MyScorePage);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MyScorePage.__proto__ || Object.getPrototypeOf(MyScorePage)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {}, _this.data = {
            user: null,
            selectedTab: 0,
            records: [],
            index: 0,
            size: 30,
            totalPages: 1,
            loading: false
        }, _this.$repeat = {}, _this.$props = {
            navbar: {
                padding: "true",
                title: "积分"
            },
            header1: {
                title: "积分如何获取？"
            },
            header2: {
                title: "积分有什么用？"
            },
            empty: {}
        }, _this.$events = {}, _this.components = {
            navbar: _navbar2.default,
            header1: _listHeader2.default,
            header2: _listHeader2.default,
            empty: _empty2.default
        }, _this.methods = {
            selected: function selected(index) {
                this.selectedTab = index;
            }
        }, _this.events = {}, _this.watch = {}, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(MyScorePage, [ {
        key: "onLoad",
        value: function onLoad() {}
    }, {
        key: "onShow",
        value: function onShow() {
            var _this2 = this;
            this.fetch();
            this.$parent.getUserInfo(function(user) {
                _this2.user = user;
            });
        }
    }, {
        key: "fetch",
        value: function fetch() {
            var _this3 = this;
            if (!this.loading && this.index < this.totalPages) {
                this.loading = true;
                _api2.default.fetchScoreRecords(this.index, this.size).then(function(res) {
                    var _records;
                    (_records = _this3.records).push.apply(_records, _toConsumableArray(res.records));
                    _this3.totalPages = res.totalPages;
                    _this3.index++;
                    _this3.loading = false;
                    _this3.$apply();
                }, function(err) {
                    console.log(err);
                });
            }
        }
    }, {
        key: "onReachBottom",
        value: function onReachBottom() {
            this.fetch();
        }
    } ]);
    return MyScorePage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(MyScorePage, "pages/my/my-score"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LXNjb3JlLmpzIl0sIm5hbWVzIjpbIk15U2NvcmVQYWdlIiwiY29uZmlnIiwiZGF0YSIsInVzZXIiLCJzZWxlY3RlZFRhYiIsInJlY29yZHMiLCJpbmRleCIsInNpemUiLCJ0b3RhbFBhZ2VzIiwibG9hZGluZyIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hdmJhciIsImhlYWRlcjEiLCJsaXN0SGVhZGVyIiwiaGVhZGVyMiIsImVtcHR5IiwibWV0aG9kcyIsInNlbGVjdGVkIiwiZXZlbnRzIiwid2F0Y2giLCJjb21wdXRlZCIsImZldGNoIiwiJHBhcmVudCIsImdldFVzZXJJbmZvIiwiYXBpIiwiZmV0Y2hTY29yZVJlY29yZHMiLCJ0aGVuIiwicHVzaCIsInJlcyIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJlcnIiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsTSxHQUFTLEUsUUFDVEMsSSxHQUFPO0FBQ0xDLFlBQU0sSUFERDtBQUVMQyxtQkFBYSxDQUZSO0FBR0xDLGVBQVMsRUFISjtBQUlMQyxhQUFPLENBSkY7QUFLTEMsWUFBTSxFQUxEO0FBTUxDLGtCQUFZLENBTlA7QUFPTEMsZUFBUztBQVBKLEssUUFTUkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLFdBQVUsTUFBWCxFQUFrQixTQUFRLElBQTFCLEVBQVYsRUFBMEMsV0FBVSxFQUFDLFNBQVEsU0FBVCxFQUFwRCxFQUF3RSxXQUFVLEVBQUMsU0FBUSxTQUFULEVBQWxGLEVBQXNHLFNBQVEsRUFBOUcsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkMsOEJBRFU7QUFFVkMsZUFBU0Msb0JBRkM7QUFHVkMsZUFBU0Qsb0JBSEM7QUFJVkU7QUFKVSxLLFFBTVpDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNDZCxLQURELEVBQ1E7QUFDZCxhQUFLRixXQUFMLEdBQW1CRSxLQUFuQjtBQUNEO0FBSE8sSyxRQUtWZSxNLEdBQVMsRSxRQUNUQyxLLEdBQVEsRSxRQUNSQyxRLEdBQVcsRTs7Ozs7NkJBQ0YsQ0FBRzs7OzZCQUNIO0FBQUE7O0FBQ1AsV0FBS0MsS0FBTDtBQUNBLFdBQUtDLE9BQUwsQ0FBYUMsV0FBYixDQUF5QixnQkFBUTtBQUMvQixlQUFLdkIsSUFBTCxHQUFZQSxJQUFaO0FBQ0QsT0FGRDtBQUdEOzs7NEJBQ087QUFBQTs7QUFDTixVQUFJLENBQUMsS0FBS00sT0FBTixJQUFpQixLQUFLSCxLQUFMLEdBQWEsS0FBS0UsVUFBdkMsRUFBbUQ7QUFDakQsYUFBS0MsT0FBTCxHQUFlLElBQWY7QUFDQWtCLHNCQUFJQyxpQkFBSixDQUFzQixLQUFLdEIsS0FBM0IsRUFBa0MsS0FBS0MsSUFBdkMsRUFBNkNzQixJQUE3QyxDQUFrRCxlQUFPO0FBQUE7O0FBQ3ZELDZCQUFLeEIsT0FBTCxFQUFheUIsSUFBYixvQ0FBcUJDLElBQUkxQixPQUF6QjtBQUNBLGlCQUFLRyxVQUFMLEdBQWtCdUIsSUFBSXZCLFVBQXRCO0FBQ0EsaUJBQUtGLEtBQUw7QUFDQSxpQkFBS0csT0FBTCxHQUFlLEtBQWY7QUFDQSxpQkFBS3VCLE1BQUw7QUFDRCxTQU5ELEVBTUcsZUFBTztBQUNSQyxrQkFBUUMsR0FBUixDQUFZQyxHQUFaO0FBQ0QsU0FSRDtBQVNEO0FBQ0Y7OztvQ0FDZTtBQUNkLFdBQUtYLEtBQUw7QUFDRDs7OztFQW5Ec0NZLGVBQUtDLEk7O2tCQUF6QnJDLFciLCJmaWxlIjoibXktc2NvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuaW1wb3J0IG5hdmJhciBmcm9tICcuLi8uLi9jb21wb25lbnRzL25hdmJhcic7XG5pbXBvcnQgbGlzdEhlYWRlciBmcm9tICcuLi8uLi9jb21wb25lbnRzL2xpc3QtaGVhZGVyJztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XG5pbXBvcnQgZW1wdHkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9lbXB0eSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeVNjb3JlUGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHt9O1xuICBkYXRhID0ge1xuICAgIHVzZXI6IG51bGwsXG4gICAgc2VsZWN0ZWRUYWI6IDAsXG4gICAgcmVjb3JkczogW10sXG4gICAgaW5kZXg6IDAsXG4gICAgc2l6ZTogMzAsXG4gICAgdG90YWxQYWdlczogMSxcbiAgICBsb2FkaW5nOiBmYWxzZVxuICB9O1xuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wibmF2YmFyXCI6e1wicGFkZGluZ1wiOlwidHJ1ZVwiLFwidGl0bGVcIjpcIuenr+WIhlwifSxcImhlYWRlcjFcIjp7XCJ0aXRsZVwiOlwi56ev5YiG5aaC5L2V6I635Y+W77yfXCJ9LFwiaGVhZGVyMlwiOntcInRpdGxlXCI6XCLnp6/liIbmnInku4DkuYjnlKjvvJ9cIn0sXCJlbXB0eVwiOnt9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBuYXZiYXIsXG4gICAgaGVhZGVyMTogbGlzdEhlYWRlcixcbiAgICBoZWFkZXIyOiBsaXN0SGVhZGVyLFxuICAgIGVtcHR5XG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgc2VsZWN0ZWQoaW5kZXgpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSBpbmRleDtcbiAgICB9XG4gIH07XG4gIGV2ZW50cyA9IHt9O1xuICB3YXRjaCA9IHt9O1xuICBjb21wdXRlZCA9IHt9O1xuICBvbkxvYWQoKSB7IH07XG4gIG9uU2hvdygpIHtcbiAgICB0aGlzLmZldGNoKCk7XG4gICAgdGhpcy4kcGFyZW50LmdldFVzZXJJbmZvKHVzZXIgPT4ge1xuICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICB9KTtcbiAgfTtcbiAgZmV0Y2goKSB7XG4gICAgaWYgKCF0aGlzLmxvYWRpbmcgJiYgdGhpcy5pbmRleCA8IHRoaXMudG90YWxQYWdlcykge1xuICAgICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICAgIGFwaS5mZXRjaFNjb3JlUmVjb3Jkcyh0aGlzLmluZGV4LCB0aGlzLnNpemUpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5yZWNvcmRzLnB1c2goLi4ucmVzLnJlY29yZHMpO1xuICAgICAgICB0aGlzLnRvdGFsUGFnZXMgPSByZXMudG90YWxQYWdlcztcbiAgICAgICAgdGhpcy5pbmRleCsrO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgb25SZWFjaEJvdHRvbSgpIHtcbiAgICB0aGlzLmZldGNoKCk7XG4gIH1cbn1cbiJdfQ==