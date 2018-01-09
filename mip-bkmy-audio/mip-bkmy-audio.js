/**
 * @file mip-bkmy-audio 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.firstInviewCallback = function () {
        var $ = require('jquery');
        $('.aud').click(function () {
                var ids = $(this).attr('id');
                if (ids) {
                    var idNum = ids.split('_');
                    if (idNum[0] === 'audioDiv') {
                        for (var i = 0; i < 5; i++) {
                            if ((i + '').indexOf(idNum[1]) >= 0) {
                                $('#mip_' + idNum[1]).children('.mip-audio-tag').attr('id', 'audiomip_' + i);
                                var audio = document.getElementById('audiomip_' + i);
                                var audioc = $('#audiomip_' + i).attr('class');
                                if (audioc.indexOf('play') >= 0) {
                                    audio.pause();
                                    $('#play_' + i).text('点击播放');
                                    $('#audio_icon_' + i).css('background', 'url(http://m.baikemy.com/images2.0/audio.jpg) no-repeat left -39px;background-size:13px 52px;');
                                    $('#audio_icon_' + i).removeClass('playing');
                                    $('#audiomip_' + i).addClass('pause');
                                    $('#audiomip_' + i).removeClass('play');
                                } else {
                                    audio.play();
                                    $('#play_' + i).text('点击暂停');
                                    $('#audio_icon_' + i).addClass('playing');
                                    $('#audiomip_' + i).addClass('play');
                                    $('#audiomip_' + i).removeClass('pause');
                                }
                            }
                        }
                    }
                }
            });
    };
    return customElement;
});
