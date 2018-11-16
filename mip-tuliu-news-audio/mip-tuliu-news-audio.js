/**
 * @file mip-tuliu-news-audio 组件
 * @author zhengyongbo
 * @email zhengyongbo0128@gmail.com
 * @url https://www.github.com/zhengyongbo
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var audioIndex = 0;
    var audioCount = 0;
    customElement.prototype.build = function () {
        var element = this.element;
        var audios = $(element).find('audio');
        audioCount = audios.length;
        var playBtn = $(element).find('.icon-bofang3');
        var pauseBtn = $(element).find('.icon-zanting1');
        var closeBtn = $(element).find('.icon-guanbi2');
        var mipSemiFixed = $(element).closest('.mip-ndt-semi-fixed');
        var audioBtn = $('.yuyin-btn');
        if (audioCount === 0) {
            audioBtn.addClass('hide');
            return false;
        }
        audios.each(function (index, audioEl) {
            audioEl.addEventListener('ended', function () {
                if (index < audioCount - 1) {
                    audioIndex = index + 1;
                    audios.get(audioIndex).play();
                }
                else {
                    audioIndex = 0;
                    mipSemiFixed.removeClass('style-show');
                }
            }, false);
        });

        playBtn.on('click', function () {
            $(this).hide();
            pauseBtn.show();
            audios.get(audioIndex).play();
        });
        pauseBtn.on('click', function () {
            $(this).hide();
            playBtn.show();
            audios.get(audioIndex).pause();
        });
        closeBtn.on('click', function () {
            mipSemiFixed.removeClass('style-show');
            audios.get(audioIndex).pause();
        });

        audioBtn.on('click', function () {
            mipSemiFixed.addClass('style-show');
            playBtn.hide();
            pauseBtn.show();
            audios.get(audioIndex).play();
        });
    };

    return customElement;
});
