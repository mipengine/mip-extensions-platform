/**
 * @file 春雨自定义广告组件
 * @author 春雨web开发组
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        // 获取mip-cy-ad元素
        var $ele = $(this.element);
        var url = $ele.attr('url');
        var docImage = $ele.attr('doc-image');
        var docInfo = $ele.attr('doc-info');
        var bgUrl = $ele.attr('bg-url');
        var html = '';
        var docHtml = '';

        if (docImage && docInfo) {
            docHtml = [
                '    <mip-img class="doc-img" width="38" height="38"',
                '        src="' + docImage + '"></mip-img>',
                '    <div class="doc-info">' + docInfo + '</div>'
            ].join('');
        };
        if (url && (docHtml || bgUrl)) {
            html = [
                '<div class="mip-cy-ad">',
                '  <a class="doc" style="background-image:',
                '    url(' + bgUrl + ');"',
                '    href="' + url + '">',
                docHtml,
                '  </a>',
                '  <button class="ad-close">关闭</button>',
                '</div>'
            ].join('');
        };
        if (html) {
            $ele.append(html);
            // 添加关闭公告事件
            $('button', $ele).on('click', function () {
                // 关闭广告位置
                $ele.remove();
            });
        } else {
            $ele.remove();
        }
    };

    return customElement;
});
