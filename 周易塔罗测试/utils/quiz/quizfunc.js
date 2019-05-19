module.exports = {
    getquestion: function(e, n) {
        var t = [];
        if (e.question && (n++, t = t.concat({
            type: "text",
            domindex: n,
            content: {
                type: 1,
                text: e.question,
                domindex: n
            }
        })), e.img && (n++, t = t.concat({
            type: "img",
            domindex: n,
            content: {
                type: 3,
                src: e.img,
                domindex: n
            }
        })), e.audio && (n++, t = t.concat({
            type: "audio",
            domindex: n,
            content: {
                type: 8,
                src: e.audio,
                domindex: n
            }
        })), e.answer) if (e.merge) {
            var a = [];
            for (var i in e.answer) a.push({
                src: e.answer[i].img,
                desc: e.answer[i].title
            });
            n++, t = t.concat({
                type: 9,
                domindex: n,
                content: {
                    domindex: n,
                    type: 9,
                    srcArr: a
                }
            });
        } else {
            var r = !1;
            for (var i in e.answer) e.answer[i].img && (r = !0);
            var o = [];
            for (var i in e.answer) if (r) {
                n++;
                var s = [], d = i + ". " + e.answer[i].title;
                s = s.concat({
                    type: 1,
                    text: d,
                    domindex: n
                }), e.answer[i].img && (n++, s = s.concat({
                    type: 3,
                    src: e.answer[i].img,
                    domindex: n
                }), t = t.concat({
                    type: "img",
                    domindex: n,
                    content: s,
                    src: e.answer[i].img
                }));
            } else n++, d = i + ". " + e.answer[i].title, o = o.concat({
                type: 1,
                text: d,
                domindex: n
            });
            r || (t = t.concat({
                type: "text",
                domindex: n,
                content: o
            }));
        }
        return t;
    },
    getbtnlist: function(e, n) {
        var t = [];
        if (e.answer) for (var a in e.answer) {
            var i = e.answer[a];
            1 == n ? i.value = a.toUpperCase() : 2 == n ? i.value = i.weight : 3 == n && (i.value = i.next), 
            i.num = a, t = t.concat({
                type: 3,
                value: i.value,
                key: a
            });
        }
        return t;
    },
    getPreloadimglist: function(e) {
        var n = [];
        for (var t in e) e[t].img && (n = n.concat([ e[t].img ]));
        return n;
    },
  getNewQuestion: function (e, n, t, a, i, r) {
  
    var o = {
      type: 11,
      hasquestion: 0,
      hasimg: 0,
      hasaudio: 0,
      hasanswerimg: 0,
      domindex: ++t,
      qNum: e + 1,
      imageArr: [],
      answerArr: [],
      adbanner: 0
    };
    if (n.question && (o.hasquestion = 1, o.question = n.question), n.img && (o.hasimg = 1,
      o.img = n.img), n.audio && (o.hasaudio = 1, o.audio = n.audio), 3 == i && 1 == r && (o.adbanner = 1),
      n.answer) for (var s in n.answer) {
        n.answer[s].img && (o.hasanswerimg = 1, o.imageArr.push({
          option_image: n.answer[s].img,
          option_key: s
        }));
        var d = n.answer[s], m = s + ". " + n.answer[s].title;
        1 == a ? d = s.toUpperCase() : 2 == a ? d = d.weight : 3 == a ? d = d.next : 8 == a && (d = s.toUpperCase()),
          o.answerArr.push({
            answerdesc: m,
            value: d,
            answerindex: s,
            btnstatus: !0,
            domindex: t
          });
      }
    return o;
  }
};