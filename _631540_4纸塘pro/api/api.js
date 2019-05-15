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

var _http = require("./../utils/http.js");

var _http2 = _interopRequireDefault(_http);

var _date = require("./../utils/date.js");

var _date2 = _interopRequireDefault(_date);

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

var Api = function() {
    function Api() {
        _classCallCheck(this, Api);
        this.http = new _http2.default();
    }
    /**
   * 微信登录
   * @param {*} code 
   */    _createClass(Api, [ {
        key: "wxLogin",
        value: function wxLogin(code) {
          return Promise.resolve({ code: 200, msg: "请求成功", data: "6506e594bc88440e8349264c2ab49acf" });
            return this.http.post("api/auth/wx/fast/login?jsCode=" + code).then(function(res) {
                return Promise.resolve(res.data);
            }, function(err) {
                return Promise.reject(err);
            });
        }
    }, {
        key: "wxPhoneLogin",
        value: function wxPhoneLogin(iv, encryptedData, uuid) {
            return this.http.post("api/auth/wx/phone/number", {
                encryptedData: encryptedData,
                iv: iv,
                uuid: uuid
            }).then(function(res) {
                return Promise.resolve(res.data);
            }, function(err) {
                return Promise.reject(err);
            });
        }
        /**
     * 发送验证码
     * @param {String} phone 
     */    }, {
        key: "sendSms",
        value: function sendSms(phone) {
            return this.http.post("api/auth/login/sms?phone=" + phone, {}).then(function(res) {
                return Promise.resolve(res.data);
            }, function(err) {
                return Promise.reject(err);
            });
        }
        /**
     * 短信验证码登录
     * @param {String} phone 
     * @param {String} code
     */    }, {
        key: "smsLogin",
        value: function smsLogin(phone, code) {
            return this.http.post("api/auth/phone/login", {
                phone: phone,
                verifyCode: code
            }).then(function(res) {
                return Promise.resolve(res.data);
            }, function(err) {
                return Promise.reject(err);
            });
        }
        /**
     * 退出登录
     */    }, {
        key: "logout",
        value: function logout() {
            return this.http.post("api/auth/logout", {}).then(function(res) {
                return Promise.resolve(res.data);
            }, function(err) {
                return Promise.reject(err);
            });
        }
        /**
     * 更新信息
     * @param {*} iv 
     * @param {*} encryptedData 
     * @param {*} uuid 
     */    }, {
        key: "updateUser",
        value: function updateUser(iv, encryptedData, uuid) {
            return this.http.put("api/auth/wx/user/info", {
                encryptedData: encryptedData,
                iv: iv,
                uuid: uuid
            });
        }
    }, {
        key: "fetchUser",
        value: function fetchUser() {
            var detail = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            var url = "api/customer/info";
            if (detail) {
                url = "api/personal/center/info";
            }
            return this.http.get(url, {}).then(function(res) {
                var result = res.data;
                return Promise.resolve({
                    id: result.id,
                    name: result.nickname || "纸友",
                    avatar: result.avatar,
                    sign: result.signature,
                    payUrl: result.rewardCode,
                    attentionNum: result.followNum || 0,
                    fansNum: result.fanNum || 0,
                    downloadNum: result.downloadNum || 0,
                    uploadNum: result.submissionNum || 0,
                    collectionNum: result.collectionNum || 0,
                    score: result.integral || 0,
                    downloadFreeTimes: result.downloadFreeNum || 0
                });
            }, function(err) {
                return Promise.reject(err);
            });
        }
    }, {
        key: "fetchPerson",
        value: function fetchPerson(id) {
            var url = "api/personal/center/page";
            if (id) {
                url += "?customerId=" + id;
            }
            return this.http.get(url, {}).then(function(res) {
                var result = res.data;
                var user = {
                    name: result.nickname || "纸友",
                    avatar: result.avatar || "/assets/imgs/logo.png",
                    attention: result.followState,
                    attentionNum: result.followNum || 0,
                    fansNum: result.fanNum || 0,
                    downloadNum: result.beDownloadNum || 0,
                    uploadNum: result.uploadNum || 0
                };
                var activities = [];
                result.dayWallpaperList.forEach(function(item) {
                    var date = new Date(item.createTime);
                    var day = date.getDate();
                    var month = _date2.default.month[date.getMonth()];
                    var imgs = [];
                    item.wallpaperList.forEach(function(img) {
                        imgs.push({
                            id: img.id,
                            url: img.url
                        });
                    });
                    activities.push({
                        day: day > 9 ? day : "0" + day,
                        month: month,
                        year: date.getFullYear(),
                        imgs: imgs
                    });
                });
                return Promise.resolve({
                    user: user,
                    activities: activities
                });
            }, function(err) {
                return Promise.reject(err);
            });
        }
        /**
     * 我的关注
     * @param {*} index 
     * @param {*} size 
     */    }, {
        key: "fetchFollows",
        value: function fetchFollows(index, size) {
            return this.http.get("api/personal/center/follow/list?page=" + index + "&size=" + size).then(function(res) {
                var users = [];
                var result = res.data;
                result.content.forEach(function(item) {
                    users.push({
                        id: item.followedCustomerId,
                        name: item.nickname || "纸友",
                        avatar: item.avatar || "/assets/imgs/logo.png"
                    });
                });
                return Promise.resolve({
                    totalPages: result.totalPages,
                    users: users
                });
            }, function(err) {
                return Promise.reject(err);
            });
        }
        /**
     * 我的粉丝
     * @param {Number} index 
     * @param {*} size 
     */    }, {
        key: "fetchFans",
        value: function fetchFans(index, size) {
            return this.http.get("api/personal/center/fan/list?page=" + index + "&size=" + size).then(function(res) {
                var users = [];
                var result = res.data;
                result.content.forEach(function(item) {
                    users.push({
                        id: item.followedCustomerId,
                        name: item.nickname || "纸友",
                        avatar: item.avatar || "/assets/imgs/logo.png"
                    });
                });
                return Promise.resolve({
                    totalPages: result.totalPages,
                    users: users
                });
            }, function(err) {
                return Promise.reject(err);
            });
        }
        /**
     * 我的收藏
     * @param {*} index 
     * @param {*} size 
     */    }, {
        key: "fetchCollection",
        value: function fetchCollection(index, size) {
            return this.http.get("api/personal/center/collection/list?page=" + index + "&size=" + size).then(function(res) {
                var imgs = [];
                res.data.content.forEach(function(item) {
                    imgs.push({
                        id: item.wallpaper.id,
                        url: item.wallpaper.url
                    });
                });
                return Promise.resolve({
                    imgs: imgs,
                    totalPages: res.data.totalPages
                });
            }, function(err) {
                return Promise.reject(err);
            });
        }
    }, {
        key: "fetchDownloads",
        value: function fetchDownloads(index, size) {
            return this.http.get("api/personal/center/download/list?page=" + index + "&size=" + size).then(function(res) {
                var imgs = [];
                res.data.content.forEach(function(item) {
                    imgs.push({
                        id: item.wallpaper.id,
                        url: item.wallpaper.url
                    });
                });
                return Promise.resolve({
                    imgs: imgs,
                    totalPages: res.data.totalPages
                });
            }, function(err) {
                return Promise.reject(err);
            });
        }
    }, {
        key: "fetchUploads",
        value: function fetchUploads(state, index, size) {
            return this.http.get("api/submission/list?page=" + index + "&size=" + size + "&state=" + state).then(function(res) {
                var imgs = [];
                res.data.content.forEach(function(item, index) {
                    imgs.push({
                        id: item.wallpaperId || index,
                        url: item.image.url,
                        reviewReason: item.reviewReason || "不适合当做壁纸或者尺寸和清晰度不足"
                    });
                });
                return Promise.resolve({
                    imgs: imgs,
                    totalPages: res.data.totalPages
                });
            }, function(err) {
                return Promise.reject(err);
            });
        }
    }, {
        key: "fetchScoreRecords",
        value: function fetchScoreRecords(index, size) {
            return this.http.get("api/personal/center/integral/list?page=" + index + "&size=" + size).then(function(res) {
                var result = res.data;
                var records = [];
                result.content.forEach(function(item) {
                    records.push({
                        time: _date2.default.parseDate(item.createTime),
                        score: item.changeValue,
                        desc: item.remark
                    });
                });
                return Promise.resolve({
                    records: records,
                    totalPages: result.totalPages
                });
            }, function(err) {
                return Promise.reject();
            });
        }
    }, {
        key: "updateInfo",
        value: function updateInfo(avatar, name) {
            var info = {};
            if (avatar) {
                info.avatar = avatar;
            }
            if (name) {
                info.nickname = name;
            }
            return this.http.put("/api/personal/center/info", info);
        }
    }, {
        key: "attention",
        value: function attention(id, state) {
            return this.http.post("api/personal/center/relation/" + id + "/set?state=" + state);
        }
    } ]);
    return Api;
}();

