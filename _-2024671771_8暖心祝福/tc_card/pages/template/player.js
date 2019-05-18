var app = getApp(), playaudio = wx.createInnerAudioContext();

function play_music(a) {
    var i = a, u = i.data.cardInfo.music, s = i.data.usercard.voice;
    0 < s.length ? playaudio.src = i.data.imgurl + s : playaudio.src = u, playaudio.autoplay = !0, 
    playaudio.play(), playaudio.onPlay(function() {
        console.log("开始播放");
    }), playaudio.onEnded(function() {
        playaudio.src = u, playaudio.play();
    }), i.setData({
        musicimg: "../../resource/images/music.png"
    });
}

function playmusiced(a) {
    var i = a;
    playaudio.paused ? (playaudio.pause(), i.setData({
        musicimg: "../../resource/images/musicoff.png"
    })) : (playaudio.play(), i.setData({
        musicimg: "../../resource/images/music.png"
    }));
}

function palystate(a) {
    var i = a;
    playaudio.paused || (playaudio.play(), i.setData({
        musicimg: "../../resource/images/music.png"
    }));
}

function playstop(a) {
    var i = a;
    playaudio.destroy(), i.setData({
        musicimg: "../../resource/images/musicoff.png"
    });
}

module.exports = {
    play_music: play_music,
    playmusiced: playmusiced,
    playstop: playstop,
    palystate: palystate
};