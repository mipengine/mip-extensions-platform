/**
 * @file mip-sytown-remmend-audio 组件
 * @author
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();

    var sytownList = {

        init: function (element) {
            this.el = element;
            this.ids = this.el.getAttribute('audio-id') || '';
            this.DOMAIN = 'https://api.sytown.cn';
            this.ALINK = location.protocol + '//' + location.hostname + ':' + location.port + location.pathname;
            if (!this.ids) {
                return;
            }

            this.getList();
        },

        getList: function () {
            var that = this;
            var urls = this.DOMAIN + '/sytown_service/DoctorAroundService/Api';
            var data = '{"_type":"getlist","_datatype":"",'
            + '"_dataid":"Select_AudioByCorrelation","_timestamp":1522118544,'
            + '"_source":"weixin","_platform":"h5","_equipment":"","_version":"",'
            + '"_userid":"","_param":{"audioId":"' + this.ids + '"},'
            + '"_sign":"d7efac0b2ea6b8025de58a686f6159b0","dataType":"json"}';
            $.ajax({
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                url: urls,
                data: data,
                success: function (res) {
                    that.render(res.data.audioList);
                }
            });
        },

        createHtml: function (res) {
            var remmendList = res || [];
            if (remmendList.length <= 0) {
                return;
            }

            var str = '';
            for (var i = 0, len = remmendList.length; i < len; i++) {
                str += '<a class="list-item" href=' + this.ALINK + '?id=' + remmendList[i].audioId + '>'
                        + '<h6 class="title">' + remmendList[i].audioName + '</h6>'
                        + '<div class="doctor-info">'
                            + '<span>' + remmendList[i].doctorName + '</span>'
                            + '<span>' + remmendList[i].jobName + '</span>'
                            + '<span>' + remmendList[i].departments + '</span>'
                            + '<span>' + remmendList[i].hospitalName + '</span>'
                        + '</div>'
                        + '<div class="sytown-flex flex-align audio-group">'
                            + '<div class="flex-none audio-control" audio-control>'
                                + '<img class="head-img" src="' + remmendList[i].doctorAvatar + '" alt="" />'
                                + '<div class="sytown-flex flex-align audio-player" audio-player>'
                                    + '<audio src="' + remmendList[i].sourcePath + '"></audio>'
                                    + '<span class="audio-btn-img flex-none"></span>'
                                    + '<span class="duration flex-1">--:--</span>'
                                    + '<span class="audio-btn flex-none pause">点击播放</span>'
                                    + '<span class="audio-btn flex-none playing">停止播放</span>'
                                + '</div>'
                            + '</div>'
                            + '<div class="flex-1 audio-info">'
                                + '<span class="type">音频</span>'
                                + '<span class="headset">' + remmendList[i].listenFrequency + '</span>'
                            + '</div>'
                        + '</div>'
                    + '</a>';
            }
            return str;
        },

        render: function (res) {
            var str = this.createHtml(res);
            if (!str || str.length <= 0) {
                return;
            }

            var parentDom = '<section class="list-panel">'
                            + '<h5 class="sytown-flex flex-align panel-title">推荐</h5>'
                                + '<div class="panel-body">'
                                    + str
                                + '</div>'
                            + '</section>';
            this.el.innerHTML = parentDom;
            this.audioControl();
        },

        secToTime: function (s) {
            var t;
            if (s > -1) {
                var hour = Math.floor(s / 3600);
                var min = Math.floor(s / 60) % 60;
                var sec = s % 60;
                t = (hour < 10) ? '0' + hour + ':' : hour + ':';
                if (min < 10) {
                    t += '0';
                }
                t += min + ':';
                if (sec < 10) {
                    t += '0';
                }
                t += sec;
            }
            return t;
        },

        audioControl: function () {
            var that = this;
            var $body = $('body');
            var audioCont = $('[audio-control]');
            var audioDom = audioCont.find('audio');
            var allAudio = $body.find('audio');
            audioCont.on('click', '[audio-player]', function (e) {
                e.preventDefault();
                var currentDom = $(this);
                var audioPlay = currentDom.find('audio')[0];
                if (audioPlay.paused) {
                    for (var i = 0, len = allAudio.length; i < len; i++) {
                        if (allAudio[i] === audioPlay && allAudio[i].paused) {
                            continue;
                        }
						else {
                            allAudio[i].pause();
                        }
                    }
                    audioPlay.play();
                }
				else {
                    currentDom.removeClass('play');
                    audioPlay.pause();
                }
            });

            $.each(audioDom, function (index, item) {
                item.addEventListener('loadedmetadata', function () {
                    var endTimer = (this.duration) ? that.secToTime(parseInt(this.duration, 0)) : '00:00';
                    $(this).parent().find('.duration').text(endTimer);
                }, false);
                item.addEventListener('playing', function () {
                    $(this).parent().addClass('play');
                }, false);
                item.addEventListener('pause', function () {
                    $(this).parent().removeClass('play');
                }, false);
                item.addEventListener('ended', function () {
                    $(this).parent().removeClass('play');
                }, false);
                item.addEventListener('error', function () {
                    $(this).parent().removeClass('play');
                }, false);
            });
        }
    };

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;
        sytownList.init(element);
    };

    return customElement;
});
