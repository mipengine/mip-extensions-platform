/**
 * @file mip-pop-video 组件
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var $element = $(this.element);
        var Src = $element.attr('src');
        var popSelecter = $element.attr('pop-selecter');
        var pausePop = $element.attr('pause-pop');
        var poster = $element.attr('poster');
        var className = $element.attr('class');
        var popDom = $element.parent().find(popSelecter);
        var video;
        function createVideo() {
            video = document.createElement('video');
            $(video).attr({
                'playsinline': true,
                'webkit-playsinline': true,
                'controls': '',
                'class': className,
                'poster': poster,
                'src': Src,
                'preload': 'none'
            });
            $element[0].appendChild(video);
            if (popDom && popDom.length > 0) {
                video.onended = function () {
                    popDom[0].style.display = 'block';
                    video.parentNode.removeChild(video);
                    createVideo();
                };
                if (pausePop !== undefined) {
                    video.onpause = function () {
                        popDom[0].style.display = 'block';
                    };
                    video.onplay = function () {
                        popDom[0].style.display = 'none';
                    };
                }
            }
        }
        popDom.find('.close-but')[0].addEventListener('click', function () {
            popDom[0].style.display = 'none';
        }, false);
        popDom.find('.continue-but')[0].addEventListener('click', function () {
            popDom[0].style.display = 'none';
            video.play();
        }, false);
        createVideo();
        video.autoplay = true;
    };
    return customElement;
});
