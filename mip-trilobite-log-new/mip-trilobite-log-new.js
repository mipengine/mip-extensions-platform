/**
 * @file mip-trilobite-log-new 组件
 * @author zhouqian04<zhouqian04@baidu.com>
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var officeId;

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var element = this.element;

        if (element.hasAttribute('office-id') && element.getAttribute('office-id')) {
            officeId = element.getAttribute('office-id');
        } else {
            console.log('office-id不能为空');
            return;
        }

        var Log = {
            baseUrl: 'http://in.baidu.com/dc-admin/log',
            trace: function (logArray) {
                var trackString = Array.prototype.slice.call(logArray).join('@');
                var logImg = new Image();
                logImg.src = this.baseUrl + '?officeId=' + officeId + '&track=' + trackString;
            },
            enter: function () {
                var logImg = new Image();
                logImg.src = this.baseUrl + '?officeId=' + officeId + '&track=cambrian@view';
            }
        };

        function logEvent() {
            if (element.hasAttribute('is-detail-page')) {
                Log.enter();
            }
            $('.listDownload').on('click', function () {
                Log.trace(['cambrian', 'listDownload']);
            });
            $('.listArticle').on('click', function () {
                Log.trace(['cambrian', 'listArticle']);
            });
            $('#detailSource').on('click', function () {
                Log.trace(['cambrian', 'detailSource']);
            });
            $('#detailDownload').on('click', function () {
                Log.trace(['cambrian', 'detailDownload']);
            });
            $('video').on('play', function () {
                Log.trace(['cambrian', 'detailVideo']);
            });
        }
        logEvent();
    };

    return customElement;
});
