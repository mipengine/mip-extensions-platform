/**
 * @file ZOL私有业务--评论模块
 * @author  mulianju
 * @time  2017-12-01 16:46:50
 * @version 1.0.0
 */
define(function (require, exports, module) {
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var customElement = require('customElement').create();

    var AskAudio = function (element, options) {
        var me = this;
        me.options = util.fn.extend({}, options);
        me.element = element;
        me.getAudios();
    };
    AskAudio.prototype = {
        getAudios: function () {
            var me = this;
            var btn = me.element.querySelector('.mip-ask-audio-btn');
            var status = me.element.querySelector('.mip-ask-audio-btn span');
            var link = me.element.querySelector('.mip-ask-audio-link');
            btn.onclick = me.click.bind(me);
            if (me.element.dataset.data) {
                var data = JSON.parse(document.querySelector('.autio-list__audio-detail').dataset.data);
                me.audios = data.reply_link;
                me.totalTime = parseFloat(data.audio_time);
                link.removeAttribute('href');
                return;
            }
            fetchJsonp(makeUrl('//lgl.ask.test.m.zol.com.cn/ask/do/is_study/', me.options), {}).then(function (res) {
                return res.json();
            }).then(function (request) {
                if (parseInt(request.state, 10) === 1) {
                    link.removeAttribute('href');
                    me.totalTime = parseFloat(request.data.audio_time);
                    me.audios = request.data.reply_link;
                    status.innerHTML = '\u70b9\u51fb\u64ad\u653e';
                }
            });
        },
        click: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var me = this;
            var btn = me.element.querySelector('.mip-ask-audio-btn');
            var status = me.element.querySelector('.mip-ask-audio-btn span');
            var link = me.element.querySelector('.mip-ask-audio-link');

            if (!me.audios) {
                return;
            }
            if (link.classList.contains('play')) {
                me.pause();
            } else {
                status._text = status.innerText;
                status.innerHTML = '\u7b54\u6848\u52a0\u8f7d\u4e2d\u002e\u002e\u002e';
                btn.classList.add('loading');
                me.play();
            }
        },
        play: function () {
            var me = this;
            var playProgress = me.element.querySelector('.progress');
            var link = me.element.querySelector('.mip-ask-audio-link');
            var em = me.element.querySelector('em');
            var btn = me.element.querySelector('.mip-ask-audio-btn');
            var status = me.element.querySelector('.mip-ask-audio-btn span');
            link.classList.add('play');

            var audioElement = me.element.querySelector('audio');

            if (!audioElement) {
                audioElement = document.createElement('audio');
                me.element.appendChild(audioElement);
                audioElement.style.display = 'none';
            }

            audioElement.onplay = function () {
                btn.classList.remove('loading');
                status.innerHTML = '\u70b9\u51fb\u6682\u505c';
            };

            // 播放第一段 音频
            if (typeof me.nowIndex === 'undefined') {
                me.nowIndex = 0;
                audioElement.src = me.audios[me.nowIndex].url;
            }
            if (me.ended) {
                me.ended = false;
                me.nowIndex = 0;
                audioElement.src = me.audios[me.nowIndex].url;
            }

            if (!playProgress) {
                playProgress = document.createElement('i');
                playProgress.classList.add('progress');
                em.appendChild(playProgress);
            }

            me.playTimer = setInterval(function () {
                me.currentTime = audioElement.currentTime;
                if (me.nowIndex > 0) {
                    var temp = 0;
                    for (var index = me.nowIndex - 1; index >= 0; index--) {
                        temp += parseFloat(me.audios[index].time);
                    }
                    me.currentTime = audioElement.currentTime + temp;
                }
                playProgress.style.width = me.currentTime / me.totalTime * 100 + '%';
            }, 500);

            audioElement.onended = function () {
                // 播放完成判断是否有下一段
                // 有下一段播放下一段
                if (me.audios[me.nowIndex + 1]) {
                    me.nowIndex++;
                    me.play();
                } else {
                    me.ended = true;
                    me.pause();
                    status.innerHTML = status._text;
                }
            };

            // 进度时间要加上前一段音频的总时间

            audioElement.play();

        },
        pause: function () {
            var me = this;
            var link = me.element.querySelector('.mip-ask-audio-link');
            var status = me.element.querySelector('.mip-ask-audio-btn span');
            var audioElement = me.element.querySelector('audio');

            link.classList.remove('play');
            clearInterval(me.playTimer);

            status.innerHTML = '\u70b9\u51fb\u64ad\u653e';
            audioElement.pause();
        }
    };

    function makeUrl(url, data) {
        var str = url.indexOf('?') > 0 ? '&' : '?';

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (str.length > 1) {
                    str += '&';
                }
                str += key + '=' + data[key];
            }
        }
        return url + str;
    }

    customElement.prototype.firstInviewCallback = function () {
        var me = this;
        var element = this.element;
        var options = util.fn.extend({}, element.dataset);

        var button = element.querySelector('.mip-ask-audio-btn');
        var link = element.querySelector('.mip-ask-audio-link');

        if (button && link) {
            var data = util.fn.extend({}, link.dataset);

            if (!element.askAudios) {
                element.askAudios = new AskAudio(element, options);
            }
        }
    };
    return customElement;
});
