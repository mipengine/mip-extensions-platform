/**
 * @file mip-linktion-fortune 组件
 * @author
 */

define(function (require) {
    'use strict';
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.build = function () {
        var videoflag = true;
        $('#btn-open').on('click', function () {
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
            var video = $('#modal-video video')[0];
            if (videoflag) {
                video.play();
                launchFullScreen(video);
                videoflag = false;
            }
            else {
                video.play();
            }
        });
        $('button.close').on('click', function () {
            $('#modal-video video')[0].pause();
        });
    };
    return customElement;
});
