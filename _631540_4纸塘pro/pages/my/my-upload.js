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

var _pictureList = require("./../picture/picture-list.js");

var _pictureList2 = _interopRequireDefault(_pictureList);

var _pager = require("./../picture/pager.js");

var _pager2 = _interopRequireDefault(_pager);

var _api = require("./../../api/api.js");

var _api2 = _interopRequireDefault(_api);

var _empty = require("./../../components/empty.js");

var _empty2 = _interopRequireDefault(_empty);

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

var AllPicturePage = function(_wepy$page) {
    _inherits(AllPicturePage, _wepy$page);
    function AllPicturePage() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck(this, AllPicturePage);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AllPicturePage.__proto__ || Object.getPrototypeOf(AllPicturePage)).call.apply(_ref, [ this ].concat(args))), 
        _this), _this.config = {}, _this.data = {
            selectedTab: 0,
            passScrollTop: 0,
            applyingScrollTop: 0,
            refuseScrollTop: 0,
            passTotalPages: 1,
            passCurrentIndex: 1,
            applyingTotalPages: 1,
            applyingCurrentIndex: 1,
            refuseTotalPages: 1,
            refuseCurrentIndex: 1,
            size: 20,
            goDetail: false,
            passImgs: [],
            applyingImgs: [],
            refuseImgs: [],
            page1Left: 0,
            page2Left: "100%",
            page3Left: "200%"
        }, _this.$repeat = {}, _this.$props = {
            empty: {
                "xmlns:wx": ""
            },
            "pass-pager": {
                "xmlns:wx": "",
                "xmlns:v-bind": "",
                "v-bind:total.sync": "passTotalPages",
                "v-bind:currentIndex.sync": "passCurrentIndex",
                "xmlns:v-on": ""
            },
            "applying-pager": {
                "v-bind:total.sync": "applyingTotalPages",
                bindcurrentIndex: "applyingCurrentIndex"
            },
            "refuse-pager": {
                "v-bind:total.sync": "refuseTotalPages",
                bindcurrentIndex: "refuseCurrentIndex"
            },
            "pass-picture-list": {
                "xmlns:v-bind": "",
                "v-bind:pics.sync": "passImgs"
            },
            "applying-picture-list": {
                "v-bind:pics.sync": "applyingImgs",
                "v-bind:detail.once": "goDetail"
            },
            "refuse-picture-list": {
                "v-bind:pics.sync": "refuseImgs",
                "v-bind:detail.once": "goDetail",
                "xmlns:v-on": ""
            }
        }, _this.$events = {
            "pass-pager": {
                "v-on:change": "passPageChange"
            },
            "applying-pager": {
                "v-on:change": "applyingPageChange"
            },
            "refuse-pager": {
                "v-on:change": "refusePageChange"
            },
            "refuse-picture-list": {
                "v-on:click": "reasonDetail"
            }
        }, _this.components = {
            navbar: _navbar2.default,
            empty: _empty2.default,
            "pass-pager": _pager2.default,
            "applying-pager": _pager2.default,
            "refuse-pager": _pager2.default,
            "pass-picture-list": _pictureList2.default,
            "applying-picture-list": _pictureList2.default,
            "refuse-picture-list": _pictureList2.default
        }, _this.computed = {
            marginHeight: function marginHeight() {
                return _this.$parent.globalData.navHeight + 46;
            }
        }, _this.methods = {
            back: function back() {
                _wepy2.default.navigateBack({
                    delta: 1
                });
            },
            scroll: function scroll(event) {
                if (parseInt(this.selectedTab) === 0) {
                    this.passScrollTop = 1;
                } else if (parseInt(this.selectedTab) === 1) {
                    this.applyingScrollTop = 1;
                } else {
                    this.refuseScrollTop = 1;
                }
            },
            choose: function choose(tab) {
                if (tab !== this.selectedTab) {
                    switch (tab.toString()) {
                      case "0":
                        this.page1Left = 0;
                        this.page2Left = "100%";
                        this.page3Left = "200%";
                        break;

                      case "1":
                        this.page1Left = "-100%";
                        this.page2Left = "0";
                        this.page3Left = "100%";
                        break;

                      case "2":
                        this.page1Left = "-200%";
                        this.page2Left = "-100%";
                        this.page3Left = "0";
                        break;
                    }
                    this.selectedTab = tab;
                }
            },
            passPageChange: function passPageChange(index, event) {
                this.passCurrentIndex = index;
                this.fetchPassPage();
            },
            applyingPageChange: function applyingPageChange(index, event) {
                this.applyingCurrentIndex = index;
                this.fetchApplyingPage();
            },
            refusePageChange: function refusePageChange(index, event) {
                this.refuseCurrentIndex = index;
                this.fetchApplyingPage();
            },
            reasonDetail: function reasonDetail(id) {
                this.$preload("pic", this.refuseImgs[id]);
                this.$navigate("/pages/my/upload-detail");
            }
            // delete(id) {
            // wepy.showActionSheet({
            //   itemList: ['删除'], // 按钮的文字数组，数组长度最大为6个,
            //   itemColor: '#000000', // 按钮的文字颜色,
            //   success: res => {
            //     console.log(res);
            //     if (res.tapIndex === 0) {
            //       // todo:删除图片
            //     }
            //   }
            // });
            // }
                }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(AllPicturePage, [ {
        key: "fetchPassPage",
        value: function fetchPassPage() {
            var _this2 = this;
            if (this.passTotalPages >= this.passCurrentIndex) {
                this.passScrollTop = 0;
                _api2.default.fetchUploads("agree", this.passCurrentIndex - 1, this.size).then(function(res) {
                    _this2.passImgs = res.imgs;
                    _this2.passTotalPages = res.totalPages;
                    _this2.$apply();
                }, function(err) {
                    console.log(err);
                });
            }
        }
    }, {
        key: "fetchApplyingPage",
        value: function fetchApplyingPage() {
            var _this3 = this;
            if (this.applyingTotalPages >= this.applyingCurrentIndex) {
                this.applyingScrollTop = 0;
                _api2.default.fetchUploads("apply", this.applyingCurrentIndex - 1, this.size).then(function(res) {
                    _this3.applyingImgs = res.imgs;
                    _this3.applyingTotalPages = res.totalPages;
                    _this3.$apply();
                }, function(err) {
                    console.log(err);
                });
            }
        }
    }, {
        key: "fetchRefusePage",
        value: function fetchRefusePage() {
            var _this4 = this;
            if (this.refuseTotalPages >= this.refuseCurrentIndex) {
                this.refuseScrollTop = 0;
                _api2.default.fetchUploads("refuse", this.refuseCurrentIndex - 1, this.size).then(function(res) {
                    _this4.refuseImgs = res.imgs;
                    _this4.refuseTotalPages = res.totalPages;
                    _wepy2.default.pageScrollTo({
                        scrollTop: 0,
                        // 滚动到页面的目标位置（单位px）,
                        duration: 0
                    });
                    _this4.$apply();
                }, function(err) {
                    console.log(err);
                });
            }
        }
    }, {
        key: "onReady",
        value: function onReady() {
            this.fetchPassPage();
            this.fetchApplyingPage();
            this.fetchRefusePage();
        }
    } ]);
    return AllPicturePage;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(AllPicturePage, "pages/my/my-upload"));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LXVwbG9hZC5qcyJdLCJuYW1lcyI6WyJBbGxQaWN0dXJlUGFnZSIsImNvbmZpZyIsImRhdGEiLCJzZWxlY3RlZFRhYiIsInBhc3NTY3JvbGxUb3AiLCJhcHBseWluZ1Njcm9sbFRvcCIsInJlZnVzZVNjcm9sbFRvcCIsInBhc3NUb3RhbFBhZ2VzIiwicGFzc0N1cnJlbnRJbmRleCIsImFwcGx5aW5nVG90YWxQYWdlcyIsImFwcGx5aW5nQ3VycmVudEluZGV4IiwicmVmdXNlVG90YWxQYWdlcyIsInJlZnVzZUN1cnJlbnRJbmRleCIsInNpemUiLCJnb0RldGFpbCIsInBhc3NJbWdzIiwiYXBwbHlpbmdJbWdzIiwicmVmdXNlSW1ncyIsInBhZ2UxTGVmdCIsInBhZ2UyTGVmdCIsInBhZ2UzTGVmdCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm5hdmJhciIsImVtcHR5IiwicGFnZXIiLCJwaWN0dXJlTGlzdCIsImNvbXB1dGVkIiwibWFyZ2luSGVpZ2h0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJuYXZIZWlnaHQiLCJtZXRob2RzIiwiYmFjayIsIndlcHkiLCJuYXZpZ2F0ZUJhY2siLCJkZWx0YSIsInNjcm9sbCIsImV2ZW50IiwicGFyc2VJbnQiLCJjaG9vc2UiLCJ0YWIiLCJ0b1N0cmluZyIsInBhc3NQYWdlQ2hhbmdlIiwiaW5kZXgiLCJmZXRjaFBhc3NQYWdlIiwiYXBwbHlpbmdQYWdlQ2hhbmdlIiwiZmV0Y2hBcHBseWluZ1BhZ2UiLCJyZWZ1c2VQYWdlQ2hhbmdlIiwicmVhc29uRGV0YWlsIiwiaWQiLCIkcHJlbG9hZCIsIiRuYXZpZ2F0ZSIsImFwaSIsImZldGNoVXBsb2FkcyIsInRoZW4iLCJyZXMiLCJpbWdzIiwidG90YWxQYWdlcyIsIiRhcHBseSIsImNvbnNvbGUiLCJsb2ciLCJlcnIiLCJwYWdlU2Nyb2xsVG8iLCJzY3JvbGxUb3AiLCJkdXJhdGlvbiIsImZldGNoUmVmdXNlUGFnZSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxjOzs7Ozs7Ozs7Ozs7OztzTUFDbkJDLE0sR0FBUyxFLFFBQ1RDLEksR0FBTztBQUNMQyxtQkFBYSxDQURSO0FBRUxDLHFCQUFlLENBRlY7QUFHTEMseUJBQW1CLENBSGQ7QUFJTEMsdUJBQWlCLENBSlo7QUFLTEMsc0JBQWdCLENBTFg7QUFNTEMsd0JBQWtCLENBTmI7QUFPTEMsMEJBQW9CLENBUGY7QUFRTEMsNEJBQXNCLENBUmpCO0FBU0xDLHdCQUFrQixDQVRiO0FBVUxDLDBCQUFvQixDQVZmO0FBV0xDLFlBQU0sRUFYRDtBQVlMQyxnQkFBVSxLQVpMO0FBYUxDLGdCQUFVLEVBYkw7QUFjTEMsb0JBQWMsRUFkVDtBQWVMQyxrQkFBWSxFQWZQO0FBZ0JMQyxpQkFBVyxDQWhCTjtBQWlCTEMsaUJBQVcsTUFqQk47QUFrQkxDLGlCQUFXO0FBbEJOLEssUUFvQlJDLE8sR0FBVSxFLFFBQ1hDLE0sR0FBUyxFQUFDLFNBQVEsRUFBQyxZQUFXLEVBQVosRUFBVCxFQUF5QixjQUFhLEVBQUMsWUFBVyxFQUFaLEVBQWUsZ0JBQWUsRUFBOUIsRUFBaUMscUJBQW9CLGdCQUFyRCxFQUFzRSw0QkFBMkIsa0JBQWpHLEVBQW9ILGNBQWEsRUFBakksRUFBdEMsRUFBMkssa0JBQWlCLEVBQUMscUJBQW9CLG9CQUFyQixFQUEwQyxvQkFBbUIsc0JBQTdELEVBQTVMLEVBQWlSLGdCQUFlLEVBQUMscUJBQW9CLGtCQUFyQixFQUF3QyxvQkFBbUIsb0JBQTNELEVBQWhTLEVBQWlYLHFCQUFvQixFQUFDLGdCQUFlLEVBQWhCLEVBQW1CLG9CQUFtQixVQUF0QyxFQUFyWSxFQUF1Yix5QkFBd0IsRUFBQyxvQkFBbUIsY0FBcEIsRUFBbUMsc0JBQXFCLFVBQXhELEVBQS9jLEVBQW1oQix1QkFBc0IsRUFBQyxvQkFBbUIsWUFBcEIsRUFBaUMsc0JBQXFCLFVBQXRELEVBQWlFLGNBQWEsRUFBOUUsRUFBemlCLEUsUUFDVEMsTyxHQUFVLEVBQUMsY0FBYSxFQUFDLGVBQWMsZ0JBQWYsRUFBZCxFQUErQyxrQkFBaUIsRUFBQyxlQUFjLG9CQUFmLEVBQWhFLEVBQXFHLGdCQUFlLEVBQUMsZUFBYyxrQkFBZixFQUFwSCxFQUF1Six1QkFBc0IsRUFBQyxjQUFhLGNBQWQsRUFBN0ssRSxRQUNUQyxVLEdBQWE7QUFDVkMsOEJBRFU7QUFFVkMsNEJBRlU7QUFHVixvQkFBY0MsZUFISjtBQUlWLHdCQUFrQkEsZUFKUjtBQUtWLHNCQUFnQkEsZUFMTjtBQU1WLDJCQUFxQkMscUJBTlg7QUFPViwrQkFBeUJBLHFCQVBmO0FBUVYsNkJBQXVCQTtBQVJiLEssUUFVWkMsUSxHQUFXO0FBQ1RDLG9CQUFjLHdCQUFNO0FBQ2xCLGVBQU8sTUFBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCQyxTQUF4QixHQUFvQyxFQUEzQztBQUNEO0FBSFEsSyxRQUtYQyxPLEdBQVU7QUFDUkMsVUFEUSxrQkFDRDtBQUNMQyx1QkFBS0MsWUFBTCxDQUFrQjtBQUNoQkMsaUJBQU87QUFEUyxTQUFsQjtBQUdELE9BTE87QUFNUkMsWUFOUSxrQkFNREMsS0FOQyxFQU1NO0FBQ1osWUFBSUMsU0FBUyxLQUFLdEMsV0FBZCxNQUErQixDQUFuQyxFQUFzQztBQUNwQyxlQUFLQyxhQUFMLEdBQXFCLENBQXJCO0FBQ0QsU0FGRCxNQUVPLElBQUlxQyxTQUFTLEtBQUt0QyxXQUFkLE1BQStCLENBQW5DLEVBQXNDO0FBQzNDLGVBQUtFLGlCQUFMLEdBQXlCLENBQXpCO0FBQ0QsU0FGTSxNQUVBO0FBQ0wsZUFBS0MsZUFBTCxHQUF1QixDQUF2QjtBQUNEO0FBQ0YsT0FkTztBQWVSb0MsWUFmUSxrQkFlREMsR0FmQyxFQWVJO0FBQ1YsWUFBSUEsUUFBUSxLQUFLeEMsV0FBakIsRUFBOEI7QUFDNUIsa0JBQVF3QyxJQUFJQyxRQUFKLEVBQVI7QUFDRSxpQkFBSyxHQUFMO0FBQ0UsbUJBQUsxQixTQUFMLEdBQWlCLENBQWpCO0FBQ0EsbUJBQUtDLFNBQUwsR0FBaUIsTUFBakI7QUFDQSxtQkFBS0MsU0FBTCxHQUFpQixNQUFqQjtBQUNBO0FBQ0YsaUJBQUssR0FBTDtBQUNFLG1CQUFLRixTQUFMLEdBQWlCLE9BQWpCO0FBQ0EsbUJBQUtDLFNBQUwsR0FBaUIsR0FBakI7QUFDQSxtQkFBS0MsU0FBTCxHQUFpQixNQUFqQjtBQUNBO0FBQ0YsaUJBQUssR0FBTDtBQUNFLG1CQUFLRixTQUFMLEdBQWlCLE9BQWpCO0FBQ0EsbUJBQUtDLFNBQUwsR0FBaUIsT0FBakI7QUFDQSxtQkFBS0MsU0FBTCxHQUFpQixHQUFqQjtBQUNBO0FBZko7QUFpQkEsZUFBS2pCLFdBQUwsR0FBbUJ3QyxHQUFuQjtBQUNEO0FBQ0YsT0FwQ087QUFxQ1JFLG9CQXJDUSwwQkFxQ09DLEtBckNQLEVBcUNjTixLQXJDZCxFQXFDcUI7QUFDM0IsYUFBS2hDLGdCQUFMLEdBQXdCc0MsS0FBeEI7QUFDQSxhQUFLQyxhQUFMO0FBQ0QsT0F4Q087QUF5Q1JDLHdCQXpDUSw4QkF5Q1dGLEtBekNYLEVBeUNrQk4sS0F6Q2xCLEVBeUN5QjtBQUMvQixhQUFLOUIsb0JBQUwsR0FBNEJvQyxLQUE1QjtBQUNBLGFBQUtHLGlCQUFMO0FBQ0QsT0E1Q087QUE2Q1JDLHNCQTdDUSw0QkE2Q1NKLEtBN0NULEVBNkNnQk4sS0E3Q2hCLEVBNkN1QjtBQUM3QixhQUFLNUIsa0JBQUwsR0FBMEJrQyxLQUExQjtBQUNBLGFBQUtHLGlCQUFMO0FBQ0QsT0FoRE87QUFpRFJFLGtCQWpEUSx3QkFpREtDLEVBakRMLEVBaURTO0FBQ2YsYUFBS0MsUUFBTCxDQUFjLEtBQWQsRUFBcUIsS0FBS3BDLFVBQUwsQ0FBZ0JtQyxFQUFoQixDQUFyQjtBQUNBLGFBQUtFLFNBQUwsQ0FBZSx5QkFBZjtBQUNEO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQWhFUSxLOzs7OztvQ0FrRU07QUFBQTs7QUFDZCxVQUFJLEtBQUsvQyxjQUFMLElBQXVCLEtBQUtDLGdCQUFoQyxFQUFrRDtBQUNoRCxhQUFLSixhQUFMLEdBQXFCLENBQXJCO0FBQ0FtRCxzQkFBSUMsWUFBSixDQUFpQixPQUFqQixFQUEwQixLQUFLaEQsZ0JBQUwsR0FBd0IsQ0FBbEQsRUFBcUQsS0FBS0ssSUFBMUQsRUFBZ0U0QyxJQUFoRSxDQUFxRSxlQUFPO0FBQzFFLGlCQUFLMUMsUUFBTCxHQUFnQjJDLElBQUlDLElBQXBCO0FBQ0EsaUJBQUtwRCxjQUFMLEdBQXNCbUQsSUFBSUUsVUFBMUI7QUFDQSxpQkFBS0MsTUFBTDtBQUNELFNBSkQsRUFJRyxlQUFPO0FBQ1JDLGtCQUFRQyxHQUFSLENBQVlDLEdBQVo7QUFDRCxTQU5EO0FBT0Q7QUFDRjs7O3dDQUNtQjtBQUFBOztBQUNsQixVQUFJLEtBQUt2RCxrQkFBTCxJQUEyQixLQUFLQyxvQkFBcEMsRUFBMEQ7QUFDeEQsYUFBS0wsaUJBQUwsR0FBeUIsQ0FBekI7QUFDQWtELHNCQUFJQyxZQUFKLENBQWlCLE9BQWpCLEVBQTBCLEtBQUs5QyxvQkFBTCxHQUE0QixDQUF0RCxFQUF5RCxLQUFLRyxJQUE5RCxFQUFvRTRDLElBQXBFLENBQXlFLGVBQU87QUFDOUUsaUJBQUt6QyxZQUFMLEdBQW9CMEMsSUFBSUMsSUFBeEI7QUFDQSxpQkFBS2xELGtCQUFMLEdBQTBCaUQsSUFBSUUsVUFBOUI7QUFDQSxpQkFBS0MsTUFBTDtBQUNELFNBSkQsRUFJRyxlQUFPO0FBQ1JDLGtCQUFRQyxHQUFSLENBQVlDLEdBQVo7QUFDRCxTQU5EO0FBT0Q7QUFDRjs7O3NDQUNpQjtBQUFBOztBQUNoQixVQUFJLEtBQUtyRCxnQkFBTCxJQUF5QixLQUFLQyxrQkFBbEMsRUFBc0Q7QUFDcEQsYUFBS04sZUFBTCxHQUF1QixDQUF2QjtBQUNBaUQsc0JBQUlDLFlBQUosQ0FBaUIsUUFBakIsRUFBMkIsS0FBSzVDLGtCQUFMLEdBQTBCLENBQXJELEVBQXdELEtBQUtDLElBQTdELEVBQW1FNEMsSUFBbkUsQ0FBd0UsZUFBTztBQUM3RSxpQkFBS3hDLFVBQUwsR0FBa0J5QyxJQUFJQyxJQUF0QjtBQUNBLGlCQUFLaEQsZ0JBQUwsR0FBd0IrQyxJQUFJRSxVQUE1QjtBQUNBeEIseUJBQUs2QixZQUFMLENBQWtCO0FBQ2hCQyx1QkFBVyxDQURLLEVBQ0Y7QUFDZEMsc0JBQVUsQ0FGTSxDQUVKO0FBRkksV0FBbEI7QUFJQSxpQkFBS04sTUFBTDtBQUNELFNBUkQsRUFRRyxlQUFPO0FBQ1JDLGtCQUFRQyxHQUFSLENBQVlDLEdBQVo7QUFDRCxTQVZEO0FBV0Q7QUFDRjs7OzhCQUNTO0FBQ1IsV0FBS2pCLGFBQUw7QUFDQSxXQUFLRSxpQkFBTDtBQUNBLFdBQUttQixlQUFMO0FBQ0Q7Ozs7RUF0SnlDaEMsZUFBS2lDLEk7O2tCQUE1QnJFLGMiLCJmaWxlIjoibXktdXBsb2FkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCBuYXZiYXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9uYXZiYXInO1xuaW1wb3J0IHBpY3R1cmVMaXN0IGZyb20gJy4uL3BpY3R1cmUvcGljdHVyZS1saXN0JztcbmltcG9ydCBwYWdlciBmcm9tICcuLi9waWN0dXJlL3BhZ2VyJztcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vYXBpL2FwaSc7XG5pbXBvcnQgZW1wdHkgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9lbXB0eSc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGxQaWN0dXJlUGFnZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHt9O1xuICBkYXRhID0ge1xuICAgIHNlbGVjdGVkVGFiOiAwLFxuICAgIHBhc3NTY3JvbGxUb3A6IDAsXG4gICAgYXBwbHlpbmdTY3JvbGxUb3A6IDAsXG4gICAgcmVmdXNlU2Nyb2xsVG9wOiAwLFxuICAgIHBhc3NUb3RhbFBhZ2VzOiAxLFxuICAgIHBhc3NDdXJyZW50SW5kZXg6IDEsXG4gICAgYXBwbHlpbmdUb3RhbFBhZ2VzOiAxLFxuICAgIGFwcGx5aW5nQ3VycmVudEluZGV4OiAxLFxuICAgIHJlZnVzZVRvdGFsUGFnZXM6IDEsXG4gICAgcmVmdXNlQ3VycmVudEluZGV4OiAxLFxuICAgIHNpemU6IDIwLFxuICAgIGdvRGV0YWlsOiBmYWxzZSxcbiAgICBwYXNzSW1nczogW10sXG4gICAgYXBwbHlpbmdJbWdzOiBbXSxcbiAgICByZWZ1c2VJbWdzOiBbXSxcbiAgICBwYWdlMUxlZnQ6IDAsXG4gICAgcGFnZTJMZWZ0OiAnMTAwJScsXG4gICAgcGFnZTNMZWZ0OiAnMjAwJSdcbiAgfTtcbiAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImVtcHR5XCI6e1wieG1sbnM6d3hcIjpcIlwifSxcInBhc3MtcGFnZXJcIjp7XCJ4bWxuczp3eFwiOlwiXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnRvdGFsLnN5bmNcIjpcInBhc3NUb3RhbFBhZ2VzXCIsXCJ2LWJpbmQ6Y3VycmVudEluZGV4LnN5bmNcIjpcInBhc3NDdXJyZW50SW5kZXhcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImFwcGx5aW5nLXBhZ2VyXCI6e1widi1iaW5kOnRvdGFsLnN5bmNcIjpcImFwcGx5aW5nVG90YWxQYWdlc1wiLFwiYmluZGN1cnJlbnRJbmRleFwiOlwiYXBwbHlpbmdDdXJyZW50SW5kZXhcIn0sXCJyZWZ1c2UtcGFnZXJcIjp7XCJ2LWJpbmQ6dG90YWwuc3luY1wiOlwicmVmdXNlVG90YWxQYWdlc1wiLFwiYmluZGN1cnJlbnRJbmRleFwiOlwicmVmdXNlQ3VycmVudEluZGV4XCJ9LFwicGFzcy1waWN0dXJlLWxpc3RcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnBpY3Muc3luY1wiOlwicGFzc0ltZ3NcIn0sXCJhcHBseWluZy1waWN0dXJlLWxpc3RcIjp7XCJ2LWJpbmQ6cGljcy5zeW5jXCI6XCJhcHBseWluZ0ltZ3NcIixcInYtYmluZDpkZXRhaWwub25jZVwiOlwiZ29EZXRhaWxcIn0sXCJyZWZ1c2UtcGljdHVyZS1saXN0XCI6e1widi1iaW5kOnBpY3Muc3luY1wiOlwicmVmdXNlSW1nc1wiLFwidi1iaW5kOmRldGFpbC5vbmNlXCI6XCJnb0RldGFpbFwiLFwieG1sbnM6di1vblwiOlwiXCJ9fTtcclxuJGV2ZW50cyA9IHtcInBhc3MtcGFnZXJcIjp7XCJ2LW9uOmNoYW5nZVwiOlwicGFzc1BhZ2VDaGFuZ2VcIn0sXCJhcHBseWluZy1wYWdlclwiOntcInYtb246Y2hhbmdlXCI6XCJhcHBseWluZ1BhZ2VDaGFuZ2VcIn0sXCJyZWZ1c2UtcGFnZXJcIjp7XCJ2LW9uOmNoYW5nZVwiOlwicmVmdXNlUGFnZUNoYW5nZVwifSxcInJlZnVzZS1waWN0dXJlLWxpc3RcIjp7XCJ2LW9uOmNsaWNrXCI6XCJyZWFzb25EZXRhaWxcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICBuYXZiYXIsXG4gICAgZW1wdHksXG4gICAgJ3Bhc3MtcGFnZXInOiBwYWdlcixcbiAgICAnYXBwbHlpbmctcGFnZXInOiBwYWdlcixcbiAgICAncmVmdXNlLXBhZ2VyJzogcGFnZXIsXG4gICAgJ3Bhc3MtcGljdHVyZS1saXN0JzogcGljdHVyZUxpc3QsXG4gICAgJ2FwcGx5aW5nLXBpY3R1cmUtbGlzdCc6IHBpY3R1cmVMaXN0LFxuICAgICdyZWZ1c2UtcGljdHVyZS1saXN0JzogcGljdHVyZUxpc3RcbiAgfTtcbiAgY29tcHV0ZWQgPSB7XG4gICAgbWFyZ2luSGVpZ2h0OiAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEubmF2SGVpZ2h0ICsgNDY7XG4gICAgfVxuICB9XG4gIG1ldGhvZHMgPSB7XG4gICAgYmFjaygpIHtcbiAgICAgIHdlcHkubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgZGVsdGE6IDFcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgc2Nyb2xsKGV2ZW50KSB7XG4gICAgICBpZiAocGFyc2VJbnQodGhpcy5zZWxlY3RlZFRhYikgPT09IDApIHtcbiAgICAgICAgdGhpcy5wYXNzU2Nyb2xsVG9wID0gMTtcbiAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQodGhpcy5zZWxlY3RlZFRhYikgPT09IDEpIHtcbiAgICAgICAgdGhpcy5hcHBseWluZ1Njcm9sbFRvcCA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlZnVzZVNjcm9sbFRvcCA9IDE7XG4gICAgICB9XG4gICAgfSxcbiAgICBjaG9vc2UodGFiKSB7XG4gICAgICBpZiAodGFiICE9PSB0aGlzLnNlbGVjdGVkVGFiKSB7XG4gICAgICAgIHN3aXRjaCAodGFiLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICAgIHRoaXMucGFnZTFMZWZ0ID0gMDtcbiAgICAgICAgICAgIHRoaXMucGFnZTJMZWZ0ID0gJzEwMCUnO1xuICAgICAgICAgICAgdGhpcy5wYWdlM0xlZnQgPSAnMjAwJSc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgIHRoaXMucGFnZTFMZWZ0ID0gJy0xMDAlJztcbiAgICAgICAgICAgIHRoaXMucGFnZTJMZWZ0ID0gJzAnO1xuICAgICAgICAgICAgdGhpcy5wYWdlM0xlZnQgPSAnMTAwJSc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgIHRoaXMucGFnZTFMZWZ0ID0gJy0yMDAlJztcbiAgICAgICAgICAgIHRoaXMucGFnZTJMZWZ0ID0gJy0xMDAlJztcbiAgICAgICAgICAgIHRoaXMucGFnZTNMZWZ0ID0gJzAnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRhYjtcbiAgICAgIH1cbiAgICB9LFxuICAgIHBhc3NQYWdlQ2hhbmdlKGluZGV4LCBldmVudCkge1xuICAgICAgdGhpcy5wYXNzQ3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICB0aGlzLmZldGNoUGFzc1BhZ2UoKTtcbiAgICB9LFxuICAgIGFwcGx5aW5nUGFnZUNoYW5nZShpbmRleCwgZXZlbnQpIHtcbiAgICAgIHRoaXMuYXBwbHlpbmdDdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICAgIHRoaXMuZmV0Y2hBcHBseWluZ1BhZ2UoKTtcbiAgICB9LFxuICAgIHJlZnVzZVBhZ2VDaGFuZ2UoaW5kZXgsIGV2ZW50KSB7XG4gICAgICB0aGlzLnJlZnVzZUN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgdGhpcy5mZXRjaEFwcGx5aW5nUGFnZSgpO1xuICAgIH0sXG4gICAgcmVhc29uRGV0YWlsKGlkKSB7XG4gICAgICB0aGlzLiRwcmVsb2FkKCdwaWMnLCB0aGlzLnJlZnVzZUltZ3NbaWRdKTtcbiAgICAgIHRoaXMuJG5hdmlnYXRlKCcvcGFnZXMvbXkvdXBsb2FkLWRldGFpbCcpO1xuICAgIH1cbiAgICAvLyBkZWxldGUoaWQpIHtcbiAgICAvLyB3ZXB5LnNob3dBY3Rpb25TaGVldCh7XG4gICAgLy8gICBpdGVtTGlzdDogWyfliKDpmaQnXSwgLy8g5oyJ6ZKu55qE5paH5a2X5pWw57uE77yM5pWw57uE6ZW/5bqm5pyA5aSn5Li6NuS4qixcbiAgICAvLyAgIGl0ZW1Db2xvcjogJyMwMDAwMDAnLCAvLyDmjInpkq7nmoTmloflrZfpopzoibIsXG4gICAgLy8gICBzdWNjZXNzOiByZXMgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgIC8vICAgICBpZiAocmVzLnRhcEluZGV4ID09PSAwKSB7XG4gICAgLy8gICAgICAgLy8gdG9kbzrliKDpmaTlm77niYdcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICAgIC8vIH1cbiAgfTtcbiAgZmV0Y2hQYXNzUGFnZSgpIHtcbiAgICBpZiAodGhpcy5wYXNzVG90YWxQYWdlcyA+PSB0aGlzLnBhc3NDdXJyZW50SW5kZXgpIHtcbiAgICAgIHRoaXMucGFzc1Njcm9sbFRvcCA9IDA7XG4gICAgICBhcGkuZmV0Y2hVcGxvYWRzKCdhZ3JlZScsIHRoaXMucGFzc0N1cnJlbnRJbmRleCAtIDEsIHRoaXMuc2l6ZSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLnBhc3NJbWdzID0gcmVzLmltZ3M7XG4gICAgICAgIHRoaXMucGFzc1RvdGFsUGFnZXMgPSByZXMudG90YWxQYWdlcztcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgZmV0Y2hBcHBseWluZ1BhZ2UoKSB7XG4gICAgaWYgKHRoaXMuYXBwbHlpbmdUb3RhbFBhZ2VzID49IHRoaXMuYXBwbHlpbmdDdXJyZW50SW5kZXgpIHtcbiAgICAgIHRoaXMuYXBwbHlpbmdTY3JvbGxUb3AgPSAwO1xuICAgICAgYXBpLmZldGNoVXBsb2FkcygnYXBwbHknLCB0aGlzLmFwcGx5aW5nQ3VycmVudEluZGV4IC0gMSwgdGhpcy5zaXplKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlpbmdJbWdzID0gcmVzLmltZ3M7XG4gICAgICAgIHRoaXMuYXBwbHlpbmdUb3RhbFBhZ2VzID0gcmVzLnRvdGFsUGFnZXM7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9LCBlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGZldGNoUmVmdXNlUGFnZSgpIHtcbiAgICBpZiAodGhpcy5yZWZ1c2VUb3RhbFBhZ2VzID49IHRoaXMucmVmdXNlQ3VycmVudEluZGV4KSB7XG4gICAgICB0aGlzLnJlZnVzZVNjcm9sbFRvcCA9IDA7XG4gICAgICBhcGkuZmV0Y2hVcGxvYWRzKCdyZWZ1c2UnLCB0aGlzLnJlZnVzZUN1cnJlbnRJbmRleCAtIDEsIHRoaXMuc2l6ZSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLnJlZnVzZUltZ3MgPSByZXMuaW1ncztcbiAgICAgICAgdGhpcy5yZWZ1c2VUb3RhbFBhZ2VzID0gcmVzLnRvdGFsUGFnZXM7XG4gICAgICAgIHdlcHkucGFnZVNjcm9sbFRvKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IDAsIC8vIOa7muWKqOWIsOmhtemdoueahOebruagh+S9jee9ru+8iOWNleS9jXB477yJLFxuICAgICAgICAgIGR1cmF0aW9uOiAwIC8vIOa7muWKqOWKqOeUu+eahOaXtumVv++8jOm7mOiupDMwMG1z77yM5Y2V5L2NIG1zLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgb25SZWFkeSgpIHtcbiAgICB0aGlzLmZldGNoUGFzc1BhZ2UoKTtcbiAgICB0aGlzLmZldGNoQXBwbHlpbmdQYWdlKCk7XG4gICAgdGhpcy5mZXRjaFJlZnVzZVBhZ2UoKTtcbiAgfTtcbn1cbiJdfQ==