/**
 * @file 春雨医患对话 audio
 * @author 17leba@gmail.com
 * @time 2017.6.7
 */

define(function (require) {
    var util = require('util');
    var customElement = require('customElement').create();

    function Audio(options) {
        this.url = options.url;
        this.layout = options.layout;
        this.domClass = options.domClass;
    }

    Audio.prototype = {
        constructor: Audio,
        init: function () {
            var audiodom = this.createDom();
            var docfrag = document.createDocumentFragment();

            docfrag.appendChild(audiodom);
            this.layout.appendChild(docfrag);
            this.audio = this.layout.querySelector('audio');

            this.getTimelen();
            this.playAudio();
            this.endAudio();
        },
        createDom: function () {
            var html = '<div class="mip-cy-audio ' + this.domClass + '">'
                        + '<div class="mip-cy-audio-icon">'
                            + '<div class="small"></div>'
                            + '<div class="middle stopanimate"></div>'
                            + '<div class="large stopanimate"></div>'
                        + '</div>'
                        + '<audio src="' + this.url + '">'
                    + '</div>'
                    + '<span class="mip-cy-audio-seconds"><span>3</span>"</span>';

            var dom = document.createElement('div');
            dom.innerHTML = html;

            return dom;
        },
        getTimelen: function () {
            var that = this;

            this.audio.addEventListener('canplay', function () {
                that.duration = parseInt(that.audio.duration, 10);
                that.renderEleLen(that.layout, that.duration);
                that.layout.querySelector('.mip-cy-audio-seconds span').innerHTML = that.duration;
            });

            this.audio.addEventListener('timeupdate', function () {
                that.duration = parseInt(that.audio.duration, 10);
                that.renderEleLen(that.layout, that.duration);
                that.layout.querySelector('.mip-cy-audio-seconds span').innerHTML = that.duration;
            });
        },
        renderEleLen: function (target, seconds) {
            var dom = target.querySelector('.mip-cy-audio');
            if (seconds > 60) {
                // 大于60s，直接固定宽度 2.14rem
                util.css(dom, {
                    width: '2.14rem'
                });
            } else if (seconds > 30 && seconds < 60) {
                util.css(dom, {
                    width: seconds * 2.14 / 60 + 'rem'
                });
            } else {
                util.css(dom, {
                    width: seconds * 2.14 / 30 + 'rem'
                });
            }
        },
        playAudio: function () {
            var that = this;
            this.layout.querySelector('.mip-cy-audio').addEventListener('click', function () {
                if (that.audio.paused) {
                    that.audio.play();
                    that.layout.querySelector('.mip-cy-audio-icon').classList.add('animate');
                } else {
                    that.audio.pause();
                    that.layout.querySelector('.mip-cy-audio-icon').classList.remove('animate');
                }
            });
        },
        endAudio: function () {
            var that = this;
            this.audio.addEventListener('ended', function () {
                that.layout.querySelector('.mip-cy-audio-icon').classList.remove('animate');
            });
        }
    };

    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = element.getAttribute('src') || '';
        var domClass = element.getAttribute('class') || 'left';
        if (url === '') {
            return;
        }
        var newauido = new Audio({
            url: url,
            layout: element,
            domClass: domClass
        });
        newauido.init();
    };
    return customElement;
});
