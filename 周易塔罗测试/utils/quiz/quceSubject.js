function t() {
    var i;
    t.init = function(t) {
        this.allData = t, this.logo = this.allData.logo, this.questions = JSON.parse(this.allData.question), 
        this.length = this.questions.length, this.type = this.allData.type, this.resPath = "http://uploads-admin.cdn.woquhudong.cn/", 
        this.preLoadImg = [], this.preLoadAudio = [], i = this;
        for (var e = this.questions, s = 0; s < this.length; s++) {
            !e[s].img || e[s].img.indexOf("http://") > -1 || (e[s].img = this.resPath + e[s].img, 
            this.preLoadImg.push(e[s].img)), e[s].audio && (e[s].audio.indexOf("http://") > -1 || (e[s].audio = this.resPath + e[s].audio), 
            this.preLoadAudio.push(e[s].audio));
            var o = e[s].answer;
            for (var r in o) o[r].img && (o[r].img = this.resPath + o[r].img, this.preLoadImg.push(o[r].img));
        }
        this.questions = e;
    }, t.prototype.getBaseInfo = function() {
        var t = {};
        return t.title = this.allData.title, t.desc = this.allData.desc, t.id = this.allData.id, 
        t.shareImg = this.resPath + this.allData.img, t.shareUrl = this.allData.share_url, 
        this.allData.logo ? t.logo = this.resPath + this.allData.logo : t.logo = this.allData.logo, 
        t;
    }, t.prototype.getShareImg = function() {
        return this.resPath + this.allData.img;
    }, t.prototype.getQuestionNum = function() {
        return this.length;
    }, t.prototype.getNthQuestion = function(t) {
        return t >= 0 && t < this.length && this.questions[t].question;
    }, t.prototype.getNthQuestionImg = function(t) {
        return t >= 0 && t < this.length && this.questions[t].img;
    }, t.prototype.getNthQuestionAudio = function(t) {
        return t >= 0 && t < this.length && this.questions[t].audio;
    }, t.prototype.getNthQuestionOpt = function(t, i) {
        return t >= 0 && t < this.length && (i ? this.questions[t].answer[i] : this.questions[t].answer);
    }, t.prototype.getCommonResult = function(t) {
        for (var i = this.result, e = 0; e < i.length; e++) if (i[e].threshold == t) return i[e];
        return !1;
    }, t.prototype.getMultipleResult = function(t) {
        for (var i = this.result, e = 0; e < i.length; e++) if (t >= i[e].threshold) return i[e];
        return !1;
    }, t.prototype.getRightAnswer = function(t) {
        if (!("2" == this.type)) return !1;
        if (t) {
            o = this.getNthQuestionOpt(t);
            return r = getRightAnswer(o);
        }
        var i = [], e = this.questions;
        for (var s in e) {
            var o = e[s].answer, r = getRightAnswer(o);
            i[s] = [], i[s].title = e[s].question, i[s].id = r, i[s].text = e[s].answer[r].title;
        }
        return i;
    }, t.prototype.getRightAnswer = function(t) {
        var i, e = 0;
        for (var s in t) {
            var o = t[s].weight;
            o >= e && (e = o, i = s);
        }
        return i;
    };
}

module.exports = {
    quceSubject: t
};