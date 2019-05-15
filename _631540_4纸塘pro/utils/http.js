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

/* eslint-disable indent */ var _wepy = require("./../npm/wepy/lib/wepy.js");

var _wepy2 = _interopRequireDefault(_wepy);

var _config = require("./../api/config.js");

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

var Http = function() {
    function Http() {
        _classCallCheck(this, Http);
        this.domain = _config.API_HOST;
        this._init();
    }
    /**
   * _init
   */    _createClass(Http, [ {
        key: "_init",
        value: function _init() {
            this._initDefaults();
            this._initMethods();
        }
        /**
     * _initDefaults
     */    }, {
        key: "_initDefaults",
        value: function _initDefaults() {
            // 发起请求所支持的方法
            this.instanceSource = {
                method: [ "OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT" ]
            };
        }
        /**
     * 遍历对象构造方法，方法名以小写字母+后缀名
     */    }, {
        key: "_initMethods",
        value: function _initMethods() {
            var _this = this;
            for (var key in this.instanceSource) {
                this.instanceSource[key].forEach(function(method, index) {
                    _this[method.toLowerCase()] = function() {
                        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                            args[_key] = arguments[_key];
                        }
                        return _this._defaultRequest.apply(_this, [ method ].concat(args));
                    };
                });
            }
        }
        /**
     * 以wx.request作为底层方法
     * @param {String} method 请求方法
     * @param {String} url    接口地址
     * @param {Object} params 请求参数
     * @param {Bealoon} blank  是否显示加载中
     * @param {Object} header 设置请求的 header
     * @param {String} dataType 请求的数据类型
     */    }, {
        key: "_defaultRequest",
        value: function _defaultRequest() {
            var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
            var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
            var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var blank = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
            var header = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
            var dataType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "json";
            var $$header = Object.assign({}, header);
            var $$url = this.domain + "/" + url;
            // const $$url = `${url}`;
                        if (blank) {
                _wepy2.default.showLoading({
                    title: "加载中",
                    mask: true
                });
            }
            return new Promise(function(resolve, reject) {
                // 请求参数配置
                var $$config = {
                    url: $$url,
                    data: params,
                    header: $$header,
                    method: method,
                    dataType: dataType,
                    success: function success(res) {
                        if (blank) _wepy2.default.hideLoading();
                        if (res) {
                            switch (res.code) {
                              case 200:
                                resolve(res);
                                break;

                              default:
                                reject(res);
                            }
                        } else {
                            reject(res);
                        }
                        // resolve(res);
                                        },
                    fail: function fail(res) {
                        if (blank) _wepy2.default.hideLoading();
                        reject(res);
                    }
                };
                _wepy2.default.request($$config);
            });
        }
    } ]);
    return Http;
}();

