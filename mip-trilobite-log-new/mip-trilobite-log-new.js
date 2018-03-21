/**
 * @file mip-trilobite-log-new 组件
 * @author zhouqian04<zhouqian04@baidu.com>
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var viewport = require('viewport');
    var pageType;

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var element = this.element;

        if (element.hasAttribute('page-type') && element.getAttribute('page-type')) {
            pageType = element.getAttribute('page-type');
        }
        else {
            console.log('page-type不能为空');
            return;
        }

        var log = {
            baseUrl: 'http://in.baidu.com/dc-admin/log',
            trace: function (logArray) {
                var trackString = Array.prototype.slice.call(logArray).join('@');
                var logImg = new Image();
                logImg.src = this.baseUrl + '?track=' + trackString;
            }
        };

        (function logEvent() {
            if (pageType === 'list') {
                var appId = element.getAttribute('app-id');
                log.trace(['appArticleList', '{' + appId + '}', 'enter']);
                $('.listDownload').on('click', function () {
                    log.trace(['appArticleList', '{' + appId + '}', 'download']);
                });
            }
            else if (pageType === 'detail') {
                var tpId = element.getAttribute('tp-id');
                var contentId = element.getAttribute('content-id');

                log.trace(['appArticleDetail', '{' + tpId + '}', '{' + contentId + '}', 'enter']);
                $('#detailSource').on('click', function () {
                    log.trace(['appArticleDetail', '{' + tpId + '}', '{' + contentId + '}', 'source']);
                });
                $('#detailDownload').on('click', function () {
                    log.trace(['appArticleDetail', '{' + tpId + '}', '{' + contentId + '}', 'download']);
                });

                var isFirstReadDone = true;
                function scrollHandle() {
                    var articleContent = $('[data-role="j-article"]')[0];
                    var scrollDistance = viewport.getScrollTop();

                    if (isFirstReadDone) {
                        var overPageDistance = (articleContent.offsetTop + articleContent.offsetHeight)
                            - viewport.getHeight();
                        if (overPageDistance < 0) {
                            // 正文内容不超过一屏
                            log.trace(['appArticleDetail', '{' + tpId + '}', '{' + contentId + '}', 'done']);
                            isFirstReadDone = false;
                        }
                        else if (scrollDistance >= overPageDistance) {
                            log.trace(['appArticleDetail', '{' + tpId + '}', '{' + contentId + '}', 'done']);
                            isFirstReadDone = false;
                        }
                    }
                }
                scrollHandle();
                viewport.on('scroll', scrollHandle);
            }

            // $('.listArticle').on('click', function () {
            //     log.trace(['cambrian', 'listArticle']);
            // });
            // $('video').on('play', function () {
            //     log.trace(['cambrian', 'detailVideo']);
            // });
            // $('[data-role="j-recommend-download"]').on('click', function () {
            //     log.trace(['cambrian', 'recommendDownload']);
            // });
        })();
    };

    return customElement;
});
