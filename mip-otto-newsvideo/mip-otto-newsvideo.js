/**
 * @file mip-otto-newsvideo 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var fetchJsonp = require('fetch-jsonp');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var element = this.element;
        var config = element.querySelector('script[type="application/json"]');
        var data = config ? JSON.parse(config.textContent.toString()) : {};
        var url = 'https://api.wangxiao.cn/app/ad.ashx?AdTypeId=20181205160104201&sign=' + data.sign;
        var isMipPage = (function () {
            return Boolean(location.pathname.match('mip\/'));
        })();
        fetchJsonp(url, {
            method: 'GET'
        })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                var promise = new Promise(function (resolve, reject) {
                    if (res.State === 1) {
                        resolve(res.Data[0]);
                    }
                    else {
                        reject();
                    }
                });
                return promise;
            })
            .then(function (res) {
                playVideo(res);
            })
            .catch(function (err) {
                throw err;
            });
        // function playLetvVideo(vu){}
        function playBaiduVideo(source) {
            var videoElement = document.createElement('mip-video');
            videoElement.setAttribute('controls', '');
            videoElement.setAttribute('layout', 'responsive');
            videoElement.setAttribute('src', source);
            videoElement.setAttribute(
                'poster',
                'http://static.wangxiao.cn/zhuanti/commonResoures/letvVideo/video_pic.jpg'
            );
            videoElement.setAttribute('width', '16');
            videoElement.setAttribute('height', '9');
            element.append(videoElement);
        }
        function playVideo(res) {
            if (res.letv && !isMipPage) {
                // 这里兼容mip统一走百度视频
                // playLetvVideo(res.letv)
                playBaiduVideo(res.href);
            }
            else {
                // 处理百度视频
                playBaiduVideo(res.href);
            }
        }
    };

    return customElement;
});
