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
            index: 0,
            totalPages: 1,
            size: 20,
            users: [],
            loading: false
        }, _this.$repeat = {}, _this.$props = {
            navbar: {
                padding: "true",
                title: "我的关注"
            },
            empty: {
                "xmlns:wx": ""
            }
        }, _this.$events = {}, _this.components = {
            navbar: _navbar2.default,
            empty: _empty2.default
        }, _this.methods = {
            goPerson: function goPerson(index) {
                _wepy2.default.navigateTo({
                    url: "/pages/person/index?id=" + this.users[index].id
                });
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(MyScorePage, [ {
        key: "onReady",
        value: function onReady() {
            this.fetch();
        }
    }, {
        key: "onReachBottom",
        value: function onReachBottom() {
            this.fetch();
        }
    }, {
        key: "fetch",
        value: function fetch() {
            var _this2 = this;
            if (!this.loading && this.index < this.totalPages) {
                _api2.default.fetchFollows(this.index, this.size).then(function(res) {
                    var _users;
                    _this2.index++;
                    (_users = _this2.users).push.apply(_users, _toConsumableArray(res.users));
                    _this2.totalPages = res.totalPages;
                    _this2.$apply();
                }, function(err) {
                    console.log(err);
                });
            }
        }
    } ]);
    return MyScorePage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(MyScorePage, "pages/my/my-attention"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LWF0dGVudGlvbi5qcyJdLCJuYW1lcyI6WyJNeVNjb3JlUGFnZSIsImNvbmZpZyIsImRhdGEiLCJpbmRleCIsInRvdGFsUGFnZXMiLCJzaXplIiwidXNlcnMiLCJsb2FkaW5nIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwibmF2YmFyIiwiZW1wdHkiLCJtZXRob2RzIiwiZ29QZXJzb24iLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsImlkIiwiZmV0Y2giLCJhcGkiLCJmZXRjaEZvbGxvd3MiLCJ0aGVuIiwicHVzaCIsInJlcyIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJlcnIiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsTSxHQUFTLEUsUUFDVEMsSSxHQUFPO0FBQ0xDLGFBQU8sQ0FERjtBQUVMQyxrQkFBWSxDQUZQO0FBR0xDLFlBQU0sRUFIRDtBQUlMQyxhQUFPLEVBSkY7QUFLTEMsZUFBUztBQUxKLEssUUFPUkMsTyxHQUFVLEUsUUFDWEMsTSxHQUFTLEVBQUMsVUFBUyxFQUFDLFdBQVUsTUFBWCxFQUFrQixTQUFRLE1BQTFCLEVBQVYsRUFBNEMsU0FBUSxFQUFDLFlBQVcsRUFBWixFQUFwRCxFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNWQyw4QkFEVTtBQUVWQztBQUZVLEssUUFJWkMsTyxHQUFVO0FBQ1JDLGNBRFEsb0JBQ0NaLEtBREQsRUFDUTtBQUNkYSx1QkFBS0MsVUFBTCxDQUFnQixFQUFFQyxpQ0FBK0IsS0FBS1osS0FBTCxDQUFXSCxLQUFYLEVBQWtCZ0IsRUFBbkQsRUFBaEI7QUFDRDtBQUhPLEs7Ozs7OzhCQUtBO0FBQ1IsV0FBS0MsS0FBTDtBQUNEOzs7b0NBQ2U7QUFDZCxXQUFLQSxLQUFMO0FBQ0Q7Ozs0QkFDTztBQUFBOztBQUNOLFVBQUksQ0FBQyxLQUFLYixPQUFOLElBQWlCLEtBQUtKLEtBQUwsR0FBYSxLQUFLQyxVQUF2QyxFQUFtRDtBQUNqRGlCLHNCQUFJQyxZQUFKLENBQWlCLEtBQUtuQixLQUF0QixFQUE2QixLQUFLRSxJQUFsQyxFQUF3Q2tCLElBQXhDLENBQTZDLGVBQU87QUFBQTs7QUFDbEQsaUJBQUtwQixLQUFMO0FBQ0EsMkJBQUtHLEtBQUwsRUFBV2tCLElBQVgsa0NBQW1CQyxJQUFJbkIsS0FBdkI7QUFDQSxpQkFBS0YsVUFBTCxHQUFrQnFCLElBQUlyQixVQUF0QjtBQUNBLGlCQUFLc0IsTUFBTDtBQUNELFNBTEQsRUFLRyxlQUFPO0FBQ1JDLGtCQUFRQyxHQUFSLENBQVlDLEdBQVo7QUFDRCxTQVBEO0FBUUQ7QUFDRjs7OztFQXRDc0NiLGVBQUtjLEk7O2tCQUF6QjlCLFciLCJmaWxlIjoibXktYXR0ZW50aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9uYXZiYXInO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcbmltcG9ydCBlbXB0eSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2VtcHR5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXlTY29yZVBhZ2UgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICBjb25maWcgPSB7fTtcbiAgZGF0YSA9IHtcbiAgICBpbmRleDogMCxcbiAgICB0b3RhbFBhZ2VzOiAxLFxuICAgIHNpemU6IDIwLFxuICAgIHVzZXJzOiBbXSxcbiAgICBsb2FkaW5nOiBmYWxzZVxuICB9O1xuICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wibmF2YmFyXCI6e1wicGFkZGluZ1wiOlwidHJ1ZVwiLFwidGl0bGVcIjpcIuaIkeeahOWFs+azqFwifSxcImVtcHR5XCI6e1wieG1sbnM6d3hcIjpcIlwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgbmF2YmFyLFxuICAgIGVtcHR5XG4gIH07XG4gIG1ldGhvZHMgPSB7XG4gICAgZ29QZXJzb24oaW5kZXgpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7IHVybDogYC9wYWdlcy9wZXJzb24vaW5kZXg/aWQ9JHt0aGlzLnVzZXJzW2luZGV4XS5pZH1gIH0pO1xuICAgIH1cbiAgfTtcbiAgb25SZWFkeSgpIHtcbiAgICB0aGlzLmZldGNoKCk7XG4gIH07XG4gIG9uUmVhY2hCb3R0b20oKSB7XG4gICAgdGhpcy5mZXRjaCgpO1xuICB9XG4gIGZldGNoKCkge1xuICAgIGlmICghdGhpcy5sb2FkaW5nICYmIHRoaXMuaW5kZXggPCB0aGlzLnRvdGFsUGFnZXMpIHtcbiAgICAgIGFwaS5mZXRjaEZvbGxvd3ModGhpcy5pbmRleCwgdGhpcy5zaXplKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgICAgdGhpcy51c2Vycy5wdXNoKC4uLnJlcy51c2Vycyk7XG4gICAgICAgIHRoaXMudG90YWxQYWdlcyA9IHJlcy50b3RhbFBhZ2VzO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19