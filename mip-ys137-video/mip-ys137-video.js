/**
 * @author: mj
 * @date:  2018-06-12
 * @time: 14:39
 * @file: mip-ys137-video.js
 * @contact: regboy@qq.com
 * @description: 自适应视频播放器
 */
define(function (require) {
    var customElem = require('customElement').create();
    var $ = require('zepto');
    // 初始化插件
    var init = function (element) {
        var startAd = element.getAttribute('start-ad');
        var endAd = element.getAttribute('end-ad');
        var poster = element.getAttribute('poster');
        var src = element.getAttribute('src');
        var video = document.createElement('video');
        $(video).attr({
            'playsinline': 'playsinline',
            'webkit-playsinline': 'true',
            'controls': '',
            'poster': poster,
            'preload': 'none',
            'x-webkit-airplay': 'allow',
            'class': 'contentVideo'
        });
        $(video).css('height', window.innerWidth / 16 * 9 + 'px');
        element.appendChild(video);

        video.onplay = function () {
            video.autoplay = true;
        };

        if (startAd) {
            video.src = startAd;
            video.onended = function () {
                if (video.src === src && endAd) {
                    // 主视频播放完毕，播放结尾广告
                    video.src = endAd;
                    video.onended = null;
                } else {
                    // 播放主视频
                    video.src = src;
                    if (!endAd) {
                        video.onended = null;
                    }
                }
                video.autoplay = true;
                video.setAttribute('autoplay', 'autoplay');
                video.play();
            };
        } else {
            video.src = src;
            video.onended = function () {
                if (endAd) {
                    // 主视频播放完毕，播放结尾广告
                    video.src = endAd;
                    video.autoplay = true;
                    video.setAttribute('autoplay', 'autoplay');
                    video.play();
                    video.onended = null;
                };
            };
        };
    };

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        init(this.element);
    };
    return customElem;
});
