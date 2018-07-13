/**
 * @file mip-linktion-copybtn 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */

    customElement.prototype.firstInviewCallback = function () {
        var $el = $(this.element);
        $el.find('.clipboard').on('copy click', function (e) {
            var clipboardData = window.clipboardData;
            var clipBoardContent = $(this).data('href');
            if (clipboardData) {
                clipboardData.setData('Text', clipBoardContent);
                showTips('链接地址已经复制到你的粘贴板', 'success');
            }
            else if (e.clipboardData) { // for chrome
                clipboardData = e.clipboardData;
                clipboardData.setData('Text', clipBoardContent);
                showTips('链接地址已经复制到你的粘贴板', 'success');
            }

        });
        function hideHints() {
            setTimeout(function () {
                $el.find('.web-hint').fadeOut();
            }, 6000);
        }
        function showTips(text, status) {
            var hintsHtml = '';
            if (status === 'err') {
                hintsHtml = '<div class="web-error web-hint">'
                            + '<p>' + text + '</p>'
                            + '</div>';
            }
            else if (status === 'success') {
                hintsHtml = '<div class="web-hint web-succeed">'
                            + ' <p>' + text + '</p>'
                            + ' </div>';
            }
            $el.find('.hints').html(hintsHtml);
            hideHints();
        }

    };

    return customElement;
});
