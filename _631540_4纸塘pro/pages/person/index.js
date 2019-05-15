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

var _back = require("./../../mixins/back.js");

var _back2 = _interopRequireDefault(_back);

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

var PersonPage = function(_wepy$page) {
    _inherits(PersonPage, _wepy$page);
    function PersonPage() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, PersonPage);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PersonPage.__proto__ || Object.getPrototypeOf(PersonPage)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {}, _this.data = {
            id: null,
            user: null,
            isMy: false,
            activities: [],
            currentUser: null
        }, _this.components = {
            navbar: _navbar2.default
        }, _this.mixins = [ _back2.default ], _this.methods = {
            payAttentionTo: function payAttentionTo() {
                var _this2 = this;
                if (this.currentUser) {
                    if (this.user.attention) {
                        this.user.fansNum--;
                    } else {
                        this.user.fansNum++;
                    }
                    _api2.default.attention(this.id, !this.user.attention).then(function() {
                        _this2.user.attention = !_this2.user.attention;
                        _this2.$apply();
                    }, function(err) {
                        console.log(err);
                    });
                } else {
                    this.$navigate("/pages/login/login");
                }
            },
            goDetail: function goDetail(evt) {
                var id = evt.currentTarget.dataset.id;
                this.$navigate("/pages/detail/detail", {
                    id: id
                });
            }
        }, _this.computed = {
            marginHeight: function marginHeight() {
                return _this.$parent.globalData.navHeight;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(PersonPage, [ {
        key: "onShareAppMessage",
        value: function onShareAppMessage() {
            return {
                title: this.user.name + "的个人主页",
                path: "/pages/person/index?id=" + this.id
            };
        }
    }, {
        key: "onLoad",
        value: function onLoad(options) {
            this.id = options.id;
        }
    }, {
        key: "fetchUser",
        value: function fetchUser() {
            var _this3 = this;
            _api2.default.fetchPerson(this.id).then(function(res) {
                _this3.user = res.user;
                _this3.isMy = _this3.$parent.globalData.userInfo && parseInt(_this3.id) === _this3.$parent.globalData.userInfo.id;
                _this3.activities = res.activities;
                _this3.$apply();
            });
        }
    }, {
        key: "onReady",
        value: function onReady() {
            this.fetchUser();
        }
    }, {
        key: "onShow",
        value: function onShow() {
            var _this4 = this;
            this.$parent.getUserInfo(function(user) {
                _this4.currentUser = user;
                _this4.isMy = _this4.currentUser && parseInt(_this4.id) === _this4.currentUser.id;
                _this4.$apply();
            });
        }
    } ]);
    return PersonPage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(PersonPage, "pages/person/index"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlBlcnNvblBhZ2UiLCJjb25maWciLCJkYXRhIiwiaWQiLCJ1c2VyIiwiaXNNeSIsImFjdGl2aXRpZXMiLCJjdXJyZW50VXNlciIsImNvbXBvbmVudHMiLCJuYXZiYXIiLCJtaXhpbnMiLCJCYWNrTWl4aW4iLCJtZXRob2RzIiwicGF5QXR0ZW50aW9uVG8iLCJhdHRlbnRpb24iLCJmYW5zTnVtIiwiYXBpIiwidGhlbiIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJlcnIiLCIkbmF2aWdhdGUiLCJnb0RldGFpbCIsImV2dCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiY29tcHV0ZWQiLCJtYXJnaW5IZWlnaHQiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsIm5hdkhlaWdodCIsInRpdGxlIiwibmFtZSIsInBhdGgiLCJvcHRpb25zIiwiZmV0Y2hQZXJzb24iLCJyZXMiLCJ1c2VySW5mbyIsInBhcnNlSW50IiwiZmV0Y2hVc2VyIiwiZ2V0VXNlckluZm8iLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxNLEdBQVMsRSxRQUNUQyxJLEdBQU87QUFDTEMsVUFBSSxJQURDO0FBRUxDLFlBQU0sSUFGRDtBQUdMQyxZQUFNLEtBSEQ7QUFJTEMsa0JBQVksRUFKUDtBQUtMQyxtQkFBYTtBQUxSLEssUUFPUEMsVSxHQUFhO0FBQ1hDO0FBRFcsSyxRQUliQyxNLEdBQVMsQ0FBQ0MsY0FBRCxDLFFBQ1RDLE8sR0FBVTtBQUNSQyxvQkFEUSw0QkFDUztBQUFBOztBQUNmLFlBQUksS0FBS04sV0FBVCxFQUFzQjtBQUNwQixjQUFJLEtBQUtILElBQUwsQ0FBVVUsU0FBZCxFQUF5QjtBQUN2QixpQkFBS1YsSUFBTCxDQUFVVyxPQUFWO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsaUJBQUtYLElBQUwsQ0FBVVcsT0FBVjtBQUNEO0FBQ0RDLHdCQUFJRixTQUFKLENBQWMsS0FBS1gsRUFBbkIsRUFBdUIsQ0FBQyxLQUFLQyxJQUFMLENBQVVVLFNBQWxDLEVBQTZDRyxJQUE3QyxDQUFrRCxZQUFNO0FBQ3RELG1CQUFLYixJQUFMLENBQVVVLFNBQVYsR0FBc0IsQ0FBQyxPQUFLVixJQUFMLENBQVVVLFNBQWpDO0FBQ0EsbUJBQUtJLE1BQUw7QUFDRCxXQUhELEVBR0csZUFBTztBQUNSQyxvQkFBUUMsR0FBUixDQUFZQyxHQUFaO0FBQ0QsV0FMRDtBQU1ELFNBWkQsTUFZTztBQUNMLGVBQUtDLFNBQUwsQ0FBZSxvQkFBZjtBQUNEO0FBQ0YsT0FqQk87QUFrQlJDLGNBbEJRLG9CQWtCQ0MsR0FsQkQsRUFrQk07QUFDWixZQUFJckIsS0FBS3FCLElBQUlDLGFBQUosQ0FBa0JDLE9BQWxCLENBQTBCdkIsRUFBbkM7QUFDQSxhQUFLbUIsU0FBTCx5QkFBdUMsRUFBRW5CLE1BQUYsRUFBdkM7QUFDRDtBQXJCTyxLLFFBNkJWd0IsUSxHQUFXO0FBQ1RDLG9CQUFjLHdCQUFNO0FBQ2xCLGVBQU8sTUFBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxTQUEvQjtBQUNEO0FBSFEsSzs7Ozs7d0NBTlM7QUFDbEIsYUFBTztBQUNMQyxlQUFVLEtBQUs1QixJQUFMLENBQVU2QixJQUFwQixtQ0FESztBQUVMQywwQ0FBZ0MsS0FBSy9CO0FBRmhDLE9BQVA7QUFJRDs7OzJCQU1NZ0MsTyxFQUFTO0FBQ2QsV0FBS2hDLEVBQUwsR0FBVWdDLFFBQVFoQyxFQUFsQjtBQUNEOzs7Z0NBQ1c7QUFBQTs7QUFDVmEsb0JBQUlvQixXQUFKLENBQWdCLEtBQUtqQyxFQUFyQixFQUF5QmMsSUFBekIsQ0FBOEIsZUFBTztBQUNuQyxlQUFLYixJQUFMLEdBQVlpQyxJQUFJakMsSUFBaEI7QUFDQSxlQUFLQyxJQUFMLEdBQVksT0FBS3dCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlEsUUFBeEIsSUFBb0NDLFNBQVMsT0FBS3BDLEVBQWQsTUFBc0IsT0FBSzBCLE9BQUwsQ0FBYUMsVUFBYixDQUF3QlEsUUFBeEIsQ0FBaUNuQyxFQUF2RztBQUNBLGVBQUtHLFVBQUwsR0FBa0IrQixJQUFJL0IsVUFBdEI7QUFDQSxlQUFLWSxNQUFMO0FBQ0QsT0FMRDtBQU1EOzs7OEJBRVM7QUFDUixXQUFLc0IsU0FBTDtBQUNEOzs7NkJBRVE7QUFBQTs7QUFDUCxXQUFLWCxPQUFMLENBQWFZLFdBQWIsQ0FBeUIsZ0JBQVE7QUFDL0IsZUFBS2xDLFdBQUwsR0FBbUJILElBQW5CO0FBQ0EsZUFBS0MsSUFBTCxHQUFZLE9BQUtFLFdBQUwsSUFBb0JnQyxTQUFTLE9BQUtwQyxFQUFkLE1BQXNCLE9BQUtJLFdBQUwsQ0FBaUJKLEVBQXZFO0FBQ0EsZUFBS2UsTUFBTDtBQUNELE9BSkQ7QUFLRDs7OztFQXRFcUN3QixlQUFLQyxJOztrQkFBeEIzQyxVIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9uYXZiYXInO1xuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi9hcGkvYXBpJztcbmltcG9ydCBCYWNrTWl4aW4gZnJvbSAnLi4vLi4vbWl4aW5zL2JhY2snO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGVyc29uUGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHt9O1xuICBkYXRhID0ge1xuICAgIGlkOiBudWxsLFxuICAgIHVzZXI6IG51bGwsXG4gICAgaXNNeTogZmFsc2UsXG4gICAgYWN0aXZpdGllczogW10sXG4gICAgY3VycmVudFVzZXI6IG51bGxcbiAgfTtcbiAgY29tcG9uZW50cyA9IHtcbiAgICBuYXZiYXJcbiAgfTtcblxuICBtaXhpbnMgPSBbQmFja01peGluXTtcbiAgbWV0aG9kcyA9IHtcbiAgICBwYXlBdHRlbnRpb25UbygpIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRVc2VyKSB7XG4gICAgICAgIGlmICh0aGlzLnVzZXIuYXR0ZW50aW9uKSB7XG4gICAgICAgICAgdGhpcy51c2VyLmZhbnNOdW0tLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVzZXIuZmFuc051bSsrO1xuICAgICAgICB9XG4gICAgICAgIGFwaS5hdHRlbnRpb24odGhpcy5pZCwgIXRoaXMudXNlci5hdHRlbnRpb24pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMudXNlci5hdHRlbnRpb24gPSAhdGhpcy51c2VyLmF0dGVudGlvbjtcbiAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9sb2dpbi9sb2dpbicpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ29EZXRhaWwoZXZ0KSB7XG4gICAgICBsZXQgaWQgPSBldnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkO1xuICAgICAgdGhpcy4kbmF2aWdhdGUoYC9wYWdlcy9kZXRhaWwvZGV0YWlsYCwgeyBpZCB9KTtcbiAgICB9XG4gIH07XG4gIG9uU2hhcmVBcHBNZXNzYWdlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogYCR7dGhpcy51c2VyLm5hbWV955qE5Liq5Lq65Li76aG1YCxcbiAgICAgIHBhdGg6IGAvcGFnZXMvcGVyc29uL2luZGV4P2lkPSR7dGhpcy5pZH1gXG4gICAgfTtcbiAgfVxuICBjb21wdXRlZCA9IHtcbiAgICBtYXJnaW5IZWlnaHQ6ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5uYXZIZWlnaHQ7XG4gICAgfVxuICB9O1xuICBvbkxvYWQob3B0aW9ucykge1xuICAgIHRoaXMuaWQgPSBvcHRpb25zLmlkO1xuICB9O1xuICBmZXRjaFVzZXIoKSB7XG4gICAgYXBpLmZldGNoUGVyc29uKHRoaXMuaWQpLnRoZW4ocmVzID0+IHtcbiAgICAgIHRoaXMudXNlciA9IHJlcy51c2VyO1xuICAgICAgdGhpcy5pc015ID0gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEudXNlckluZm8gJiYgcGFyc2VJbnQodGhpcy5pZCkgPT09IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLnVzZXJJbmZvLmlkO1xuICAgICAgdGhpcy5hY3Rpdml0aWVzID0gcmVzLmFjdGl2aXRpZXM7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgIH0pO1xuICB9XG5cbiAgb25SZWFkeSgpIHtcbiAgICB0aGlzLmZldGNoVXNlcigpO1xuICB9XG5cbiAgb25TaG93KCkge1xuICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyh1c2VyID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFVzZXIgPSB1c2VyO1xuICAgICAgdGhpcy5pc015ID0gdGhpcy5jdXJyZW50VXNlciAmJiBwYXJzZUludCh0aGlzLmlkKSA9PT0gdGhpcy5jdXJyZW50VXNlci5pZDtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfSk7XG4gIH07XG59XG4iXX0=