var api = new Api();

exports.default = api;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJBcGkiLCJodHRwIiwiSHR0cCIsImNvZGUiLCJwb3N0IiwidGhlbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVzIiwiZGF0YSIsInJlamVjdCIsImVyciIsIml2IiwiZW5jcnlwdGVkRGF0YSIsInV1aWQiLCJwaG9uZSIsInZlcmlmeUNvZGUiLCJwdXQiLCJkZXRhaWwiLCJ1cmwiLCJnZXQiLCJyZXN1bHQiLCJpZCIsIm5hbWUiLCJuaWNrbmFtZSIsImF2YXRhciIsInNpZ24iLCJzaWduYXR1cmUiLCJwYXlVcmwiLCJyZXdhcmRDb2RlIiwiYXR0ZW50aW9uTnVtIiwiZm9sbG93TnVtIiwiZmFuc051bSIsImZhbk51bSIsImRvd25sb2FkTnVtIiwidXBsb2FkTnVtIiwic3VibWlzc2lvbk51bSIsImNvbGxlY3Rpb25OdW0iLCJzY29yZSIsImludGVncmFsIiwiZG93bmxvYWRGcmVlVGltZXMiLCJkb3dubG9hZEZyZWVOdW0iLCJ1c2VyIiwiYXR0ZW50aW9uIiwiZm9sbG93U3RhdGUiLCJiZURvd25sb2FkTnVtIiwiYWN0aXZpdGllcyIsImRheVdhbGxwYXBlckxpc3QiLCJmb3JFYWNoIiwiZGF0ZSIsIkRhdGUiLCJpdGVtIiwiY3JlYXRlVGltZSIsImRheSIsImdldERhdGUiLCJtb250aCIsImRhdGVVdGlsIiwiZ2V0TW9udGgiLCJpbWdzIiwid2FsbHBhcGVyTGlzdCIsInB1c2giLCJpbWciLCJ5ZWFyIiwiZ2V0RnVsbFllYXIiLCJpbmRleCIsInNpemUiLCJ1c2VycyIsImNvbnRlbnQiLCJmb2xsb3dlZEN1c3RvbWVySWQiLCJ0b3RhbFBhZ2VzIiwid2FsbHBhcGVyIiwic3RhdGUiLCJ3YWxscGFwZXJJZCIsImltYWdlIiwicmV2aWV3UmVhc29uIiwicmVjb3JkcyIsInRpbWUiLCJwYXJzZURhdGUiLCJjaGFuZ2VWYWx1ZSIsImRlc2MiLCJyZW1hcmsiLCJpbmZvIiwiYXBpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFB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TzFFLFFBQVFDLE9BQVIsQ0FBZ0I7QUFDckJvRSwwQkFEcUI7QUFFckJOLHNCQUFZaEQsT0FBT2dEO0FBRkUsU0FBaEIsQ0FBUDtBQUlELE9BZkksRUFnQkwsZUFBTztBQUNMLGVBQU8vRCxRQUFRSSxNQUFSLEVBQVA7QUFDRCxPQWxCSSxDQUFQO0FBb0JEOzs7K0JBRVVlLE0sRUFBUUYsSSxFQUFNO0FBQ3ZCLFVBQUkwRCxPQUFPLEVBQVg7QUFDQSxVQUFJeEQsTUFBSixFQUFZO0FBQ1Z3RCxhQUFLeEQsTUFBTCxHQUFjQSxNQUFkO0FBQ0Q7O0FBRUQsVUFBSUYsSUFBSixFQUFVO0FBQ1IwRCxhQUFLekQsUUFBTCxHQUFnQkQsSUFBaEI7QUFDRDtBQUNELGFBQU8sS0FBS3RCLElBQUwsQ0FBVWdCLEdBQVYsQ0FBYywyQkFBZCxFQUEyQ2dFLElBQTNDLENBQVA7QUFDRDs7OzhCQUVTM0QsRSxFQUFJaUQsSyxFQUFPO0FBQ25CLGFBQU8sS0FBS3RFLElBQUwsQ0FBVUcsSUFBVixtQ0FBK0NrQixFQUEvQyxtQkFBK0RpRCxLQUEvRCxDQUFQO0FBQ0Q7Ozs7OztBQUdILElBQU1XLE1BQU0sSUFBSWxGLEdBQUosRUFBWjtrQkFDZWtGLEciLCJmaWxlIjoiYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEh0dHAgZnJvbSAnLi4vdXRpbHMvaHR0cCc7XG5pbXBvcnQgZGF0ZVV0aWwgZnJvbSAnLi4vdXRpbHMvZGF0ZSc7XG5jbGFzcyBBcGkge1xuICBodHRwO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmh0dHAgPSBuZXcgSHR0cCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOW+ruS/oeeZu+W9lVxuICAgKiBAcGFyYW0geyp9IGNvZGUgXG4gICAqL1xuICB3eExvZ2luKGNvZGUpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYGFwaS9hdXRoL3d4L2Zhc3QvbG9naW4/anNDb2RlPSR7Y29kZX1gKS50aGVuKHJlcyA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlcy5kYXRhKTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfSk7XG4gIH1cblxuICB3eFBob25lTG9naW4oaXYsIGVuY3J5cHRlZERhdGEsIHV1aWQpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYGFwaS9hdXRoL3d4L3Bob25lL251bWJlcmAsIHtcbiAgICAgIGVuY3J5cHRlZERhdGE6IGVuY3J5cHRlZERhdGEsXG4gICAgICBpdjogaXYsXG4gICAgICB1dWlkOiB1dWlkXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMuZGF0YSk7XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOWPkemAgemqjOivgeeggVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGhvbmUgXG4gICAqL1xuICBzZW5kU21zKHBob25lKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGBhcGkvYXV0aC9sb2dpbi9zbXM/cGhvbmU9JHtwaG9uZX1gLCB7fSkudGhlbihyZXMgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMuZGF0YSk7XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOefreS/oemqjOivgeeggeeZu+W9lVxuICAgKiBAcGFyYW0ge1N0cmluZ30gcGhvbmUgXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb2RlXG4gICAqL1xuICBzbXNMb2dpbihwaG9uZSwgY29kZSkge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgYXBpL2F1dGgvcGhvbmUvbG9naW5gLCB7XG4gICAgICBwaG9uZTogcGhvbmUsXG4gICAgICB2ZXJpZnlDb2RlOiBjb2RlXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMuZGF0YSk7XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOmAgOWHuueZu+W9lVxuICAgKi9cbiAgbG9nb3V0KCkge1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCgnYXBpL2F1dGgvbG9nb3V0Jywge30pLnRoZW4ocmVzID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzLmRhdGEpO1xuICAgIH0sIGVyciA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmm7TmlrDkv6Hmga9cbiAgICogQHBhcmFtIHsqfSBpdiBcbiAgICogQHBhcmFtIHsqfSBlbmNyeXB0ZWREYXRhIFxuICAgKiBAcGFyYW0geyp9IHV1aWQgXG4gICAqL1xuICB1cGRhdGVVc2VyKGl2LCBlbmNyeXB0ZWREYXRhLCB1dWlkKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoJ2FwaS9hdXRoL3d4L3VzZXIvaW5mbycsIHtcbiAgICAgIGVuY3J5cHRlZERhdGE6IGVuY3J5cHRlZERhdGEsXG4gICAgICBpdjogaXYsXG4gICAgICB1dWlkOiB1dWlkXG4gICAgfSlcbiAgfVxuXG4gIGZldGNoVXNlcihkZXRhaWwgPSBmYWxzZSkge1xuICAgIGxldCB1cmwgPSAnYXBpL2N1c3RvbWVyL2luZm8nO1xuICAgIGlmIChkZXRhaWwpIHtcbiAgICAgIHVybCA9ICdhcGkvcGVyc29uYWwvY2VudGVyL2luZm8nO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh1cmwsIHt9KS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgcmVzdWx0ID0gcmVzLmRhdGE7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgaWQ6IHJlc3VsdC5pZCxcbiAgICAgICAgbmFtZTogcmVzdWx0Lm5pY2tuYW1lIHx8ICfnurjlj4snLFxuICAgICAgICBhdmF0YXI6IHJlc3VsdC5hdmF0YXIsXG4gICAgICAgIHNpZ246IHJlc3VsdC5zaWduYXR1cmUsXG4gICAgICAgIHBheVVybDogcmVzdWx0LnJld2FyZENvZGUsXG4gICAgICAgIGF0dGVudGlvbk51bTogcmVzdWx0LmZvbGxvd051bSB8fCAwLFxuICAgICAgICBmYW5zTnVtOiByZXN1bHQuZmFuTnVtIHx8IDAsXG4gICAgICAgIGRvd25sb2FkTnVtOiByZXN1bHQuZG93bmxvYWROdW0gfHwgMCxcbiAgICAgICAgdXBsb2FkTnVtOiByZXN1bHQuc3VibWlzc2lvbk51bSB8fCAwLFxuICAgICAgICBjb2xsZWN0aW9uTnVtOiByZXN1bHQuY29sbGVjdGlvbk51bSB8fCAwLFxuICAgICAgICBzY29yZTogcmVzdWx0LmludGVncmFsIHx8IDAsXG4gICAgICAgIGRvd25sb2FkRnJlZVRpbWVzOiByZXN1bHQuZG93bmxvYWRGcmVlTnVtIHx8IDBcbiAgICAgIH0pO1xuICAgIH0sIGVyciA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZldGNoUGVyc29uKGlkKSB7XG4gICAgbGV0IHVybCA9ICdhcGkvcGVyc29uYWwvY2VudGVyL3BhZ2UnO1xuICAgIGlmIChpZCkge1xuICAgICAgdXJsICs9IGA/Y3VzdG9tZXJJZD0ke2lkfWA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwge30pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSByZXMuZGF0YTtcbiAgICAgIGxldCB1c2VyID0ge1xuICAgICAgICBuYW1lOiByZXN1bHQubmlja25hbWUgfHwgJ+e6uOWPiycsXG4gICAgICAgIGF2YXRhcjogcmVzdWx0LmF2YXRhciB8fCAnL2Fzc2V0cy9pbWdzL2xvZ28ucG5nJyxcbiAgICAgICAgYXR0ZW50aW9uOiByZXN1bHQuZm9sbG93U3RhdGUsXG4gICAgICAgIGF0dGVudGlvbk51bTogcmVzdWx0LmZvbGxvd051bSB8fCAwLFxuICAgICAgICBmYW5zTnVtOiByZXN1bHQuZmFuTnVtIHx8IDAsXG4gICAgICAgIGRvd25sb2FkTnVtOiByZXN1bHQuYmVEb3dubG9hZE51bSB8fCAwLFxuICAgICAgICB1cGxvYWROdW06IHJlc3VsdC51cGxvYWROdW0gfHwgMFxuICAgICAgfTtcbiAgICAgIGxldCBhY3Rpdml0aWVzID0gW107XG4gICAgICByZXN1bHQuZGF5V2FsbHBhcGVyTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGl0ZW0uY3JlYXRlVGltZSk7XG4gICAgICAgIGxldCBkYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICAgICAgbGV0IG1vbnRoID0gZGF0ZVV0aWwubW9udGhbZGF0ZS5nZXRNb250aCgpXTtcbiAgICAgICAgbGV0IGltZ3MgPSBbXTtcbiAgICAgICAgaXRlbS53YWxscGFwZXJMaXN0LmZvckVhY2goaW1nID0+IHtcbiAgICAgICAgICBpbWdzLnB1c2goe1xuICAgICAgICAgICAgaWQ6IGltZy5pZCxcbiAgICAgICAgICAgIHVybDogaW1nLnVybFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGFjdGl2aXRpZXMucHVzaCh7XG4gICAgICAgICAgZGF5OiBkYXkgPiA5ID8gZGF5IDogYDAke2RheX1gLFxuICAgICAgICAgIG1vbnRoOiBtb250aCxcbiAgICAgICAgICB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgaW1nczogaW1nc1xuICAgICAgICB9KTtcblxuICAgICAgfSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgdXNlcixcbiAgICAgICAgYWN0aXZpdGllc1xuICAgICAgfSk7XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9XG4gIC8qKlxuICAgKiDmiJHnmoTlhbPms6hcbiAgICogQHBhcmFtIHsqfSBpbmRleCBcbiAgICogQHBhcmFtIHsqfSBzaXplIFxuICAgKi9cbiAgZmV0Y2hGb2xsb3dzKGluZGV4LCBzaXplKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYGFwaS9wZXJzb25hbC9jZW50ZXIvZm9sbG93L2xpc3Q/cGFnZT0ke2luZGV4fSZzaXplPSR7c2l6ZX1gKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgdXNlcnMgPSBbXTtcbiAgICAgIGxldCByZXN1bHQgPSByZXMuZGF0YTtcbiAgICAgIHJlc3VsdC5jb250ZW50LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIHVzZXJzLnB1c2goe1xuICAgICAgICAgIGlkOiBpdGVtLmZvbGxvd2VkQ3VzdG9tZXJJZCxcbiAgICAgICAgICBuYW1lOiBpdGVtLm5pY2tuYW1lIHx8ICfnurjlj4snLFxuICAgICAgICAgIGF2YXRhcjogaXRlbS5hdmF0YXIgfHwgJy9hc3NldHMvaW1ncy9sb2dvLnBuZydcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgIHRvdGFsUGFnZXM6IHJlc3VsdC50b3RhbFBhZ2VzLFxuICAgICAgICB1c2VyczogdXNlcnNcbiAgICAgIH0pXG4gICAgfSwgZXJyID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOaIkeeahOeyieS4nVxuICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggXG4gICAqIEBwYXJhbSB7Kn0gc2l6ZSBcbiAgICovXG4gIGZldGNoRmFucyhpbmRleCwgc2l6ZSkge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGBhcGkvcGVyc29uYWwvY2VudGVyL2Zhbi9saXN0P3BhZ2U9JHtpbmRleH0mc2l6ZT0ke3NpemV9YCkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHVzZXJzID0gW107XG4gICAgICBsZXQgcmVzdWx0ID0gcmVzLmRhdGE7XG4gICAgICByZXN1bHQuY29udGVudC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICB1c2Vycy5wdXNoKHtcbiAgICAgICAgICBpZDogaXRlbS5mb2xsb3dlZEN1c3RvbWVySWQsXG4gICAgICAgICAgbmFtZTogaXRlbS5uaWNrbmFtZSB8fCAn57q45Y+LJyxcbiAgICAgICAgICBhdmF0YXI6IGl0ZW0uYXZhdGFyIHx8ICcvYXNzZXRzL2ltZ3MvbG9nby5wbmcnXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICB0b3RhbFBhZ2VzOiByZXN1bHQudG90YWxQYWdlcyxcbiAgICAgICAgdXNlcnM6IHVzZXJzXG4gICAgICB9KVxuICAgIH0sIGVyciA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmiJHnmoTmlLbol49cbiAgICogQHBhcmFtIHsqfSBpbmRleCBcbiAgICogQHBhcmFtIHsqfSBzaXplIFxuICAgKi9cbiAgZmV0Y2hDb2xsZWN0aW9uKGluZGV4LCBzaXplKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYGFwaS9wZXJzb25hbC9jZW50ZXIvY29sbGVjdGlvbi9saXN0P3BhZ2U9JHtpbmRleH0mc2l6ZT0ke3NpemV9YCkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGltZ3MgPSBbXTtcbiAgICAgIHJlcy5kYXRhLmNvbnRlbnQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaW1ncy5wdXNoKHtcbiAgICAgICAgICBpZDogaXRlbS53YWxscGFwZXIuaWQsXG4gICAgICAgICAgdXJsOiBpdGVtLndhbGxwYXBlci51cmxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICBpbWdzOiBpbWdzLFxuICAgICAgICB0b3RhbFBhZ2VzOiByZXMuZGF0YS50b3RhbFBhZ2VzXG4gICAgICB9KVxuICAgIH0sIGVyciA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZldGNoRG93bmxvYWRzKGluZGV4LCBzaXplKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYGFwaS9wZXJzb25hbC9jZW50ZXIvZG93bmxvYWQvbGlzdD9wYWdlPSR7aW5kZXh9JnNpemU9JHtzaXplfWApLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCBpbWdzID0gW107XG4gICAgICByZXMuZGF0YS5jb250ZW50LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGltZ3MucHVzaCh7XG4gICAgICAgICAgaWQ6IGl0ZW0ud2FsbHBhcGVyLmlkLFxuICAgICAgICAgIHVybDogaXRlbS53YWxscGFwZXIudXJsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgaW1nczogaW1ncyxcbiAgICAgICAgdG90YWxQYWdlczogcmVzLmRhdGEudG90YWxQYWdlc1xuICAgICAgfSlcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfSk7XG4gIH1cblxuICBmZXRjaFVwbG9hZHMoc3RhdGUsIGluZGV4LCBzaXplKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYGFwaS9zdWJtaXNzaW9uL2xpc3Q/cGFnZT0ke2luZGV4fSZzaXplPSR7c2l6ZX0mc3RhdGU9JHtzdGF0ZX1gKS50aGVuKHJlcyA9PiB7XG4gICAgICBsZXQgaW1ncyA9IFtdO1xuICAgICAgcmVzLmRhdGEuY29udGVudC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpbWdzLnB1c2goe1xuICAgICAgICAgIGlkOiBpdGVtLndhbGxwYXBlcklkIHx8IGluZGV4LFxuICAgICAgICAgIHVybDogaXRlbS5pbWFnZS51cmwsXG4gICAgICAgICAgcmV2aWV3UmVhc29uOiBpdGVtLnJldmlld1JlYXNvbiB8fCAn5LiN6YCC5ZCI5b2T5YGa5aOB57q45oiW6ICF5bC65a+45ZKM5riF5pmw5bqm5LiN6LazJ1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgIGltZ3M6IGltZ3MsXG4gICAgICAgIHRvdGFsUGFnZXM6IHJlcy5kYXRhLnRvdGFsUGFnZXNcbiAgICAgIH0pXG4gICAgfSwgZXJyID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgZmV0Y2hTY29yZVJlY29yZHMoaW5kZXgsIHNpemUpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgYXBpL3BlcnNvbmFsL2NlbnRlci9pbnRlZ3JhbC9saXN0P3BhZ2U9JHtpbmRleH0mc2l6ZT0ke3NpemV9YCkudGhlbihcbiAgICAgIHJlcyA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSByZXMuZGF0YTtcbiAgICAgICAgbGV0IHJlY29yZHMgPSBbXTtcbiAgICAgICAgcmVzdWx0LmNvbnRlbnQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICByZWNvcmRzLnB1c2goe1xuICAgICAgICAgICAgdGltZTogZGF0ZVV0aWwucGFyc2VEYXRlKGl0ZW0uY3JlYXRlVGltZSksXG4gICAgICAgICAgICBzY29yZTogaXRlbS5jaGFuZ2VWYWx1ZSxcbiAgICAgICAgICAgIGRlc2M6IGl0ZW0ucmVtYXJrXG4gICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICAgIHJlY29yZHMsXG4gICAgICAgICAgdG90YWxQYWdlczogcmVzdWx0LnRvdGFsUGFnZXNcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZXJyID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgdXBkYXRlSW5mbyhhdmF0YXIsIG5hbWUpIHtcbiAgICBsZXQgaW5mbyA9IHt9O1xuICAgIGlmIChhdmF0YXIpIHtcbiAgICAgIGluZm8uYXZhdGFyID0gYXZhdGFyO1xuICAgIH1cblxuICAgIGlmIChuYW1lKSB7XG4gICAgICBpbmZvLm5pY2tuYW1lID0gbmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoJy9hcGkvcGVyc29uYWwvY2VudGVyL2luZm8nLCBpbmZvKTtcbiAgfVxuXG4gIGF0dGVudGlvbihpZCwgc3RhdGUpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYGFwaS9wZXJzb25hbC9jZW50ZXIvcmVsYXRpb24vJHtpZH0vc2V0P3N0YXRlPSR7c3RhdGV9YCk7XG4gIH1cbn1cblxuY29uc3QgYXBpID0gbmV3IEFwaSgpO1xuZXhwb3J0IGRlZmF1bHQgYXBpO1xuIl19