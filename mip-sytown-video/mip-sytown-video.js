/**
 * @file mip-sytown-video 视频播放器组件
 * @author sytown
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {

        var sytownSrc = this.element.getAttribute('sytown-src');
        var sytownPoster = this.element.getAttribute('sytown-poster');

        // 初始化播放器
        var video = document.createElement('video');

        // 初始化video属性
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        video.setAttribute('controls', '');
        video.setAttribute('poster', sytownPoster);
        video.setAttribute('preload', 'yes');
        video.src = sytownSrc;

        // 初始化video的尺寸
        video.style.height = window.innerWidth / 16 * 9 + 'px';
        // 插入video元素
        this.element.appendChild(video);

        // 当播放开始时设置自动播放
        video.onplay = function () {
            video.autoplay = true;
        };
    };

    return customElement;
});
