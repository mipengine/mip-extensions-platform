/**
 * @file mip-pop-video 组件
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
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
            $element[0].parentNode.style.height = $element[0].clientWidth * 360 / 640 + 'px';
            if (popDom && popDom.length > 0) {
                video.onended = function () {
                    popDom[0].style.display = 'block';
                    video.parentNode.removeChild(video);
                    createVideo();
                };
                if (pausePop !== undefined) {
                    video.onpause = function () {
                        if (popDom[0].style.display !== 'block') {
                            popDom[0].style.display = 'block';
                        }
                        else {
                            return false;
                        }
                        if (!platform.isIos()) {
                            video.style.display = 'none';
                        }
                    };
                    video.onplay = function () {
                        if (popDom[0].style.display !== 'none') {
                            popDom[0].style.display = 'none';
                        }
                        else {
                            return false;
                        }
                        if (!platform.isIos()) {
                            video.style.display = 'block';
                        }
                    };
                }
            }
        }
        if (popDom.find('.close-but').length > 0) {
            popDom.find('.close-but')[0].addEventListener('click', function () {
                popDom[0].style.display = 'none';
                if (!platform.isIos()) {
                    video.style.display = 'block';
                }
            }, false);
        }
        if (popDom.find('.continue-but').length > 0) {
            popDom.find('.continue-but')[0].addEventListener('click', function () {
                video.play();
            }, false);
        }
        createVideo();
    };
    return customElement;
});
