/**
 * @file mip-foot-app 组件
 * @author
 */

define(function (require) {
    'use strict';
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var topicID = element.getAttribute('topicID') || '0';
        var replyID = element.getAttribute('replyID') || '0';
        element.querySelector('#downloadApp').onclick = function () {
            window.top.location.href = 'https://m.taoguba.com.cn/downloadApp';
        };
        element.querySelector('#openApp').onclick = function () {
            mopenAPP(topicID, replyID);
        };
    };
    function mopenAPP(topicID, replyID) {
        // 判断当前位Android 还是iOS
        var u = navigator.userAgent;
        var app = navigator.appVersion;
        // g
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
        // ios终端
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
            var loadDateTime = new Date();
            window.setTimeout(function () {
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 5000) {
                    window.top.location.href = 'https://m.taoguba.com.cn/downloadApp';
                } else {
                    window.close();
                }
            },
            25);
            if (Number(topicID) === 0) {
                window.top.location.href = 'taoguba://taoguba.com.cn';
            } else {
            // isLogin();
                if (Number(replyID) === 0) {
                    window.top.location.href = 'taoguba://app.topic/openTopic?topicId=' + topicID;
                } else {
                    window.top.location.href = 'taoguba://app.topic/openTopic?topicId=' + topicID + '&replyId=' + replyID;
                }
            }
        }
        if (isIOS) {
            var loadDateTime = new Date();
            window.setTimeout(function () {
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 5000) {
                    window.top.location.href = 'https://m.taoguba.com.cn/downloadApp';
                } else {
                    window.close();
                }
            },
            25);
            if (Number(topicID) === 0) {
                window.top.location.href = 'tgbiosapp://';
            } else {
            // isLogin();
                window.top.location.href = 'tgbiosapp://?type=openTopic&topicId=' + topicID + '&replyId=' + replyID;
            }
        }

    }
    return customElement;
});