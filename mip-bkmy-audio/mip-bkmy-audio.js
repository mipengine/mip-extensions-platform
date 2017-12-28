/**
 * @file mip-bkmy-audio 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        $('.aud').click(function () {
                var id = $(this).attr('id');
                if (id) {
                    var idNum = id.split('_');
                    if (idNum[0].indexOf('audioDiv') >= 0) {
                        for (var i = 0; i < 5; i++) {
                            if (i.indexOf(idNum[1]) >= 0) {
                                var audio = document.getElementById('audiomip_' + i);
                                if (audio.paused) {
                                    audio.play();
                                    $('#play_' + i).text('点击暂停');
                                    $('#audio_icon_' + i).addClass('playing');
                                } else {
                                    audio.pause();
                                    $('#play_' + i).text('点击播放');
                                    $('#audio_icon_' + i).css('background', 'url(http://m.baikemy.com/images2.0/audio.jpg) no-repeat left -39px;background-size: 13px 52px;');
                                    $('#audio_icon_' + i).removeClass('playing');
                                }
                                audio.onended = function () {
                                    for (var j = 0; j < 5; j++) {
                                        $('#play_' + j).text('点击播放');
                                        $('#audio_icon_' + j).css('background', 'url(http://m.baikemy.com/images2.0/audio.jpg) no-repeat left -39px;background-size: 13px 52px;');
                                        $('#audio_icon_' + j).removeClass('playing');
                                    }
                                };
                            }
                        }
                    }
                }
            });
    };
    return customElement;
});
