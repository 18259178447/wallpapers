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
                title: "我的粉丝"
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
                _api2.default.fetchFans(this.index, this.size).then(function(res) {
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

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(MyScorePage, "pages/my/my-fans"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LWZhbnMuanMiXSwibmFtZXMiOlsiTXlTY29yZVBhZ2UiLCJjb25maWciLCJkYXRhIiwiaW5kZXgiLCJ0b3RhbFBhZ2VzIiwic2l6ZSIsInVzZXJzIiwibG9hZGluZyIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hdmJhciIsImVtcHR5IiwibWV0aG9kcyIsImdvUGVyc29uIiwid2VweSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJpZCIsImZldGNoIiwiYXBpIiwiZmV0Y2hGYW5zIiwidGhlbiIsInB1c2giLCJyZXMiLCIkYXBwbHkiLCJjb25zb2xlIiwibG9nIiwiZXJyIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCQSxXOzs7Ozs7Ozs7Ozs7OztnTUFDbkJDLE0sR0FBUyxFLFFBR1RDLEksR0FBTztBQUNMQyxhQUFPLENBREY7QUFFTEMsa0JBQVksQ0FGUDtBQUdMQyxZQUFNLEVBSEQ7QUFJTEMsYUFBTyxFQUpGO0FBS0xDLGVBQVM7QUFMSixLLFFBUVJDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxXQUFVLE1BQVgsRUFBa0IsU0FBUSxNQUExQixFQUFWLEVBQTRDLFNBQVEsRUFBQyxZQUFXLEVBQVosRUFBcEQsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDVkMsOEJBRFU7QUFFVkM7QUFGVSxLLFFBS1pDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNDWixLQURELEVBQ1E7QUFDZGEsdUJBQUtDLFVBQUwsQ0FBZ0IsRUFBRUMsaUNBQStCLEtBQUtaLEtBQUwsQ0FBV0gsS0FBWCxFQUFrQmdCLEVBQW5ELEVBQWhCO0FBQ0Q7QUFITyxLOzs7Ozs4QkFNQTtBQUNSLFdBQUtDLEtBQUw7QUFDRDs7O29DQUVlO0FBQ2QsV0FBS0EsS0FBTDtBQUNEOzs7NEJBRU87QUFBQTs7QUFDTixVQUFJLENBQUMsS0FBS2IsT0FBTixJQUFpQixLQUFLSixLQUFMLEdBQWEsS0FBS0MsVUFBdkMsRUFBbUQ7QUFDakRpQixzQkFBSUMsU0FBSixDQUFjLEtBQUtuQixLQUFuQixFQUEwQixLQUFLRSxJQUEvQixFQUFxQ2tCLElBQXJDLENBQTBDLGVBQU87QUFBQTs7QUFDL0MsaUJBQUtwQixLQUFMO0FBQ0EsMkJBQUtHLEtBQUwsRUFBV2tCLElBQVgsa0NBQW1CQyxJQUFJbkIsS0FBdkI7QUFDQSxpQkFBS0YsVUFBTCxHQUFrQnFCLElBQUlyQixVQUF0QjtBQUNBLGlCQUFLc0IsTUFBTDtBQUNELFNBTEQsRUFLRyxlQUFPO0FBQ1JDLGtCQUFRQyxHQUFSLENBQVlDLEdBQVo7QUFDRCxTQVBEO0FBUUQ7QUFDRjs7OztFQTdDc0NiLGVBQUtjLEk7O2tCQUF6QjlCLFciLCJmaWxlIjoibXktZmFucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG5pbXBvcnQgbmF2YmFyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbmF2YmFyJztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XG5pbXBvcnQgZW1wdHkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9lbXB0eSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeVNjb3JlUGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgfTtcblxuICBkYXRhID0ge1xuICAgIGluZGV4OiAwLFxuICAgIHRvdGFsUGFnZXM6IDEsXG4gICAgc2l6ZTogMjAsXG4gICAgdXNlcnM6IFtdLFxuICAgIGxvYWRpbmc6IGZhbHNlXG4gIH07XG5cbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcIm5hdmJhclwiOntcInBhZGRpbmdcIjpcInRydWVcIixcInRpdGxlXCI6XCLmiJHnmoTnsonkuJ1cIn0sXCJlbXB0eVwiOntcInhtbG5zOnd4XCI6XCJcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xuICAgIG5hdmJhcixcbiAgICBlbXB0eVxuICB9O1xuXG4gIG1ldGhvZHMgPSB7XG4gICAgZ29QZXJzb24oaW5kZXgpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVUbyh7IHVybDogYC9wYWdlcy9wZXJzb24vaW5kZXg/aWQ9JHt0aGlzLnVzZXJzW2luZGV4XS5pZH1gIH0pO1xuICAgIH1cbiAgfTtcblxuICBvblJlYWR5KCkge1xuICAgIHRoaXMuZmV0Y2goKTtcbiAgfTtcblxuICBvblJlYWNoQm90dG9tKCkge1xuICAgIHRoaXMuZmV0Y2goKTtcbiAgfVxuXG4gIGZldGNoKCkge1xuICAgIGlmICghdGhpcy5sb2FkaW5nICYmIHRoaXMuaW5kZXggPCB0aGlzLnRvdGFsUGFnZXMpIHtcbiAgICAgIGFwaS5mZXRjaEZhbnModGhpcy5pbmRleCwgdGhpcy5zaXplKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgICAgdGhpcy51c2Vycy5wdXNoKC4uLnJlcy51c2Vycyk7XG4gICAgICAgIHRoaXMudG90YWxQYWdlcyA9IHJlcy50b3RhbFBhZ2VzO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19