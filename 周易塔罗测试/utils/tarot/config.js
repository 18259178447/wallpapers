Object.defineProperty(exports, "__esModule", {
    value: !0
});

var p = "https://toolapi.d1xz.net";

exports.config = {
    debug: !1,
    wxAppid: "wx1cbc7627b4b9f272",
    phpBusiness: "",
    phpAppid: 21,
    phpToken: "JjLmXXYsreZJdDdLBxEB6J92pH7ViopQ",
    phpPayChannel: ""
}, exports.apiUrl = {
    userLogin: p + "/v1/pass.login/wxapp.html",
    userRefresh: p + "/v1/pass.token/refresh.html",
    taluopai: p + "/v2/taluopai/index.html"
};

exports.default = "出错了：config.js没有默认对外函数、变量...";