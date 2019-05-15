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
   * 获取首页t推荐
   */    _createClass(Api, [ {
        key: "fetchRecommends",
        value: function fetchRecommends() {
            return this.http.get("api/home/page/recommend", {}).then(function(res) {
                var result = res.data;
                var daySigns = [];
                var today = [];
                var topics = [];
                var downloads = [];
                var newImgs = [];
                var recommends = [];
                if (result.choice) {
                    result.choice.wallpapers.forEach(function(item) {
                        today.push({
                            id: item.id,
                            url: item.url
                        });
                    });
                }
                if (result.daySigns) {
                    result.daySigns.forEach(function(item) {
                        var date = new Date(item.showTime.split(" ")[0]);
                        var day = date.getDate();
                        var month = _date2.default.month[date.getMonth()];
                        daySigns.push({
                            id: item.id,
                            author: item.author,
                            content: item.content,
                            day: day > 9 ? day : "0" + day,
                            month: month,
                            year: date.getFullYear(),
                            url: item.wallpaper.image.url
                        });
                    });
                }
                if (result.specialTopics) {
                    result.specialTopics.forEach(function(item) {
                        topics.push({
                            id: item.id,
                            url: item.imageUrl
                        });
                    });
                }
                if (result.rwallpapers) {
                    result.rwallpapers.forEach(function(item) {
                        recommends.push({
                            id: item.id,
                            url: item.url
                        });
                    });
                }
                if (result.nwallpapers) {
                    result.nwallpapers.forEach(function(item) {
                        newImgs.push({
                            id: item.id,
                            url: item.url
                        });
                    });
                }
                if (result.dwallpapers) {
                    result.dwallpapers.forEach(function(item) {
                        downloads.push({
                            id: item.id,
                            url: item.url
                        });
                    });
                }
                return Promise.resolve({
                    daySigns: daySigns,
                    today: today,
                    topics: topics,
                    downloads: downloads,
                    newImgs: newImgs,
                    recommends: recommends
                });
            }, function(err) {
                return Promise.reject(err);
            });
        }
        /**
     * 首页发现
     */    }, {
        key: "fetchDiscovery",
        value: function fetchDiscovery() {
            return this.http.get("api/home/page/discover", {}).then(function(res) {
                var result = res.data;
                var categories = [];
                var likes = [];
                result.classifyList.forEach(function(item) {
                    var imgs = [];
                    item.wallpapers.forEach(function(img) {
                        imgs.push({
                            id: img.id,
                            url: img.url
                        });
                    });
                    categories.push({
                        id: item.id,
                        name: item.name,
                        images: imgs
                    });
                });
                if (result.relationList) {
                    result.relationList.forEach(function(item) {
                        if (item.wallpaper) {
                            likes.push({
                                avatar: item.avatar || "/assets/imgs/logo.png",
                                author: item.nickname || "纸友",
                                authorId: item.followedCustomerId,
                                url: item.wallpaper.url,
                                id: item.wallpaper.id
                            });
                        }
                    });
                }
                return Promise.resolve({
                    categories: categories,
                    likes: likes
                });
            }, function(err) {
                return Promise.reject(err);
            });
        }
    }, {
        key: "search",
        value: function search(code) {
            return this.http.get("api/home/page/search/" + code, {}).then(function(res) {
                var result = res.data;
                return Promise.resolve(result ? {
                    id: result.id,
                    url: result.url
                } : null);
            }, function(err) {
                return Promise.reject(err);
            });
        }
    }, {
        key: "fetchWallpaper",
        value: function fetchWallpaper(id) {
            return this.http.get("api/wallpaper?id=" + id, {}).then(function(res) {
                var result = res.data;
                var picture = {
                    id: result.id,
                    code: result.code,
                    url: result.image.url,
                    size: result.image.width + "X" + result.image.height,
                    isBig: result.image.width > 2560 || result.image.height > 2560,
                    mem: (result.image.size / 1024 / 1024).toFixed(2) + "MB",
                    type: result.source === "reprint" ? "转载" : "原创",
                    author: result.source === "reprint" ? result.sourceRemark || "纸友分享" : result.customer.nickname || "纸友",
                    zanNum: result.likeNum,
                    zan: result.like,
                    collected: result.collection,
                    commentNum: result.talkNum
                };
                var author = {
                    id: result.customer.id,
                    avatar: result.customer.avatar || "/assets/imgs/logo.png",
                    name: result.customer.nickname || "纸友",
                    timeStr: _date2.default.parseDate(result.createTime),
                    payUrl: result.customer.rewardCode
                };
                return Promise.resolve({
                    picture: picture,
                    author: author
                });
            }, function(err) {
                return Promise.reject(err);
            });
        }
        /**
     * 获取评论
     * @param {*} id  
     * @param {*} type  类型topic, wallpaper
     * @param {*} index 
     * @param {*} size 
     * @param {*} userId 
     */    }, {
        key: "fetchComments",
        value: function fetchComments(id, type, index, size, userId) {
            return this.http.get("api/talk/" + type + "/" + id + "/list?page=" + index + "&size=" + size, {}).then(function(res) {
                var comments = [];
                res.data.content.forEach(function(item) {
                    // console.log(item.customerId, userId);
                    comments.push({
                        id: item.id,
                        isSelf: item.customerId === userId,
                        author: item.nickname || "纸友",
                        content: item.content,
                        avatar: item.avatar || "/assets/imgs/logo.png"
                    });
                });
                return Promise.resolve({
                    comments: comments,
                    totalItem: res.data.totalElements,
                    totalPages: res.data.totalPages
                });
            }, function(err) {
                return Promise.reject(err);
            });
        }
        /**
     * 删除评论
     * @param {Number} id 
     */    }, {
        key: "deleteComment",
        value: function deleteComment(id) {
            return this.http.delete("api/talk/" + id);
        }
        /**
     * 评论
     * @param {String} type wallpaper topic
     * @param {*} id 
     * @param {*} content 内容
     */    }, {
        key: "comment",
        value: function comment(type, id, content) {
            return this.http.post("api/talk/" + type + "/" + id, content);
        }
        /**
     * 收藏/取消收藏
     * @param {Number} id 
     * @param {Boolean} collected 
     */    }, {
        key: "collection",
        value: function collection(id, collected) {
            return this.http.put("api/wallpaper/" + id + "/collection?isCollection=" + collected);
        }
        /**
     * 点赞/取消点赞
     * @param {Number} id 
     * @param {Boolean} zan 
     */    }, {
        key: "zan",
        value: function zan(id, _zan) {
            return this.http.put("api/wallpaper/" + id + "/like?isLike=" + _zan);
        }
        /**
     * 
     * @param {下载} id 
     * @param {*} type 类型：original, 2k
     * @param {*} radio 宽高比 
     */    }, {
        key: "download",
        value: function download(id, type, radio) {
            return this.http.get("api/wallpaper/" + id + "/download?type=" + type + "&cropScale=" + radio.toFixed(4)).then(function(res) {
                return Promise.resolve(res.data);
            }, function(err) {
                return Promise.reject(err);
            });
        }
        /**
     * 获取壁纸列表
     * @param {*} type 类型 hot random 全部不传
     * @param {*} index 
     * @param {*} size 
     */    }, {
        key: "fetchWallpaperList",
        value: function fetchWallpaperList(type, index, size) {
            var url = "api/wallpaper/list?page=" + index + "&size=" + size;
            if (type !== "all") {
                url += "&type=" + type;
            }
            return this.http.get(url, {}).then(function(res) {
                var imgs = [];
                res.data.content.forEach(function(item) {
                    imgs.push({
                        id: item.id,
                        url: item.url
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
        //根据分类获取图片
        }, {
        key: "fetchCategoryList",
        value: function fetchCategoryList(id, index, size) {
            return this.http.get("api/classify/" + id + "/wallpaper/list?page=" + index + "&size=" + size).then(function(res) {
                var imgs = [];
                res.data.content.forEach(function(item) {
                    imgs.push({
                        id: item.id,
                        url: item.url
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
        key: "fetchTopics",
        value: function fetchTopics(index, size) {
            return this.http.get("api/special/topic/list?page=" + index + "&size=" + size).then(function(res) {
                var result = res.data;
                var topics = [];
                result.content.forEach(function(item, i) {
                    topics.push({
                        id: item.id,
                        num: result.totalElements - index * size - i,
                        showImg: item.imageUrl,
                        title: item.title,
                        time: _date2.default.parseDate(item.showTime)
                    });
                });
                return Promise.resolve({
                    topics: topics,
                    totalPages: result.totalPages
                });
            }, function(err) {
                return Promise.reject(err);
            });
        }
    }, {
        key: "fetchTopicById",
        value: function fetchTopicById(id) {
            return this.http.get("api/special/topic/" + id).then(function(res) {
                var data = res.data;
                var topic = {
                    title: data.title,
                    content: data.content,
                    time: _date2.default.parseDate(data.showTime),
                    showImg: data.coverImage.url,
                    commentNum: data.talkNum,
                    viewNum: data.browseNum
                };
                var imgs = [];
                data.wallpapers.forEach(function(item, i) {
                    var url = item.url;
                    if (i === 0) {
                        url = url.replace(/jpg\/w\/650/, "jpg/w/1500");
                    }
                    imgs.push({
                        id: item.id,
                        url: url
                    });
                });
                return Promise.resolve({
                    topic: topic,
                    imgs: imgs
                });
            }, function(err) {
                return Promise.reject(err);
            });
        }
    }, {
        key: "fetchDaySigns",
        value: function fetchDaySigns(page, size) {
            return this.http.get("api/day/sign/list?page=" + page + "&size=" + size).then(function(res) {
                var data = res.data;
                var imgs = [];
                data.content.forEach(function(item) {
                    var date = new Date(item.showTime.split(" ")[0]);
                    var day = date.getDate();
                    var month = _date2.default.month[date.getMonth()];
                    imgs.push({
                        id: item.id,
                        day: day,
                        month: month,
                        year: date.getFullYear(),
                        url: item.wallpaper.url,
                        content: item.content,
                        author: item.author
                    });
                });
                return Promise.resolve({
                    totalPages: data.totalPages,
                    imgs: imgs
                });
            }, function(error) {
                return Promise.reject(err);
            });
        }
    } ]);
    return Api;
}();

var api = new Api();

exports.default = api;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhbGxwYXBlci1hcGkuanMiXSwibmFtZXMiOlsiQXBpIiwiaHR0cCIsIkh0dHAiLCJnZXQiLCJ0aGVuIiwicmVzdWx0IiwicmVzIiwiZGF0YSIsImRheVNpZ25zIiwidG9kYXkiLCJ0b3BpY3MiLCJkb3dubG9hZHMiLCJuZXdJbWdzIiwicmVjb21tZW5kcyIsImNob2ljZSIsIndhbGxwYXBlcnMiLCJmb3JFYWNoIiwicHVzaCIsImlkIiwiaXRlbSIsInVybCIsImRhdGUiLCJEYXRlIiwic2hvd1RpbWUiLCJzcGxpdCIsImRheSIsImdldERhdGUiLCJtb250aCIsImRhdGVVdGlsIiwiZ2V0TW9udGgiLCJhdXRob3IiLCJjb250ZW50IiwieWVhciIsImdldEZ1bGxZZWFyIiwid2FsbHBhcGVyIiwiaW1hZ2UiLCJzcGVjaWFsVG9waWNzIiwiaW1hZ2VVcmwiLCJyd2FsbHBhcGVycyIsIm53YWxscGFwZXJzIiwiZHdhbGxwYXBlcnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImVyciIsImNhdGVnb3JpZXMiLCJsaWtlcyIsImNsYXNzaWZ5TGlzdCIsImltZ3MiLCJpbWciLCJuYW1lIiwiaW1hZ2VzIiwicmVsYXRpb25MaXN0IiwiYXZhdGFyIiwibmlja25hbWUiLCJhdXRob3JJZCIsImZvbGxvd2VkQ3VzdG9tZXJJZCIsImNvZGUiLCJwaWN0dXJlIiwic2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiaXNCaWciLCJtZW0iLCJ0b0ZpeGVkIiwidHlwZSIsInNvdXJjZSIsInNvdXJjZVJlbWFyayIsImN1c3RvbWVyIiwiemFuTnVtIiwibGlrZU51bSIsInphbiIsImxpa2UiLCJjb2xsZWN0ZWQiLCJjb2xsZWN0aW9uIiwiY29tbWVudE51bSIsInRhbGtOdW0iLCJ0aW1lU3RyIiwicGFyc2VEYXRlIiwiY3JlYXRlVGltZSIsInBheVVybCIsInJld2FyZENvZGUiLCJpbmRleCIsInVzZXJJZCIsImNvbW1lbnRzIiwiaXNTZWxmIiwiY3VzdG9tZXJJZCIsInRvdGFsSXRlbSIsInRvdGFsRWxlbWVudHMiLCJ0b3RhbFBhZ2VzIiwiZGVsZXRlIiwicG9zdCIsInB1dCIsInJhZGlvIiwiaSIsIm51bSIsInNob3dJbWciLCJ0aXRsZSIsInRpbWUiLCJ0b3BpYyIsImNvdmVySW1hZ2UiLCJ2aWV3TnVtIiwiYnJvd3NlTnVtIiwicmVwbGFjZSIsInBhZ2UiLCJhcGkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7SUFDTUEsRztBQUVKLGlCQUFjO0FBQUE7O0FBQ1osU0FBS0MsSUFBTCxHQUFZLElBQUlDLGNBQUosRUFBWjtBQUNEOztBQUVEOzs7Ozs7O3NDQUdrQjtBQUNoQixhQUFPLEtBQUtELElBQUwsQ0FBVUUsR0FBVixDQUFjLHlCQUFkLEVBQXlDLEVBQXpDLEVBQTZDQyxJQUE3QyxDQUFrRCxlQUFPO0FBQzlELFlBQUlDLFNBQVNDLElBQUlDLElBQWpCO0FBQ0EsWUFBSUMsV0FBVyxFQUFmO0FBQ0EsWUFBSUMsUUFBUSxFQUFaO0FBQ0EsWUFBSUMsU0FBUyxFQUFiO0FBQ0EsWUFBSUMsWUFBWSxFQUFoQjtBQUNBLFlBQUlDLFVBQVUsRUFBZDtBQUNBLFlBQUlDLGFBQWEsRUFBakI7QUFDQSxZQUFJUixPQUFPUyxNQUFYLEVBQW1CO0FBQ2pCVCxpQkFBT1MsTUFBUCxDQUFjQyxVQUFkLENBQXlCQyxPQUF6QixDQUFpQyxnQkFBUTtBQUN2Q1Asa0JBQU1RLElBQU4sQ0FBVztBQUNUQyxrQkFBSUMsS0FBS0QsRUFEQTtBQUVURSxtQkFBS0QsS0FBS0M7QUFGRCxhQUFYO0FBSUQsV0FMRDtBQU1EO0FBQ0QsWUFBSWYsT0FBT0csUUFBWCxFQUFxQjtBQUNuQkgsaUJBQU9HLFFBQVAsQ0FBZ0JRLE9BQWhCLENBQXdCLGdCQUFRO0FBQzlCLGdCQUFJSyxPQUFPLElBQUlDLElBQUosQ0FBU0gsS0FBS0ksUUFBTCxDQUFjQyxLQUFkLENBQW9CLEdBQXBCLEVBQXlCLENBQXpCLENBQVQsQ0FBWDtBQUNBLGdCQUFJQyxNQUFNSixLQUFLSyxPQUFM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QVNaLEtBQUtZLE9BTk47QUFPUkQsb0JBQVFYLEtBQUtXO0FBUEwsV0FBVjtBQVNELFNBYkQ7QUFjQSxlQUFPVyxRQUFRQyxPQUFSLENBQWdCO0FBQ3JCK0Msc0JBQVlsRixLQUFLa0YsVUFESTtBQUVyQnpDLGdCQUFNQTtBQUZlLFNBQWhCLENBQVA7QUFJRCxPQXJCTSxFQXFCSixpQkFBUztBQUNWLGVBQU9QLFFBQVFFLE1BQVIsQ0FBZUMsR0FBZixDQUFQO0FBQ0QsT0F2Qk0sQ0FBUDtBQXdCRDs7Ozs7O0FBR0gsSUFBTTZELE1BQU0sSUFBSXpHLEdBQUosRUFBWjtrQkFDZXlHLEciLCJmaWxlIjoid2FsbHBhcGVyLWFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIdHRwIGZyb20gJy4uL3V0aWxzL2h0dHAnO1xuaW1wb3J0IGRhdGVVdGlsIGZyb20gJy4uL3V0aWxzL2RhdGUnO1xuY2xhc3MgQXBpIHtcbiAgaHR0cDtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5odHRwID0gbmV3IEh0dHAoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDojrflj5bpppbpobV05o6o6I2QXG4gICAqL1xuICBmZXRjaFJlY29tbWVuZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ2FwaS9ob21lL3BhZ2UvcmVjb21tZW5kJywge30pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSByZXMuZGF0YTtcbiAgICAgIGxldCBkYXlTaWducyA9IFtdO1xuICAgICAgbGV0IHRvZGF5ID0gW107XG4gICAgICBsZXQgdG9waWNzID0gW107XG4gICAgICBsZXQgZG93bmxvYWRzID0gW107XG4gICAgICBsZXQgbmV3SW1ncyA9IFtdO1xuICAgICAgbGV0IHJlY29tbWVuZHMgPSBbXTtcbiAgICAgIGlmIChyZXN1bHQuY2hvaWNlKSB7XG4gICAgICAgIHJlc3VsdC5jaG9pY2Uud2FsbHBhcGVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIHRvZGF5LnB1c2goe1xuICAgICAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgICB1cmw6IGl0ZW0udXJsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdC5kYXlTaWducykge1xuICAgICAgICByZXN1bHQuZGF5U2lnbnMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGl0ZW0uc2hvd1RpbWUuc3BsaXQoJyAnKVswXSk7XG4gICAgICAgICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICAgIGxldCBtb250aCA9IGRhdGVVdGlsLm1vbnRoW2RhdGUuZ2V0TW9udGgoKV07XG4gICAgICAgICAgZGF5U2lnbnMucHVzaCh7XG4gICAgICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgICAgIGF1dGhvcjogaXRlbS5hdXRob3IsXG4gICAgICAgICAgICBjb250ZW50OiBpdGVtLmNvbnRlbnQsXG4gICAgICAgICAgICBkYXk6IGRheSA+IDkgPyBkYXkgOiBgMCR7ZGF5fWAsXG4gICAgICAgICAgICBtb250aDogbW9udGgsXG4gICAgICAgICAgICB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICB1cmw6IGl0ZW0ud2FsbHBhcGVyLmltYWdlLnVybFxuICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdC5zcGVjaWFsVG9waWNzKSB7XG4gICAgICAgIHJlc3VsdC5zcGVjaWFsVG9waWNzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgdG9waWNzLnB1c2goe1xuICAgICAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgICB1cmw6IGl0ZW0uaW1hZ2VVcmxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0LnJ3YWxscGFwZXJzKSB7XG4gICAgICAgIHJlc3VsdC5yd2FsbHBhcGVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIHJlY29tbWVuZHMucHVzaCh7XG4gICAgICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgICAgIHVybDogaXRlbS51cmxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0Lm53YWxscGFwZXJzKSB7XG4gICAgICAgIHJlc3VsdC5ud2FsbHBhcGVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIG5ld0ltZ3MucHVzaCh7XG4gICAgICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgICAgIHVybDogaXRlbS51cmxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0LmR3YWxscGFwZXJzKSB7XG4gICAgICAgIHJlc3VsdC5kd2FsbHBhcGVycy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGRvd25sb2Fkcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICAgICAgdXJsOiBpdGVtLnVybFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICBkYXlTaWducyxcbiAgICAgICAgdG9kYXksXG4gICAgICAgIHRvcGljcyxcbiAgICAgICAgZG93bmxvYWRzLFxuICAgICAgICBuZXdJbWdzLFxuICAgICAgICByZWNvbW1lbmRzXG4gICAgICB9KTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfSk7XG4gIH1cbiAgLyoqXG4gICAqIOmmlumhteWPkeeOsFxuICAgKi9cbiAgZmV0Y2hEaXNjb3ZlcnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ2FwaS9ob21lL3BhZ2UvZGlzY292ZXInLCB7fSkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IHJlc3VsdCA9IHJlcy5kYXRhO1xuICAgICAgbGV0IGNhdGVnb3JpZXMgPSBbXTtcbiAgICAgIGxldCBsaWtlcyA9IFtdO1xuICAgICAgcmVzdWx0LmNsYXNzaWZ5TGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBsZXQgaW1ncyA9IFtdO1xuICAgICAgICBpdGVtLndhbGxwYXBlcnMuZm9yRWFjaChpbWcgPT4ge1xuICAgICAgICAgIGltZ3MucHVzaCh7XG4gICAgICAgICAgICBpZDogaW1nLmlkLFxuICAgICAgICAgICAgdXJsOiBpbWcudXJsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjYXRlZ29yaWVzLnB1c2goe1xuICAgICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgICBpbWFnZXM6IGltZ3NcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHJlc3VsdC5yZWxhdGlvbkxpc3QpIHtcbiAgICAgICAgcmVzdWx0LnJlbGF0aW9uTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmIChpdGVtLndhbGxwYXBlcikge1xuICAgICAgICAgICAgbGlrZXMucHVzaCh7XG4gICAgICAgICAgICAgIGF2YXRhcjogaXRlbS5hdmF0YXIgfHwgJy9hc3NldHMvaW1ncy9sb2dvLnBuZycsXG4gICAgICAgICAgICAgIGF1dGhvcjogaXRlbS5uaWNrbmFtZSB8fCAn57q45Y+LJyxcbiAgICAgICAgICAgICAgYXV0aG9ySWQ6IGl0ZW0uZm9sbG93ZWRDdXN0b21lcklkLFxuICAgICAgICAgICAgICB1cmw6IGl0ZW0ud2FsbHBhcGVyLnVybCxcbiAgICAgICAgICAgICAgaWQ6IGl0ZW0ud2FsbHBhcGVyLmlkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgIGNhdGVnb3JpZXMsXG4gICAgICAgIGxpa2VzXG4gICAgICB9KTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfSk7XG4gIH1cblxuICBzZWFyY2goY29kZSkge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGBhcGkvaG9tZS9wYWdlL3NlYXJjaC8ke2NvZGV9YCwge30pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSByZXMuZGF0YTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzdWx0ID8ge1xuICAgICAgICBpZDogcmVzdWx0LmlkLFxuICAgICAgICB1cmw6IHJlc3VsdC51cmxcbiAgICAgIH0gOiBudWxsKTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfSk7XG4gIH1cblxuICBmZXRjaFdhbGxwYXBlcihpZCkge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGBhcGkvd2FsbHBhcGVyP2lkPSR7aWR9YCwge30pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSByZXMuZGF0YTtcbiAgICAgIGxldCBwaWN0dXJlID0ge1xuICAgICAgICBpZDogcmVzdWx0LmlkLFxuICAgICAgICBjb2RlOiByZXN1bHQuY29kZSxcbiAgICAgICAgdXJsOiByZXN1bHQuaW1hZ2UudXJsLFxuICAgICAgICBzaXplOiBgJHtyZXN1bHQuaW1hZ2Uud2lkdGh9WCR7cmVzdWx0LmltYWdlLmhlaWdodH1gLFxuICAgICAgICBpc0JpZzogcmVzdWx0LmltYWdlLndpZHRoID4gMjU2MCB8fCByZXN1bHQuaW1hZ2UuaGVpZ2h0ID4gMjU2MCxcbiAgICAgICAgbWVtOiAocmVzdWx0LmltYWdlLnNpemUgLyAxMDI0IC8gMTAyNCkudG9GaXhlZCgyKSArICdNQicsXG4gICAgICAgIHR5cGU6IHJlc3VsdC5zb3VyY2UgPT09ICdyZXByaW50JyA/ICfovazovb0nIDogJ+WOn+WImycsXG4gICAgICAgIGF1dGhvcjogcmVzdWx0LnNvdXJjZSA9PT0gJ3JlcHJpbnQnID8gcmVzdWx0LnNvdXJjZVJlbWFyayB8fCAn57q45Y+L5YiG5LqrJyA6IHJlc3VsdC5jdXN0b21lci5uaWNrbmFtZSB8fCAn57q45Y+LJyxcbiAgICAgICAgemFuTnVtOiByZXN1bHQubGlrZU51bSxcbiAgICAgICAgemFuOiByZXN1bHQubGlrZSxcbiAgICAgICAgY29sbGVjdGVkOiByZXN1bHQuY29sbGVjdGlvbixcbiAgICAgICAgY29tbWVudE51bTogcmVzdWx0LnRhbGtOdW1cbiAgICAgIH07XG4gICAgICBsZXQgYXV0aG9yID0ge1xuICAgICAgICBpZDogcmVzdWx0LmN1c3RvbWVyLmlkLFxuICAgICAgICBhdmF0YXI6IHJlc3VsdC5jdXN0b21lci5hdmF0YXIgfHwgJy9hc3NldHMvaW1ncy9sb2dvLnBuZycsXG4gICAgICAgIG5hbWU6IHJlc3VsdC5jdXN0b21lci5uaWNrbmFtZSB8fCAn57q45Y+LJyxcbiAgICAgICAgdGltZVN0cjogZGF0ZVV0aWwucGFyc2VEYXRlKHJlc3VsdC5jcmVhdGVUaW1lKSxcbiAgICAgICAgcGF5VXJsOiByZXN1bHQuY3VzdG9tZXIucmV3YXJkQ29kZVxuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgIHBpY3R1cmUsXG4gICAgICAgIGF1dGhvclxuICAgICAgfSk7XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluivhOiuulxuICAgKiBAcGFyYW0geyp9IGlkICBcbiAgICogQHBhcmFtIHsqfSB0eXBlICDnsbvlnot0b3BpYywgd2FsbHBhcGVyXG4gICAqIEBwYXJhbSB7Kn0gaW5kZXggXG4gICAqIEBwYXJhbSB7Kn0gc2l6ZSBcbiAgICogQHBhcmFtIHsqfSB1c2VySWQgXG4gICAqL1xuICBmZXRjaENvbW1lbnRzKGlkLCB0eXBlLCBpbmRleCwgc2l6ZSwgdXNlcklkKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYGFwaS90YWxrLyR7dHlwZX0vJHtpZH0vbGlzdD9wYWdlPSR7aW5kZXh9JnNpemU9JHtzaXplfWAsIHt9KS50aGVuKFxuICAgICAgcmVzID0+IHtcbiAgICAgICAgbGV0IGNvbW1lbnRzID0gW107XG4gICAgICAgIHJlcy5kYXRhLmNvbnRlbnQuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpdGVtLmN1c3RvbWVySWQsIHVzZXJJZCk7XG4gICAgICAgICAgY29tbWVudHMucHVzaCh7XG4gICAgICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgICAgIGlzU2VsZjogaXRlbS5jdXN0b21lcklkID09PSB1c2VySWQsXG4gICAgICAgICAgICBhdXRob3I6IGl0ZW0ubmlja25hbWUgfHwgJ+e6uOWPiycsXG4gICAgICAgICAgICBjb250ZW50OiBpdGVtLmNvbnRlbnQsXG4gICAgICAgICAgICBhdmF0YXI6IGl0ZW0uYXZhdGFyIHx8ICcvYXNzZXRzL2ltZ3MvbG9nby5wbmcnXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICBjb21tZW50cyxcbiAgICAgICAgICB0b3RhbEl0ZW06IHJlcy5kYXRhLnRvdGFsRWxlbWVudHMsXG4gICAgICAgICAgdG90YWxQYWdlczogcmVzLmRhdGEudG90YWxQYWdlc1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBlcnIgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIOWIoOmZpOivhOiuulxuICAgKiBAcGFyYW0ge051bWJlcn0gaWQgXG4gICAqL1xuICBkZWxldGVDb21tZW50KGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoYGFwaS90YWxrLyR7aWR9YCk7XG4gIH1cblxuICAvKipcbiAgICog6K+E6K66XG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIHdhbGxwYXBlciB0b3BpY1xuICAgKiBAcGFyYW0geyp9IGlkIFxuICAgKiBAcGFyYW0geyp9IGNvbnRlbnQg5YaF5a65XG4gICAqL1xuICBjb21tZW50KHR5cGUsIGlkLCBjb250ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGBhcGkvdGFsay8ke3R5cGV9LyR7aWR9YCwgY29udGVudCk7XG4gIH1cblxuICAvKipcbiAgICog5pS26JePL+WPlua2iOaUtuiXj1xuICAgKiBAcGFyYW0ge051bWJlcn0gaWQgXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gY29sbGVjdGVkIFxuICAgKi9cbiAgY29sbGVjdGlvbihpZCwgY29sbGVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYGFwaS93YWxscGFwZXIvJHtpZH0vY29sbGVjdGlvbj9pc0NvbGxlY3Rpb249JHtjb2xsZWN0ZWR9YCk7XG4gIH1cblxuICAvKipcbiAgICog54K56LWeL+WPlua2iOeCuei1nlxuICAgKiBAcGFyYW0ge051bWJlcn0gaWQgXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gemFuIFxuICAgKi9cbiAgemFuKGlkLCB6YW4pIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dChgYXBpL3dhbGxwYXBlci8ke2lkfS9saWtlP2lzTGlrZT0ke3phbn1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICogQHBhcmFtIHvkuIvovb19IGlkIFxuICAgKiBAcGFyYW0geyp9IHR5cGUg57G75Z6L77yab3JpZ2luYWwsIDJrXG4gICAqIEBwYXJhbSB7Kn0gcmFkaW8g5a696auY5q+UIFxuICAgKi9cbiAgZG93bmxvYWQoaWQsIHR5cGUsIHJhZGlvKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYGFwaS93YWxscGFwZXIvJHtpZH0vZG93bmxvYWQ/dHlwZT0ke3R5cGV9JmNyb3BTY2FsZT0ke3JhZGlvLnRvRml4ZWQoNCl9YCkudGhlbihyZXMgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMuZGF0YSk7XG4gICAgfSwgZXJyID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOiOt+WPluWjgee6uOWIl+ihqFxuICAgKiBAcGFyYW0geyp9IHR5cGUg57G75Z6LIGhvdCByYW5kb20g5YWo6YOo5LiN5LygXG4gICAqIEBwYXJhbSB7Kn0gaW5kZXggXG4gICAqIEBwYXJhbSB7Kn0gc2l6ZSBcbiAgICovXG4gIGZldGNoV2FsbHBhcGVyTGlzdCh0eXBlLCBpbmRleCwgc2l6ZSkge1xuICAgIGxldCB1cmwgPSBgYXBpL3dhbGxwYXBlci9saXN0P3BhZ2U9JHtpbmRleH0mc2l6ZT0ke3NpemV9YDtcbiAgICBpZiAodHlwZSAhPT0gJ2FsbCcpIHtcbiAgICAgIHVybCArPSBgJnR5cGU9JHt0eXBlfWA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwge30pLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCBpbWdzID0gW107XG4gICAgICByZXMuZGF0YS5jb250ZW50LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGltZ3MucHVzaCh7XG4gICAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgdXJsOiBpdGVtLnVybFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgIGltZ3M6IGltZ3MsXG4gICAgICAgIHRvdGFsUGFnZXM6IHJlcy5kYXRhLnRvdGFsUGFnZXNcbiAgICAgIH0pXG4gICAgfSwgZXJyID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgLy/moLnmja7liIbnsbvojrflj5blm77niYdcbiAgZmV0Y2hDYXRlZ29yeUxpc3QoaWQsIGluZGV4LCBzaXplKSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYGFwaS9jbGFzc2lmeS8ke2lkfS93YWxscGFwZXIvbGlzdD9wYWdlPSR7aW5kZXh9JnNpemU9JHtzaXplfWApLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCBpbWdzID0gW107XG4gICAgICByZXMuZGF0YS5jb250ZW50LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGltZ3MucHVzaCh7XG4gICAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgdXJsOiBpdGVtLnVybFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgIGltZ3M6IGltZ3MsXG4gICAgICAgIHRvdGFsUGFnZXM6IHJlcy5kYXRhLnRvdGFsUGFnZXNcbiAgICAgIH0pXG4gICAgfSwgZXJyID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9XG5cbiAgZmV0Y2hUb3BpY3MoaW5kZXgsIHNpemUpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgYXBpL3NwZWNpYWwvdG9waWMvbGlzdD9wYWdlPSR7aW5kZXh9JnNpemU9JHtzaXplfWApLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCByZXN1bHQgPSByZXMuZGF0YTtcbiAgICAgIGxldCB0b3BpY3MgPSBbXTtcbiAgICAgIHJlc3VsdC5jb250ZW50LmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgdG9waWNzLnB1c2goe1xuICAgICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICAgIG51bTogcmVzdWx0LnRvdGFsRWxlbWVudHMgLSBpbmRleCAqIHNpemUgLSBpLFxuICAgICAgICAgIHNob3dJbWc6IGl0ZW0uaW1hZ2VVcmwsXG4gICAgICAgICAgdGl0bGU6IGl0ZW0udGl0bGUsXG4gICAgICAgICAgdGltZTogZGF0ZVV0aWwucGFyc2VEYXRlKGl0ZW0uc2hvd1RpbWUpXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgdG9waWNzLFxuICAgICAgICB0b3RhbFBhZ2VzOiByZXN1bHQudG90YWxQYWdlc1xuICAgICAgfSlcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfSk7XG4gIH1cblxuICBmZXRjaFRvcGljQnlJZChpZCkge1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYGFwaS9zcGVjaWFsL3RvcGljLyR7aWR9YCkudGhlbihyZXMgPT4ge1xuICAgICAgbGV0IGRhdGEgPSByZXMuZGF0YTtcbiAgICAgIGxldCB0b3BpYyA9IHtcbiAgICAgICAgdGl0bGU6IGRhdGEudGl0bGUsXG4gICAgICAgIGNvbnRlbnQ6IGRhdGEuY29udGVudCxcbiAgICAgICAgdGltZTogZGF0ZVV0aWwucGFyc2VEYXRlKGRhdGEuc2hvd1RpbWUpLFxuICAgICAgICBzaG93SW1nOiBkYXRhLmNvdmVySW1hZ2UudXJsLFxuICAgICAgICBjb21tZW50TnVtOiBkYXRhLnRhbGtOdW0sXG4gICAgICAgIHZpZXdOdW06IGRhdGEuYnJvd3NlTnVtXG4gICAgICB9O1xuICAgICAgbGV0IGltZ3MgPSBbXTtcbiAgICAgIGRhdGEud2FsbHBhcGVycy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgIGxldCB1cmwgPSBpdGVtLnVybFxuICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9qcGdcXC93XFwvNjUwLywgXCJqcGcvdy8xNTAwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGltZ3MucHVzaCh7XG4gICAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7XG4gICAgICAgIHRvcGljLFxuICAgICAgICBpbWdzXG4gICAgICB9KTtcbiAgICB9LCBlcnIgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfSk7XG4gIH1cblxuICBmZXRjaERheVNpZ25zKHBhZ2UsIHNpemUpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldChgYXBpL2RheS9zaWduL2xpc3Q/cGFnZT0ke3BhZ2V9JnNpemU9JHtzaXplfWApLnRoZW4ocmVzID0+IHtcbiAgICAgIGxldCBkYXRhID0gcmVzLmRhdGE7XG4gICAgICBsZXQgaW1ncyA9IFtdO1xuICAgICAgZGF0YS5jb250ZW50LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoaXRlbS5zaG93VGltZS5zcGxpdCgnICcpWzBdKTtcbiAgICAgICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICBsZXQgbW9udGggPSBkYXRlVXRpbC5tb250aFtkYXRlLmdldE1vbnRoKCldO1xuICAgICAgICBpbWdzLnB1c2goe1xuICAgICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICAgIGRheSxcbiAgICAgICAgICBtb250aCxcbiAgICAgICAgICB5ZWFyOiBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgdXJsOiBpdGVtLndhbGxwYXBlci51cmwsXG4gICAgICAgICAgY29udGVudDogaXRlbS5jb250ZW50LFxuICAgICAgICAgIGF1dGhvcjogaXRlbS5hdXRob3JcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICB0b3RhbFBhZ2VzOiBkYXRhLnRvdGFsUGFnZXMsXG4gICAgICAgIGltZ3M6IGltZ3NcbiAgICAgIH0pO1xuICAgIH0sIGVycm9yID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9XG59XG5cbmNvbnN0IGFwaSA9IG5ldyBBcGkoKTtcbmV4cG9ydCBkZWZhdWx0IGFwaTtcbiJdfQ==