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
        if ($el.find('#modal-video video').length !== 0) {
            var modelCloseBtn = $el.find('#modal-video video');
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
            this.addEventAction('open', function (event) {
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
                modelCloseBtn[0].pause();
            });
        }
    };
    return customElement;
});
