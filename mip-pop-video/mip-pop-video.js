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
                'preload': 'no'
            });
            $(video).css('height', window.innerWidth / 16 * 9 + 'px');
            $element[0].appendChild(video);
        }
        createVideo();
        video.autoplay = true;
        if (popDom && popDom.length > 0) {
            video.onended = function () {
                popDom[0].style.display = 'block';
                video.parentNode.removeChild(video);
                createVideo();
            };
            popDom.find('.close-but')[0].addEventListener('click', function () {
                popDom[0].style.display = 'none';
            }, false);
        }
    };
    return customElement;
});
