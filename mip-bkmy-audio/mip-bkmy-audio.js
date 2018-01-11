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
            var idNum = ids.split('_');
            $('#mip_' + idNum[1]).children('.mip-audio-tag').attr('id', 'audiomip_' + idNum[1]);
            var audio = document.getElementById('audiomip_' + idNum[1]);
            var audioc = $('#audiomip_' + idNum[1]).attr('class');
            if (audioc.indexOf('play') >= 0) {
                audio.pause();
                $('#play_' + idNum[1]).text('点击播放');
                $('#audio_icon_' + idNum[1]).css('background', 'url(http://m.baikemy.com/images2.0/audio.jpg) no-repeat left -39px;background-size:13px 52px;');
                $('#audio_icon_' + idNum[1]).removeClass('playing');
                $('#audiomip_' + idNum[1]).addClass('pause');
                $('#audiomip_' + idNum[1]).removeClass('play');
            } else {
                audio.play();
                $('#play_' + idNum[1]).text('点击暂停');
                $('#audio_icon_' + idNum[1]).addClass('playing');
                $('#audiomip_' + idNum[1]).addClass('play');
                $('#audiomip_' + idNum[1]).removeClass('pause');
            }
        });
    };
    return customElement;
});