exports.default = Http;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHAuanMiXSwibmFtZXMiOlsiSHR0cCIsImRvbWFpbiIsIkFQSV9IT1NUIiwiX2luaXQiLCJfaW5pdERlZmF1bHRzIiwiX2luaXRNZXRob2RzIiwiaW5zdGFuY2VTb3VyY2UiLCJtZXRob2QiLCJrZXkiLCJmb3JFYWNoIiwiaW5kZXgiLCJ0b0xvd2VyQ2FzZSIsImFyZ3MiLCJfZGVmYXVsdFJlcXVlc3QiLCJ1cmwiLCJwYXJhbXMiLCJibGFuayIsImhlYWRlciIsImRhdGFUeXBlIiwiJCRoZWFkZXIiLCJPYmplY3QiLCJhc3NpZ24iLCIkJHVybCIsIndlcHkiLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiJCRjb25maWciLCJkYXRhIiwic3VjY2VzcyIsInJlcyIsImhpZGVMb2FkaW5nIiwiY29kZSIsImZhaWwiLCJyZXF1ZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7cWpCQUFBOzs7QUFDQTs7OztBQUNBOzs7Ozs7SUFDTUEsSTtBQUVKLGtCQUFjO0FBQUE7O0FBQUEsU0FEZEMsTUFDYyxHQURMQyxnQkFDSzs7QUFDWixTQUFLQyxLQUFMO0FBQ0Q7O0FBRUQ7Ozs7Ozs7NEJBR1E7QUFDTixXQUFLQyxhQUFMO0FBQ0EsV0FBS0MsWUFBTDtBQUNEOztBQUVEOzs7Ozs7b0NBR2dCO0FBQ2Q7QUFDQSxXQUFLQyxjQUFMLEdBQXNCO0FBQ3BCQyxnQkFBUSxDQUNOLFNBRE0sRUFFTixLQUZNLEVBR04sTUFITSxFQUlOLE1BSk0sRUFLTixLQUxNLEVBTU4sUUFOTSxFQU9OLE9BUE0sRUFRTixTQVJNO0FBRFksT0FBdEI7QUFZRDs7QUFFRDs7Ozs7O21DQUdlO0FBQUE7O0FBQ2IsV0FBSyxJQUFJQyxHQUFULElBQWdCLEtBQUtGLGNBQXJCLEVBQXFDO0FBQ25DLGFBQUtBLGNBQUwsQ0FBb0JFLEdBQXBCLEVBQXlCQyxPQUF6QixDQUFpQyxVQUFDRixNQUFELEVBQVNHLEtBQVQsRUFBbUI7QUFDbEQsZ0JBQUtILE9BQU9JLFdBQVAsRUFBTCxJQUE2QjtBQUFBLDhDQUFJQyxJQUFKO0FBQUlBLGtCQUFKO0FBQUE7O0FBQUEsbUJBQWEsTUFBS0MsZUFBTCxlQUFxQk4sTUFBckIsU0FBZ0NLLElBQWhDLEVBQWI7QUFBQSxXQUE3QjtBQUNELFNBRkQ7QUFHRDtBQUNGOztBQUVEOzs7Ozs7Ozs7Ozs7c0NBU21HO0FBQUEsVUFBbkZMLE1BQW1GLHVFQUExRSxFQUEwRTtBQUFBLFVBQXRFTyxHQUFzRSx1RUFBaEUsRUFBZ0U7QUFBQSxVQUE1REMsTUFBNEQsdUVBQW5ELEVBQW1EO0FBQUEsVUFBL0NDLEtBQStDLHVFQUF2QyxLQUF1QztBQUFBLFVBQWhDQyxNQUFnQyx1RUFBdkIsRUFBdUI7QUFBQSxVQUFuQkMsUUFBbUIsdUVBQVIsTUFBUTs7QUFDakcsVUFBSUMsV0FBV0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JKLE1BQWxCLENBQWY7QUFDQSxVQUFNSyxRQUFXLEtBQUtyQixNQUFoQixTQUEwQmEsR0FBaEM7QUFDQTtBQUNBLFVBQUlFLEtBQUosRUFBVztBQUNUTyx1QkFBS0MsV0FBTCxDQUFpQjtBQUNmQyxpQkFBTyxLQURRO0FBRWZDLGdCQUFNO0FBRlMsU0FBakI7QUFJRDs7QUFFRCxhQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFVQyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUM1QztBQUNBLFlBQU1DLFdBQVc7QUFDZmhCLGVBQUtRLEtBRFU7QUFFZlMsZ0JBQU1oQixNQUZTO0FBR2ZFLGtCQUFRRSxRQUhPO0FBSWZaLGtCQUFRQSxNQUpPO0FBS2ZXLG9CQUFVQSxRQUxLO0FBTWZjLG1CQUFTLGlCQUFDQyxHQUFELEVBQVM7QUFDaEIsZ0JBQUlqQixLQUFKLEVBQVdPLGVBQUtXLFdBQUw7QUFDWCxnQkFBSUQsR0FBSixFQUFTO0FBQ1Asc0JBQVFBLElBQUlFLElBQVo7QUFDRSxxQkFBSyxHQUFMO0FBQ0VQLDBCQUFRSyxHQUFSO0FBQ0E7QUFDRjtBQUNFSix5QkFBT0ksR0FBUDtBQUxKO0FBT0QsYUFSRCxNQVFPO0FBQ0xKLHFCQUFPSSxHQUFQO0FBQ0Q7QUFDRDtBQUNELFdBcEJjO0FBcUJmRyxnQkFBTSxjQUFDSCxHQUFELEVBQVM7QUFDYixnQkFBSWpCLEtBQUosRUFBV08sZUFBS1csV0FBTDtBQUNYTCxtQkFBT0ksR0FBUDtBQUNEO0FBeEJjLFNBQWpCO0FBMEJBVix1QkFBS2MsT0FBTCxDQUFhUCxRQUFiO0FBQ0QsT0E3Qk0sQ0FBUDtBQThCRDs7Ozs7O2tCQUdZOUIsSSIsImZpbGUiOiJodHRwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaW5kZW50ICovXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbmltcG9ydCB7IEFQSV9IT1NUIH0gZnJvbSAnLi4vYXBpL2NvbmZpZy5qcyc7XG5jbGFzcyBIdHRwIHtcbiAgZG9tYWluID0gQVBJX0hPU1Q7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBfaW5pdFxuICAgKi9cbiAgX2luaXQoKSB7XG4gICAgdGhpcy5faW5pdERlZmF1bHRzKCk7XG4gICAgdGhpcy5faW5pdE1ldGhvZHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBfaW5pdERlZmF1bHRzXG4gICAqL1xuICBfaW5pdERlZmF1bHRzKCkge1xuICAgIC8vIOWPkei1t+ivt+axguaJgOaUr+aMgeeahOaWueazlVxuICAgIHRoaXMuaW5zdGFuY2VTb3VyY2UgPSB7XG4gICAgICBtZXRob2Q6IFtcbiAgICAgICAgJ09QVElPTlMnLFxuICAgICAgICAnR0VUJyxcbiAgICAgICAgJ0hFQUQnLFxuICAgICAgICAnUE9TVCcsXG4gICAgICAgICdQVVQnLFxuICAgICAgICAnREVMRVRFJyxcbiAgICAgICAgJ1RSQUNFJyxcbiAgICAgICAgJ0NPTk5FQ1QnXG4gICAgICBdXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiDpgY3ljoblr7nosaHmnoTpgKDmlrnms5XvvIzmlrnms5XlkI3ku6XlsI/lhpnlrZfmr40r5ZCO57yA5ZCNXG4gICAqL1xuICBfaW5pdE1ldGhvZHMoKSB7XG4gICAgZm9yIChsZXQga2V5IGluIHRoaXMuaW5zdGFuY2VTb3VyY2UpIHtcbiAgICAgIHRoaXMuaW5zdGFuY2VTb3VyY2Vba2V5XS5mb3JFYWNoKChtZXRob2QsIGluZGV4KSA9PiB7XG4gICAgICAgIHRoaXNbbWV0aG9kLnRvTG93ZXJDYXNlKCldID0gKC4uLmFyZ3MpID0+IHRoaXMuX2RlZmF1bHRSZXF1ZXN0KG1ldGhvZCwgLi4uYXJncyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5Luld3gucmVxdWVzdOS9nOS4uuW6leWxguaWueazlVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kIOivt+axguaWueazlVxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsICAgIOaOpeWPo+WcsOWdgFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIOivt+axguWPguaVsFxuICAgKiBAcGFyYW0ge0JlYWxvb259IGJsYW5rICDmmK/lkKbmmL7npLrliqDovb3kuK1cbiAgICogQHBhcmFtIHtPYmplY3R9IGhlYWRlciDorr7nva7or7fmsYLnmoQgaGVhZGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhVHlwZSDor7fmsYLnmoTmlbDmja7nsbvlnotcbiAgICovXG4gIF9kZWZhdWx0UmVxdWVzdChtZXRob2QgPSAnJywgdXJsID0gJycsIHBhcmFtcyA9IHt9LCBibGFuayA9IGZhbHNlLCBoZWFkZXIgPSB7fSwgZGF0YVR5cGUgPSAnanNvbicpIHtcbiAgICBsZXQgJCRoZWFkZXIgPSBPYmplY3QuYXNzaWduKHt9LCBoZWFkZXIpO1xuICAgIGNvbnN0ICQkdXJsID0gYCR7dGhpcy5kb21haW59LyR7dXJsfWA7XG4gICAgLy8gY29uc3QgJCR1cmwgPSBgJHt1cmx9YDtcbiAgICBpZiAoYmxhbmspIHtcbiAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgICB0aXRsZTogJ+WKoOi9veS4rScsXG4gICAgICAgIG1hc2s6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAvLyDor7fmsYLlj4LmlbDphY3nva5cbiAgICAgIGNvbnN0ICQkY29uZmlnID0ge1xuICAgICAgICB1cmw6ICQkdXJsLFxuICAgICAgICBkYXRhOiBwYXJhbXMsXG4gICAgICAgIGhlYWRlcjogJCRoZWFkZXIsXG4gICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICBkYXRhVHlwZTogZGF0YVR5cGUsXG4gICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICBpZiAoYmxhbmspIHdlcHkuaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHJlcy5jb2RlKSB7XG4gICAgICAgICAgICAgIGNhc2UgMjAwOlxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZWplY3QocmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KHJlcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlc29sdmUocmVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogKHJlcykgPT4ge1xuICAgICAgICAgIGlmIChibGFuaykgd2VweS5oaWRlTG9hZGluZygpO1xuICAgICAgICAgIHJlamVjdChyZXMpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgd2VweS5yZXF1ZXN0KCQkY29uZmlnKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIdHRwO1xuIl19