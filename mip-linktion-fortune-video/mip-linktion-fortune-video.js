/**
 * @file mip-linktion-fortune-video 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // 视频页面
        var $el = $(this.element);
        var videoPopBtn = $el.find('.slick-video-img');
        function launchFullScreen(element) {
            if (element.requestFullScreen) {
                element.requestFullScreen();
            }
            else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }
            else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            }
        }
        if ($el.find('#modal-video video').length !== 0) {
            var modelCloseBtn = $el.find('#modal-video video');

            this.addEventAction('open', function (event) {
                $el.find('.slick-video').css('z-index', 10001);
                var stringOption = 'tap:modal-video.close tap:video.close';
                $el.find('#MIP-LLIGTBOX-MASK').attr('on', stringOption);
                var video = modelCloseBtn[0];
                if (videoPopBtn.hasClass('more')) {
                    video.play();
                }
                else {
                    video.play();
                    launchFullScreen(video);
                    videoPopBtn.addClass('more');
                }
            });
            this.addEventAction('close', function (event) {
                $el.find('.slick-video').css('z-index', 1);
                modelCloseBtn[0].pause();
            });
        }
    };
    return customElement;
});
